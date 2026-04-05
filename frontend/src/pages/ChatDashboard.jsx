import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  MessageCircle,
  Users,
  BarChart3,
  Package,
  Headphones,
} from "lucide-react";
import { useChat } from "../context/ChatContext.jsx";

const ChatDashboard = () => {
  const { chats } = useChat();

  const tabs = [
    { id: "chats", icon: MessageCircle, label: "Chats", to: "/chat/1" },
    { id: "groups", icon: Users, label: "Support Groups", to: "/chat/group1" },
    { id: "stats", icon: BarChart3, label: "Statistics", to: "/stats" },
    { id: "orders", icon: Package, label: "Orders", to: "/orders" },
    { id: "support", icon: Headphones, label: "Support", to: "/support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl mb-4">
            Welcome to EatsyChat
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Manage your buyer-seller conversations, order support groups, and
            view interaction statistics in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Quick Stats Cards */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-800">12</p>
                <p className="text-slate-600 font-medium">Active Chats</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-800">3</p>
                <p className="text-slate-600 font-medium">Groups</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-800">1.2k</p>
                <p className="text-slate-600 font-medium">Messages Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-1 mb-8">
          <nav className="flex flex-wrap -m-1">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.to}
                className="flex items-center space-x-3 px-6 py-4 m-1 bg-white/60 hover:bg-white rounded-2xl font-semibold text-slate-800 transition-all group hover:shadow-lg hover:scale-[1.02] flex-1 min-w-[140px] text-center"
              >
                <tab.icon className="w-5 h-5 text-slate-600 group-hover:text-red-500 mx-auto" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Content Outlet */}
        <Outlet />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatDashboard;
