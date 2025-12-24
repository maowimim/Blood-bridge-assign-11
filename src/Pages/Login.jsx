import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";


import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { setUser, handleGoogleSignIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Logged in successfully!");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleForget = () => {
    navigate(`/forget/${email}`);
  };

  return (
<div className="min-h-screen flex items-center justify-center p-6
bg-gradient-to-br from-[#2a1f3d] via-[#221833] to-[#1b132a]
dark:from-[#140d22] dark:via-[#120c1f] dark:to-[#0f0a1a]
transition-all">

  <div
    className="w-[380px] p-8 rounded-2xl border
    bg-[#2d2144]/90 backdrop-blur-md
    shadow-[0_25px_60px_rgba(0,0,0,0.45)]
    border-purple-900/40
    transition-all duration-700 ease-out
    animate-[cardPop_0.7s_ease-out]"
  >

    <h2
      className="text-3xl font-bold text-center mb-6
      bg-gradient-to-r from-purple-300 via-fuchsia-300 to-violet-300
      bg-clip-text text-transparent
      drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]
      animate-[fadeDown_0.6s_ease-out]"
    >
      Login to your Account
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Email Field */}
      <div className="animate-[fadeUp_0.6s_ease-out]">
        <label className="font-medium text-purple-200">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full mt-1 p-3 rounded-lg border
          bg-[#1e1633] text-purple-100 placeholder-purple-400
          border-purple-700/40
          focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          outline-none transition-all duration-300"
          required
        />
      </div>

      {/* Password Field */}
      <div className="animate-[fadeUp_0.7s_ease-out]">
        <label className="font-medium text-purple-200">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full mt-1 p-3 rounded-lg border
          bg-[#1e1633] text-purple-100 placeholder-purple-400
          border-purple-700/40
          focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          outline-none transition-all duration-300"
          required
        />
      </div>

      {/* Forgot Password (LEFT) */}
      <div className="text-left">
        <button
          onClick={handleForget}
          type="button"
          className="text-sm text-purple-300
          hover:text-purple-200 hover:underline transition-all"
        >
          Forgot Password?
        </button>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold text-white
        bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600
        hover:brightness-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
        active:scale-95 transition-all duration-300"
      >
        Login
      </button>

      {/* Google Login */}
      <button
        type="button"
        onClick={googleSignIn}
        className="w-full flex items-center justify-center gap-3 py-3
        rounded-lg font-semibold
        bg-[#22183a] text-purple-200 border border-purple-700/40
        hover:bg-[#2c1f4d]
        active:scale-95 transition-all duration-300"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>

      {/* Register Redirect */}
      <div className="text-center text-purple-300 mt-3">
        <span>Don't have an account? </span>
        <Link
          className="text-fuchsia-300 font-semibold hover:underline"
          to="/register"
        >
          Register
        </Link>
      </div>

    </form>
  </div>
</div>




  );
};

export default Login;
