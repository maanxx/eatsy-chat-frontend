import React from "react";
import {
  MessageCircle,
  Users,
  BarChart3,
  Search,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext.jsx";
import ChatList from "./ChatList.jsx";
import ChatWindow from "./ChatWindow.jsx";

const ChatLayout = () => {
  const { logout } = useChat();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200 shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                EatsyChat
              </h1>
              <p className="text-slate-500 text-sm">Online Orders</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 bg-slate-50 transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-all group">
            <MessageCircle className="w-5 h-5 text-red-500 group-hover:text-red-600" />
            <span className="font-medium text-slate-800">Chats</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-all group">
            <Users className="w-5 h-5 text-blue-500 group-hover:text-blue-600" />
            <span className="font-medium text-slate-800">Groups</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50 transition-all group">
            <BarChart3 className="w-5 h-5 text-green-500 group-hover:text-green-600" />
            <span className="font-medium text-slate-800">Stats</span>
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-200">
          <div
            className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
            onClick={logout}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-800">You</p>
              <p className="text-xs text-slate-500">Logout</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-400 ml-auto" />
          </div>
        </div>
      </div>

      {/* ChatList + ChatWindow */}
      <div className="flex flex-1">
        <div className="w-80 border-r border-slate-200 bg-white/80 backdrop-blur flex-shrink-0">
          <ChatList />
        </div>
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
