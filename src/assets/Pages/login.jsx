import React from "react";
import API from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/signin", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">

      <div className="w-full max-w-sm px-6">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Sign in</h2>
          <p className="text-zinc-500 text-sm mt-1">Welcome back</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Email</label>
            <input
              type="text"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm py-2.5 rounded-lg transition-all duration-200 active:scale-[0.98] mt-2"
          >
            Sign In
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-500 hover:text-emerald-400 font-medium transition">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}