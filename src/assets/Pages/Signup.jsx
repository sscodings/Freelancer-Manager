import React from "react";
import API from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/signup", { name, email, password });
      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      alert("User exists or credentials are wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">

      <div className="w-full max-w-sm px-6">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Create account</h2>
          <p className="text-zinc-500 text-sm mt-1">Get started for free</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

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
            Sign Up
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-500 hover:text-emerald-400 font-medium transition">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}