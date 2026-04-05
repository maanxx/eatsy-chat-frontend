import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import { toast } from "react-hot-toast";

const ChatContext = createContext();

const SOCKET_SERVER = "http://localhost:4000";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  socket: null,
  currentChat: null,
  chats: [],
  messages: {},
  onlineUsers: new Set(),
  typingUsers: new Set(),
  notifications: [],
};

function chatReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.socket?.disconnect();
      return initialState;
    case "SET_SOCKET":
      return { ...state, socket: action.payload };
    case "SET_CURRENT_CHAT":
      return { ...state, currentChat: action.payload };
    case "SET_CHATS":
      return { ...state, chats: action.payload };
    case "ADD_MESSAGE": {
      const chatId = action.payload.chatId;
      const newMessages = { ...state.messages };
      if (!newMessages[chatId]) newMessages[chatId] = [];
      newMessages[chatId].push(action.payload.message);
      return { ...state, messages: newMessages };
    }
    case "ADD_ONLINE_USER":
      state.onlineUsers.add(action.payload.userId);
      return { ...state };
    case "REMOVE_ONLINE_USER":
      state.onlineUsers.delete(action.payload.userId);
      return { ...state };
    case "SET_TYPING":
      if (action.payload.isTyping) {
        state.typingUsers.add(action.payload.userId);
      } else {
        state.typingUsers.delete(action.payload.userId);
      }
      return { ...state };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load mock data when logged in
  useEffect(() => {
    if (state.user && !state.chats.length) {
      // Load mock chats & messages
      import("../data/mockChats.js").then(({ mockChats }) => {
        dispatch({ type: "SET_CHATS", payload: mockChats });
      });
    }
  }, [state.user]);

  // Socket disabled for frontend demo
  useEffect(() => {
    if (state.token) {
      console.log("User logged in - Socket ready for backend connection");
    }
  }, [state.token]);

  const login = useCallback((user, token) => {
    dispatch({ type: "LOGIN", payload: { user, token } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const sendMessage = useCallback(
    (chatId, content, type = "text") => {
      const message = {
        id: uuidv4(),
        chatId,
        senderId: state.user.id,
        content,
        type,
        timestamp: Date.now(),
      };
      // Local dispatch for demo
      dispatch({ type: "ADD_MESSAGE", payload: { chatId, message } });
      toast.success("Message sent locally");
    },
    [state.user?.id, dispatch],
  );

  const startTyping = useCallback(
    (chatId) => {
      dispatch({
        type: "SET_TYPING",
        payload: { userId: state.user.id, isTyping: true },
      });
    },
    [state.user?.id],
  );

  const stopTyping = useCallback(
    (chatId) => {
      dispatch({
        type: "SET_TYPING",
        payload: { userId: state.user.id, isTyping: false },
      });
    },
    [state.user?.id],
  );

  return (
    <ChatContext.Provider
      value={{
        ...state,
        login,
        logout,
        sendMessage,
        startTyping,
        stopTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};
