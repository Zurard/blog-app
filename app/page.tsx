"use client";

import { login } from "./actions";
import { useRouter } from "next/navigation";
import { Mail, Lock, UserPlus, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 
            className="text-8xl md:text-8xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-300"
            style={{ fontFamily: "var(--font-fleur-de-leah)" }}
          >
            The Diaries
          </h1>
         
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden">
          <form className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 block" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 block" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center"
                formAction={async (formData) => {
                  const error = await login(formData);
                  if (error) {
                    alert(error);
                  }
                }}
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </button>
            </div>
          </form>
          
          <div className="px-8 py-6 bg-white/5 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-white/70 text-sm">
                {"Don't have an account?"}
              </p>
              <button 
                className="mt-3 sm:mt-0 px-5 py-2 bg-transparent border border-white/30 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center"
                onClick={() => router.push("/signUp")}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-white/50 text-sm">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}