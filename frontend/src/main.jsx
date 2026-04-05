import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/ChatContext.jsx";
import App from "./App.jsx";
import "../index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChatProvider>
      <App />
      <Toaster position="top-right" />
    </ChatProvider>
  </React.StrictMode>,
);
