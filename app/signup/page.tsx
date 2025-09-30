"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/service/UserService";

const SignupPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Gửi dữ liệu đăng ký lên BE, gán ngầm profile_picture_url mặc định
    const res = await createUser({
      username: form.username,
      email: form.email,
      password: form.password,
      profile_picture_url: "http://example.com/temp/img.jpg"
    });
    setLoading(false);
    if (res && res.access) {
      localStorage.setItem("email", form.email);
      setSuccessMsg("Registration successful! Please login.");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } else {
      setError(res?.error || "Registration failed. Please try again.");
    }
  };

  return (
  <div className="bg-white flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-12 max-w-sm w-full flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 flex items-center gap-2 mb-2">
          <span>📝</span> Register
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
            <input type="text" id="username" name="username" value={form.username} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-105 hover:bg-blue-700 transition-all duration-300" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <div className="text-red-600 text-center mt-2">{error}</div>}
          {successMsg && <div className="text-green-600 text-center mt-2">{successMsg}</div>}
        </form>
        <div className="text-center mt-4 text-gray-700">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-600 hover:underline font-semibold">Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
