"use client";

import { login } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, UserPlus, LogIn, Eye, EyeOff } from "lucide-react";
import ThemeToggle from "@/component/ThemeToogle";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <ThemeToggle />
      <div className="w-full max-w-md">
        {/* Logo and Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 transition-all duration-300 hover:text-indigo-800 hover:scale-105">
            The Diaries
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Your personal space for thoughts</p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          <form className="p-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block transition-colors group-hover:text-indigo-600" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block transition-colors group-hover:text-indigo-600" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                className="w-full py-3 bg-indigo-600 rounded-lg text-white font-medium shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:translate-y-1 hover:shadow-lg flex items-center justify-center"
                formAction={async (formData) => {
                  const error = await login(formData);
                  if (error) {
                    alert(error);
                  }
                }}
              >
                <LogIn className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12" />
                Sign In
              </button>
            </div>
          </form>

          {/* Card Footer */}
          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {"Don't have an account?"}
              </p>
              <button 
                className="mt-3 sm:mt-0 px-5 py-2 bg-white dark:bg-gray-900 border border-indigo-300 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center"
                onClick={() => router.push("/signUp")}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </button>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
          By signing in, you agree to our 
          <a href="#" className="text-indigo-600 hover:underline ml-1">Terms of Service</a>
          <span className="mx-1">and</span>
          <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
