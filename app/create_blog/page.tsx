"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, CalendarIcon, PenLine } from "lucide-react";

export default function CreateBlog() {
  const supabase = createClient();
  const router = useRouter();
  const [BlogTitle, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [CreatedAt, setCreatedAt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Button Clicked");
    e.preventDefault();
    const { data: userData, error } = await supabase.auth.getUser();
    console.log(userData);
    if (error) {
      if (!userData.user) {
        console.error("Error getting user:", error?.message)
        return error;
      }
      console.error("Some error", error);
      return;
    }

    const xyz = userData.user?.id;

    const blog = {
      BlogID: self.crypto.randomUUID(),
      BlogTitle,
      UserID: xyz,
      Content,
      CreatedAt,
    };

    const { data: blogData, error: insertError } = await supabase
      .from("Blog")
      .insert([blog]);
    console.log(blogData, insertError);

    if (error) {
      console.log(error);
      console.log("Error inserting blog:");
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-4">
      <div className="container mx-auto px-4 py-12">
        <button 
          onClick={() => router.push("/dashboard")}
          className="flex items-center text-white/70 hover:text-cyan-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="flex flex-col items-center justify-center mb-12">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-300"
            style={{ fontFamily: "var(--font-fleur-de-leah)" }}
          >
            The Diaries
          </h1>
          <h2 
            className="text-3xl md:text-4xl font-bold text-white/90 mb-6" 
            style={{ fontFamily: "var(--font-libre-caslon-display)" }}
          >
            Create New Entry
          </h2>
        </div>

        <form 
          className="w-full max-w-2xl mx-auto p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mb-6">
            <label className="text-sm font-medium text-white/80 mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text"
              placeholder="Enter your diary title"
              required
            />
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-sm font-medium text-white/80 mb-2" htmlFor="authorName">
              Author Name
            </label>
            <input
              className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              id="authorName"
              type="text"
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="flex flex-col mb-6">
            <label className="text-sm font-medium text-white/80 mb-2" htmlFor="created_at">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Date
              </div>
            </label>
            <input
              className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              onChange={(e) => setCreatedAt(e.target.value)}
              id="created_at"
              type="datetime-local"
            />
          </div>

          <div className="flex flex-col mb-8">
            <label className="text-sm font-medium text-white/80 mb-2" htmlFor="content">
              <div className="flex items-center">
                <PenLine className="w-4 h-4 mr-2" />
                Content
              </div>
            </label>
            <textarea
              className="w-full p-4 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all min-h-64"
              onChange={(e) => setContent(e.target.value)}
              id="content"
              placeholder="Write your thoughts here..."
              rows={8}
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button 
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center"
              type="submit"
            >
              Publish Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}