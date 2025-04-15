'use client';
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
    <div className="flex justify-center w-full ">
      <div className="w-full max-w-3xl">
        {blogData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-1 text-center bg-white/5 rounded-2xl shadow-xl p-8 border border-gray-200/10 backdrop-blur-sm">
            <Bookmark className="w-16 h-16 mb-4 text-indigo-300 opacity-60" />
            <h3 className="text-xl font-medium text-gray-700">No entries yet</h3>
            <p className="mt-2 text-gray-500">Your diary entries will appear here once created</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {blogData.map((blog) => (
              <li
                className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-xl transition-all duration-300 hover:bg-indigo-50 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:shadow-lg group transform hover:translate-y-1"
                key={blog.BlogID}
              >
                <Link
                  onClick={() => handleData(blog.title)}
                  href={`/blog/${blog.BlogID}`}
                  className="block p-5"
                >
                  <div className="flex justify-between items-center">
                    <h2 
                      className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 transition-colors"
                    >
                      {blog.title}
                    </h2>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="mt-3 flex items-center text-gray-500 text-sm dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Read entry</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
