import React, { useState } from "react";
import burgerBig from "../assets/burger-big.png";
import burgerSmall from "../assets/burger-small.png";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Please enter your email and password!");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email address!");
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with real API call
      console.log("Login attempt:", { email, password });
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API

      // Login success - redirect logic here
      console.log("Login Successfully!");
    } catch (err) {
      setError("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF939B] via-[#F97A89] to-[#EF2A39] flex flex-col lg:flex-row">
      {/* Mobile: Burger images first */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-12 order-2 lg:order-1">
        <div className="relative max-w-md mx-auto animate-fadeIn">
          {/* Big burger */}
          <img
            src={burgerBig}
            alt="Big burger"
            className="w-72 lg:w-96 drop-shadow-2xl mx-auto z-10 animate-float"
          />
          {/* Small burger */}
          <img
            src={burgerSmall}
            alt="Small burger"
            className="w-40 lg:w-64 absolute -left-4 lg:left-[55%] -top-4 lg:top-[55%] drop-shadow-xl rotate-[-10deg] animate-float-delay"
          />
        </div>
        <div className="mt-12 lg:mt-20 text-center">
          <p className="text-[2.5rem] lg:text-[3.5rem] xl:text-[5rem] font-black bg-gradient-to-r from-white to-gray-200/80 bg-clip-text text-transparent drop-shadow-2xl animate-fadeInUp leading-[0.85] tracking-[0.02em] w-fit mx-auto px-8 py-4">
            Enjoy amazing food!
          </p>
          <p className="text-white/90 mt-4 text-lg lg:text-xl font-medium">
            Delicious meals delivered to your door
          </p>
        </div>
      </div>

      {/* Form side */}
        <div className="lg:w-1/2 flex items-center justify-center p-10 lg:p-16 order-1 lg:order-2">
        <div className="w-full max-w-lg lg:max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <h1 className="[font-family:'Lobster'] text-[3rem] lg:text-[4.5rem] font-black font-[700] bg-gradient-to-r from-[#FF939B] via-[#F97A89] to-[#EF2A39] bg-clip-text text-transparent drop-shadow-[0_8px_32px_rgba(239,42,57,0.4)] mb-4 letter-spacing:2px">
              EatsyChat
            </h1>
            <p className="text-gray-600 text-sm">Log in to start chattingF</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-xl text-sm animate-bounce">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-xl lg:text-2xl font-bold text-gray-800 mb-5">
                Email or Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-300 text-lg placeholder-gray-500"
                  placeholder="Enter your email or phone number"
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
                    d="M3 8l7.27 6.55c.85.75 2.18.75 3.03 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xl lg:text-2xl font-bold text-gray-800 mb-5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-300 text-lg placeholder-gray-500"
                  placeholder="Enter your password"
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

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-red-500 hover:text-red-600 font-semibold transition-colors"
              >
                Forget password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-gradient-to-r from-[#EF2A39]/95 to-[#EF2A39] text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:from-[#FF0000] hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-red-300/70 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 h-5 w-5 text-white"
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
                  <span>Signing in...</span>
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-6 text-xl font-medium text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 py-3 px-6 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="font-semibold text-gray-800">
              Continue with Google
            </span>
          </button>

          {/* Sign Up */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-red-500 font-bold hover:text-red-600 transition-colors"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.02);
          }
        }
        @keyframes floatDelay {
          0%,
          100% {
            transform: translateY(0) rotate(-10deg) scale(1);
          }
          50% {
            transform: translateY(-16px) rotate(-10deg) scale(1.02);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: floatDelay 3.5s ease-in-out infinite 0.6s;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out 1s both;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default LogIn;
