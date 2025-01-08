"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "../mockData"; // Import mock data (adjust path as needed)

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Simulate checking credentials against mock data
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Store user session in localStorage
      localStorage.setItem("session", JSON.stringify(user));
      router.push("/dashboard"); // Redirect to dashboard
    } else {
      setError("Invalid credentials!"); // Set error message for invalid credentials
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain" /> {/* Add your logo image here */}
        </div>

        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Optional Sign Up Link */}
        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a></p>
        </div> */}
      </div>
    </div>
  );
}
