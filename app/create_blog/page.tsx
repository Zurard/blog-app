"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, CalendarIcon, PenLine } from "lucide-react";
import ThemeToggle from "@/component/ThemeToogle"; // Assuming this is your theme toggle component

export default function CreateBlog() {
  const supabase = createClient();
  const router = useRouter();
  const [BlogTitle, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [CreatedAt, setCreatedAt] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData.user) {
      setError("Error fetching user data.");
      return;
    }

    const blog = {
      BlogID: self.crypto.randomUUID(),
      BlogTitle,
      UserID: userData.user?.id,
      Content,
      CreatedAt,
    };

    const { data: blogData, error: insertError } = await supabase
      .from("Blog")
      .insert([blog]);

    if (insertError) {
      setError("Error creating blog.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
   <ThemeToggle/>

      <div className="w-full max-w-md">
        {/* Logo and Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 transition-all duration-300 hover:text-indigo-800 hover:scale-105">
            The Diaries
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Create a new blog post</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded shadow-md transition-all duration-300 transform hover:scale-102">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          <form className="p-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Blog Title Field */}
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block transition-colors group-hover:text-indigo-600" htmlFor="title">
                  Blog Title
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full pl-3 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="Enter blog title"
                  />
                </div>
              </div>

              {/* Content Field */}
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block transition-colors group-hover:text-indigo-600" htmlFor="content">
                  Content
                </label>
                <div className="relative">
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    className="block w-full pl-3 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                    id="content"
                    name="content"
                    rows={8}
                    required
                    placeholder="Write your blog content here"
                  />
                </div>
              </div>

              {/* Date Field */}
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block transition-colors group-hover:text-indigo-600" htmlFor="created_at">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Date
                  </div>
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setCreatedAt(e.target.value)}
                    className="block w-full pl-3 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                    id="created_at"
                    name="created_at"
                    type="datetime-local"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 rounded-lg text-white font-medium shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:translate-y-1 hover:shadow-lg flex items-center justify-center"
              >
                <PenLine className="h-5 w-5 mr-2" />
                Publish Blog
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-center mt-6">
  <button 
    className="px-5 py-2 bg-white dark:bg-gray-900 border border-indigo-300 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center"
    onClick={() => router.push("/dashboard")}
  >
    <ArrowLeft className="h-4 w-4 mr-2" />
    Back to Dashboard
  </button>
</div>
</div>
      </div>
    
  );
}
