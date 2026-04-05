import React, { useState, useEffect } from "react";
import { Search, MessageCircle, Users } from "lucide-react";
import { useChat } from "../context/ChatContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import NewGroupModal from "./NewGroupModal.jsx";

const ChatList = () => {
  const { chats } = useChat();
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewGroup, setShowNewGroup] = useState(false);

  const filteredChats = chats.filter((chat) =>
    chat.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectChat = (chat) => {
    navigate(`/chat/${chat.id}`);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-100 bg-white/95 backdrop-blur sticky top-0 z-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm chat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 bg-slate-50 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 p-3">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 rounded-2xl cursor-pointer transition-all hover:bg-slate-50 border-2 ${
              chatId === chat.id
                ? "border-red-400 bg-gradient-to-r from-red-50 to-pink-50 shadow-md"
                : "border-transparent"
            }`}
            onClick={() => selectChat(chat)}
          >
            <div className="flex items-center space-x-4">
              <div className="relative flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-14 h-14 rounded-2xl ring-2 ring-white/50 shadow-lg object-cover"
                />
                {chat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full ring-2 ring-slate-100 shadow-lg animate-pulse"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 truncate pr-2">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-sm text-slate-500 truncate mt-0.5">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="w-7 h-7 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg flex-shrink-0 animate-pulse">
                  {chat.unread > 99 ? "99+" : chat.unread}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-slate-100 bg-white/80 backdrop-blur">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowNewGroup(true)}
            className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:shadow-lg transition-all group"
          >
            <Users className="w-5 h-5 text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-700">
              Nhóm mới
            </span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:shadow-lg transition-all group">
            <MessageCircle className="w-5 h-5 text-green-500 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-700">
              Chat mới
            </span>
          </button>
        </div>
      </div>

      <NewGroupModal
        isOpen={showNewGroup}
        onClose={() => setShowNewGroup(false)}
      />
    </div>
  );
};

export default ChatList;
