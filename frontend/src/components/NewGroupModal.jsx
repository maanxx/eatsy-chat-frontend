import React, { useState } from "react";
import { Users, X, Search, Plus } from "lucide-react";
import { useChat } from "../context/ChatContext.jsx";

const NewGroupModal = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useChat();

  const searchUsers = async (q) => {
    try {
      const res = await fetch(`http://localhost:4000/api/users?q=${q}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Search error", err);
    }
  };

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const createGroup = async () => {
    if (groupName && selectedUsers.length >= 2) {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/groups", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: groupName,
            userIds: selectedUsers,
          }),
        });
        const newGroup = await res.json();
        toast.success("Nhóm mới tạo thành công!");
        onClose();
        // Refresh chats
        window.location.reload();
      } catch (err) {
        toast.error("Tạo nhóm thất bại");
      }
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 sticky top-0 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Nhóm mới</h2>
                <p className="text-sm text-slate-500">
                  {selectedUsers.length}/20 thành viên
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Group Name */}
        <div className="p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tên nhóm
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Nhập tên nhóm..."
            className="w-full p-3 border border-slate-200 rounded-2xl focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* User Search */}
        <div className="p-6 border-t border-slate-100">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchUser}
              onChange={(e) => {
                setSearchUser(e.target.value);
                searchUsers(e.target.value);
              }}
              placeholder="Tìm kiếm thành viên..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all"
            />
          </div>

          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-2">
                Đã chọn ({selectedUsers.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((userId) => {
                  const user = users.find((u) => u.id === userId);
                  if (!user) return null;
                  return (
                    <div
                      key={userId}
                      className="flex items-center bg-blue-100 px-3 py-1 rounded-full text-sm text-blue-800"
                    >
                      {user.name}
                      <button
                        onClick={() => toggleUser(userId)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Available Users */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className={`flex items-center p-3 rounded-xl cursor-pointer hover:bg-slate-50 transition-all ${
                  selectedUsers.includes(user.id)
                    ? "bg-blue-50 border-2 border-blue-200"
                    : ""
                }`}
                onClick={() => toggleUser(user.id)}
              >
                <img
                  src={
                    user.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user.name)
                  }
                  alt={user.name}
                  className="w-10 h-10 rounded-2xl ring-2 ring-white shadow-sm"
                />
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{user.role}</p>
                </div>
                {selectedUsers.includes(user.id) ? (
                  <Plus className="w-5 h-5 text-blue-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
                    <Plus className="w-3 h-3 text-slate-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50/50 sticky bottom-0">
          <button
            onClick={createGroup}
            disabled={!groupName || selectedUsers.length < 2 || loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Đang tạo...</span>
              </>
            ) : (
              `Tạo nhóm "${groupName}" (${selectedUsers.length} thành viên)`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGroupModal;
