import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext.jsx";
import burgerBig from "../assets/burger-big.png";
import burgerSmall from "../assets/burger-small.png";
// No import needed - Toaster in main.jsx

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "BUYER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useChat();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Email không hợp lệ!");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự!");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Xác nhận mật khẩu không khớp!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Đăng ký thất bại!");
      }

      // Login success
      login(data.user, data.token);
      toast("Đăng ký thành công! Chào mừng đến EatsyChat!", {
        duration: 4000,
        position: "top-right",
        icon: "✅",
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF939B] via-[#F97A89] to-[#EF2A39] flex flex-col lg:flex-row">
      {/* Burger images side */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-12 order-2 lg:order-1">
        <div className="relative max-w-md mx-auto animate-fadeIn">
          <img
            src={burgerBig}
            alt="Big burger"
            className="w-72 lg:w-96 drop-shadow-2xl mx-auto z-10 animate-float"
          />
          <img
            src={burgerSmall}
            alt="Small burger"
            className="w-40 lg:w-64 absolute -left-4 lg:left-[55%] -top-4 lg:top-[55%] drop-shadow-xl rotate-[-10deg] animate-float-delay"
          />
        </div>
        <div className="mt-12 lg:mt-20 text-center">
          <p className="text-[2.5rem] lg:text-[3.5rem] xl:text-[5rem] font-black bg-gradient-to-r from-white to-gray-200/80 bg-clip-text text-transparent drop-shadow-2xl animate-fadeInUp leading-[0.85] tracking-[0.02em] w-fit mx-auto px-8 py-4">
            Join EatsyChat!
          </p>
          <p className="text-white/90 mt-4 text-lg lg:text-xl font-medium">
            Connect with sellers & support
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="lg:w-1/2 flex items-center justify-center p-10 lg:p-16 order-1 lg:order-2">
        <div className="w-full max-w-lg lg:max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-[3rem] lg:text-[4.5rem] font-black bg-gradient-to-r from-[#FF939B] via-[#F97A89] to-[#EF2A39] bg-clip-text text-transparent drop-shadow-[0_8px_32px_rgba(239,42,57,0.4)] mb-4 font-lobster-custom">
              EatsyChat
            </h1>
            <p className="text-gray-600 text-lg">Tạo tài khoản mới</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-xl text-sm animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3">
                Họ tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg placeholder-gray-500"
                placeholder="Nhập họ tên"
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg placeholder-gray-500"
                placeholder="example@email.com"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg placeholder-gray-500"
                  placeholder="Mật khẩu tối thiểu 6 ký tự"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {showPassword ? (
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C19.542 5.383 15.928 1.77 11 1.77a9.998 9.998 0 00-5.4 1.646l-1.433-1.424zM10 15a5 5 0 100-10 5 5 0 000 10zm0 1A6 6 0 116 5a6 6 0 010 12z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg placeholder-gray-500"
                  placeholder="Nhập lại mật khẩu"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {showConfirmPassword ? (
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C19.542 5.383 15.928 1.77 11 1.77a9.998 9.998 0 00-5.4 1.646l-1.433-1.424zM10 15a5 5 0 100-10 5 5 0 000 10zm0 1A6 6 0 116 5a6 6 0 010 12z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3">
                Vai trò
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg bg-white"
                disabled={loading}
              >
                <option value="BUYER">Khách hàng</option>
                <option value="SELLER">Người bán</option>
                <option value="SUPPORT">Hỗ trợ</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#EF2A39] to-[#FF6B6B] hover:from-[#D71E2E] hover:to-[#FF5252] text-white py-5 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 h-6 w-6"
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
                  <span>Đang tạo tài khoản...</span>
                </>
              ) : (
                "Tạo tài khoản"
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              Đã có tài khoản?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-red-500 font-bold hover:text-red-600 transition-colors"
                disabled={loading}
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
