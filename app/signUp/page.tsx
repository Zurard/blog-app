"use client";

import { signup } from "../actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Mail, Lock, UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";
import ThemeToggle from "@/component/ThemeToogle";

export default function SignUp() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    if (password1 !== password2) {
      setError("Passwords do not match!");
      return;
    }

    if (password1.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    setError(null);

    const signupError = await signup(formData);
    
    if (signupError) {
      setError(signupError);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push("/");
      }     
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <ThemeToggle />
      <div className="w-full max-w-md">
        {/* Logo and Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 transition-all duration-300 hover:text-indigo-800 hover:scale-105">
            The Diaries
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Create your account</p>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded shadow-md transition-all duration-300 transform hover:scale-102">
            <p>{error}</p>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          <form className="p-8" action={handleSubmit}>
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
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
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
                    onChange={(e) => setPassword1(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Choose a password"
                  />
                </div>
              </div>
              
              {/* Confirm Password Field */}
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block transition-colors group-hover:text-indigo-600" htmlFor="password2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    onChange={(e) => setPassword2(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
              
              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 rounded-lg text-white font-medium shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:translate-y-1 hover:shadow-lg flex items-center justify-center"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Create Account
              </button>
            </div>
          </form>
          
          {/* Card Footer */}
          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Already have an account?
              </p>
              <button 
                className="mt-3 sm:mt-0 px-5 py-2 bg-white dark:bg-gray-900 border border-indigo-300 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </button>
            </div>
          </div>
        </div>
        
        {/* Terms */}
        <div className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
          By creating an account, you agree to our 
          <a href="#" className="text-indigo-600 hover:underline ml-1">Terms of Service</a>
          <span className="mx-1">and</span>
          <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
