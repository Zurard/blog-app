"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { ArrowRight, Bookmark, Clock } from "lucide-react";

interface BlogData {
  title: string;
  BlogID: string;
}

interface BlogListProps {
  title: string;
}

export default function BlogList({ title }: BlogListProps) {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("Blog")
        .select("BlogTitle, BlogID");

      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        console.log("Fetched data:", data);
        setBlogData(
          data.map((blog: any) => ({
            title: blog.BlogTitle,
            BlogID: blog.BlogID,
          }))
        );
      }
    };

    fetchBlogs();
  }, []);

  const handleData = (title: string) => {
    console.log("Title is", title);
    sessionStorage.setItem("title", title);
  };

  return (
    <div className="w-full">
      {blogData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bookmark className="w-16 h-16 mb-4 text-indigo-300 opacity-60" />
          <h3 className="text-xl font-medium text-white/70">No entries yet</h3>
          <p className="mt-2 text-white/50">Your diary entries will appear here once created</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {blogData.map((blog) => (
            <li
              className="bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-indigo-500/10 group"
              key={blog.BlogID}
            >
              <Link
                onClick={() => handleData(blog.title)}
                href={`/blog/${blog.BlogID}`}
                className="block p-5"
              >
                <div className="flex justify-between items-center">
                  <h2 
                    className="text-xl md:text-2xl font-semibold text-white group-hover:text-cyan-300 transition-colors"
                    style={{ fontFamily: "var(--font-libre-caslon-display)" }}
                  >
                    {blog.title}
                  </h2>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-cyan-300 transform group-hover:translate-x-1 transition-all" />
                </div>
                <div className="mt-3 flex items-center text-white/40 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Read entry</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}