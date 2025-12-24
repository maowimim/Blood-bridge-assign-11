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
bg-gradient-to-br from-[#eef2f7] via-[#f4f6f9] to-[#e9edf3]
dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">

  <div
    className="w-[380px] p-8 rounded-2xl border
    bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]
    dark:bg-gray-800 dark:border-gray-700
    transition-all duration-700 ease-out
    animate-[cardPop_0.7s_ease-out]"
  >

    <h2
      className="text-3xl font-bold text-center mb-6
      bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500
      bg-clip-text text-transparent
      animate-[fadeDown_0.6s_ease-out]"
    >
      Login to your Account
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Email Field */}
      <div className="animate-[fadeUp_0.6s_ease-out]">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full mt-1 p-3 rounded-lg border
          bg-[#f7f9fc] text-gray-800
          dark:bg-gray-700 dark:text-white dark:border-gray-600
          focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
          outline-none transition-all duration-300"
          required
        />
      </div>

      {/* Password Field */}
      <div className="animate-[fadeUp_0.7s_ease-out]">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full mt-1 p-3 rounded-lg border
          bg-[#f7f9fc] text-gray-800
          dark:bg-gray-700 dark:text-white dark:border-gray-600
          focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
          outline-none transition-all duration-300"
          required
        />
      </div>

      {/* Forgot Password */}
      <div className="text-right">
        <button
          onClick={handleForget}
          type="button"
          className="text-sm text-gray-500 dark:text-gray-300
          hover:text-indigo-600 transition-all"
        >
          Forgot Password?
        </button>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold text-white
        bg-gradient-to-r from-indigo-500 to-sky-500
        hover:brightness-110 hover:shadow-xl
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
        bg-[#f1f4f9] text-gray-700 border
        dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600
        hover:bg-[#e8edf5] dark:hover:bg-gray-600
        active:scale-95 transition-all duration-300"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>

      {/* Register Redirect */}
      <div className="text-center text-gray-600 dark:text-gray-300 mt-3">
        <span>Don't have an account? </span>
        <Link
          className="text-indigo-600 dark:text-indigo-300 font-semibold hover:underline"
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
