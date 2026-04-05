const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "file:./dev.db",
    },
  },
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Auth middleware
const authenticateToken = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new Error("Invalid token"));
    socket.user = user;
    next();
  });
};

// Socket.io auth
io.use(authenticateToken);

io.on("connection", (socket) => {
  console.log(`User ${socket.user.id} connected: ${socket.id}`);

  // Update online status
  prisma.user.update({
    where: { id: socket.user.id },
    data: { online: true },
  });

  socket.on("joinUserChats", (chatIds) => {
    socket.chatIds = chatIds;
    chatIds.forEach((chatId) => socket.join(`chat_${chatId}`));
  });

  socket.on("send_message", async ({ chatId, message }) => {
    // Save to DB
    const savedMessage = await prisma.message.create({
      data: {
        chatId,
        senderId: socket.user.id,
        type: message.type || "TEXT",
        content: message.content,
      },
    });

    // Broadcast to room
    socket.to(`chat_${chatId}`).emit("receive_message", {
      chatId,
      message: {
        ...savedMessage,
        sender: socket.user,
      },
    });
  });

  socket.on("typing", ({ chatId, isTyping }) => {
    socket.to(`chat_${chatId}`).emit("typing", {
      chatId,
      userId: socket.user.id,
      isTyping,
    });
  });

  socket.on("disconnect", async () => {
    console.log(`User ${socket.user.id} disconnected`);

    // Update offline status
    await prisma.user.update({
      where: { id: socket.user.id },
      data: {
        online: false,
        lastSeen: new Date(),
      },
    });

    // Notify others
    socket.broadcast.emit("user_offline", { userId: socket.user.id });
  });
});

// Auth routes
app.post("/api/register", async (req, res) => {
  try {
    const { email, password, name, role = "BUYER" } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ token, user: { id: user.id, email, name, role } });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Auth middleware for HTTP
const authenticateHTTP = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Get user chats
app.get("/api/chats", authenticateHTTP, async (req, res) => {
  try {
    const chats = await prisma.chatMember.findMany({
      where: { userId: req.user.id },
      include: {
        chat: {
          include: {
            messages: {
              take: 1,
              orderBy: { timestamp: "desc" },
              include: { sender: true },
            },
            order: true,
          },
        },
      },
    });

    res.json(chats.map((cm) => cm.chat));
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get messages for chat
app.get("/api/chats/:chatId/messages", authenticateHTTP, async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await prisma.message.findMany({
      where: { chatId },
      include: { sender: true },
      orderBy: { timestamp: "asc" },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create group chat (min 3 members)
app.post("/api/groups", authenticateHTTP, async (req, res) => {
  try {
    const { name, userIds } = req.body;
    if (userIds.length < 3)
      return res.status(400).json({ error: "Min 3 members" });

    const chat = await prisma.chat.create({
      data: {
        type: "GROUP",
        name,
      },
    });

    // Add creator
    await prisma.chatMember.create({
      data: { chatId: chat.id, userId: req.user.id },
    });

    // Add members
    for (const userId of userIds) {
      await prisma.chatMember.create({
        data: { chatId: chat.id, userId },
      });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Search users
app.get("/api/users", authenticateHTTP, async (req, res) => {
  try {
    const { q } = req.query;
    const users = await prisma.user.findMany({
      where: {
        name: { contains: q || "", mode: "insensitive" },
        id: { not: req.user.id },
      },
      select: { id: true, name: true, avatar: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Send message REST (optional)
app.post("/api/messages", authenticateHTTP, async (req, res) => {
  try {
    const { chatId, content, type = "TEXT" } = req.body;
    const message = await prisma.message.create({
      data: {
        chatId,
        senderId: req.user.id,
        type,
        content,
      },
      include: { sender: true },
    });
    // Socket broadcast
    io.to(`chat_${chatId}`).emit("receive_message", {
      chatId,
      message,
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
