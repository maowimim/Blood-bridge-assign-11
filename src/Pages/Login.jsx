import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 transition-all">
      <div className="rounded-2xl shadow-2xl p-8 w-[380px] border bg-white dark:bg-gray-800 dark:border-gray-700 transition-all">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-6">
          Login to your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="font-medium text-gray-800 dark:text-gray-200">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-1 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="font-medium text-gray-800 dark:text-gray-200">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 rounded-lg border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Forgot Password */}
          <div>
            <button
              onClick={handleForget}
              type="button"
              className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button — NEW COLOR */}
          <button
            type="submit"
            className="w-full text-center px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>

          {/* Google Login */}
          <button
            type="button"
            onClick={googleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 mt-2 font-semibold text-gray-800 dark:text-gray-200 rounded-lg border dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Register Redirect */}
          <div className="text-center mt-3 text-gray-700 dark:text-gray-300">
            <span>Don't have an account? </span>
            <Link
              className="text-blue-600 dark:text-blue-300 font-semibold hover:underline"
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
