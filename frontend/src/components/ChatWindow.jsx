import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send, Image, Paperclip, Smile, Mic } from "lucide-react";
import { useChat } from "../context/ChatContext.jsx";
import ImagePreview from "./ImagePreview.jsx";
import { useParams } from "react-router-dom";
import { mockChats, mockMessages } from "../data/mockChats.js";

const ChatWindow = () => {
  const { chatId } = useParams();
  const chat = mockChats.find((c) => c.id === chatId);

  const [localMessages, setLocalMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const { currentChat, sendMessage, startTyping, stopTyping, user } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  useEffect(() => {
    // Mock messages for current chat
    if (chat && mockMessages[chat.id]) {
      setLocalMessages(mockMessages[chat.id] || []);
    }
  }, [chat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() && user) {
      const newMessage = {
        id: Date.now().toString(),
        content: input.trim(),
        sender: "You",
        type: "text",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        mine: true,
      };
      setLocalMessages((prev) => [...prev, newMessage]);
      sendMessage(chat.id, input.trim());
      setInput("");
    }
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (typingTimeout) clearTimeout(typingTimeout);

    if (e.target.value) {
      startTyping(chat.id);
      setTypingTimeout(
        setTimeout(() => {
          stopTyping(chat.id);
        }, 1000),
      );
    } else {
      stopTyping(chat.id);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        sendMessage(chat.id, e.target.result, "image");
      };
      reader.readAsDataURL(file);
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          sendMessage(chat.id, e.target.result, "image");
        };
        reader.readAsDataURL(file);
      }
    },
    [sendMessage, chat],
  );

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <img
            src={chat?.avatar}
            alt={chat?.name}
            className="w-12 h-12 rounded-2xl ring-2 ring-white shadow-lg"
          />
          <div>
            <h2 className="font-bold text-lg text-slate-800">{chat?.name}</h2>
            <span className="text-sm text-slate-500 flex items-center">
              {chat?.online ? (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                  Online
                </>
              ) : (
                "Offline"
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20">
        {localMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.mine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-lg ${
                message.mine
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-br-sm"
                  : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
              }`}
            >
              {message.type === "image" ? (
                <div
                  className="cursor-pointer group relative"
                  onClick={() => {
                    setPreviewImage(message.image);
                    setShowImagePreview(true);
                  }}
                >
                  <img
                    src={message.image || message.content}
                    alt="Uploaded"
                    className="w-48 h-32 lg:w-64 lg:h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-all"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
              <div
                className={`text-xs mt-1 flex items-center ${
                  message.mine ? "text-red-100 justify-end" : "text-slate-400"
                }`}
              >
                {message.time}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-lg max-w-xs">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 p-4 bg-white/95 backdrop-blur border-t border-slate-200">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div
            className="flex-1 p-3 border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50 hover:border-red-300 hover:bg-red-50 transition-all cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex items-center space-x-3 text-slate-500">
              <Paperclip className="w-5 h-5 hover:text-red-500 cursor-pointer" />
              <Smile className="w-5 h-5 hover:text-yellow-500 cursor-pointer" />
              <Mic className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
            </div>
          </div>

          <input
            type="text"
            value={input}
            onChange={handleTyping}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-5 py-3 border border-slate-200 rounded-3xl focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all resize-none"
            onKeyPress={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMessage(e)
            }
          />

          <button
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-3xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {showImagePreview && (
        <ImagePreview
          src={previewImage}
          onClose={() => setShowImagePreview(false)}
        />
      )}
    </div>
  );
};

export default ChatWindow;
