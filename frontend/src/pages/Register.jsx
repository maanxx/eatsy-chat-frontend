import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext.jsx";
import toast from "react-hot-toast";
import burgerBig from "../assets/burger-big.png";
import burgerSmall from "../assets/burger-small.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields!");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Registration failed");
      }

      const data = await res.json();
      login(data.user, data.token);
      toast.success(`Welcome ${data.user.name}! Account created.`);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF939B] via-[#F97A89] to-[#EF2A39] flex flex-col lg:flex-row">
      {/* Burger images */}
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
          <p className="text-[2.5rem] lg:text-[3.5rem] xl:text-[5rem] font-black bg-gradient-to-r from-white to-gray-200/80 bg-clip-text text-transparent drop-shadow-2xl animate-fadeInUp leading-[0.85] w-fit mx-auto px-8 py-4">
            Join EatsyChat!
          </p>
          <p className="text-white/90 mt-4 text-lg lg:text-xl font-medium">
            Connect with sellers, shippers & enjoy amazing food delivery
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-10 lg:p-16 order-1 lg:order-2">
        <div className="w-full max-w-lg lg:max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="[font-family:'Lobster'] text-[3rem] lg:text-[4.5rem] font-black bg-gradient-to-r from-[#FF939B] via-[#F97A89] to-[#EF2A39] bg-clip-text text-transparent drop-shadow-[0_8px_32px_rgba(239,42,57,0.4)] mb-4">
              EatsyChat
            </h1>
            <p className="text-gray-600 text-lg">Create your account</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-xl animate-bounce">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg placeholder-gray-500"
                placeholder="Enter your full name"
                disabled={loading}
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg placeholder-gray-500"
                  placeholder="Enter your email"
                  disabled={loading}
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.27 6.55c.85 .75 2.18 .75 3.03 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg placeholder-gray-500"
                  placeholder="Create password (6+ chars)"
                  disabled={loading}
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
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

            {/* Role */}
            <div>
              <label className="block text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all text-lg"
                disabled={loading}
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="shipper">Shipper</option>
              </select>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#EF2A39]/95 to-[#EF2A39] text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:from-[#FF0000] hover:to-red-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-lg text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-red-500 font-bold hover:text-red-600 transition-colors"
            >
              Log In
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }
        @keyframes floatDelay {
          0%, 100% { transform: translateY(0) rotate(-10deg) scale(1); }
          50% { transform: translateY(-16px) rotate(-10deg) scale(1.02); }
        }
        .animate-float { animation: float 3.5s ease-in-out infinite; }
        .animate-float-delay { animation: floatDelay 3.5s ease-in-out infinite 0.6s; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out 1s both; }
      `}</style>
    </div>
  );
}

export default Register;
