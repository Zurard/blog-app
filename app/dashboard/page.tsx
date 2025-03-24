"use client";

import { Button } from "@/components/ui/button";
import BlogList from "@/component/blog_list";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Search } from "lucide-react";

interface BlogData {
  title: string;
  BlogID: string;
  link: string;
}

export default function Dashboard() {
  const supabase = createClient();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogData[]>([]);
  const router = useRouter();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("title");
    if (storedData) {
      console.log("Stored data is", storedData);
      setTitle(storedData);
    }
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchContent = e.target.value;
    setQuery(searchContent);

    if (searchContent.trim() === "") {
      sessionStorage.removeItem("title");
      setTitle("");
      setResults([]);
      return;
    }

    const { data, error } = await supabase
      .from("Blog")
      .select()
      .ilike("BlogTitle", `%${searchContent}%`);

    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      const blogs = data.map((item) => {
        return {
          title: item.BlogTitle,
          link: `/blog/${item.BlogID}`,
          BlogID: item.BlogID,
        }
      });
      console.log("Blogs are", blogs);
      setResults(blogs);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center mb-16">
          <h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-300"
            style={{ fontFamily: "var(--font-fleur-de-leah)" }}
          >
            The Diaries
          </h1>

          <div className="w-full max-w-md mb-8">
            <div className="relative">
              <Input
                onChange={handleSearch}
                value={query}
                placeholder="Search your diaries..."
                className="w-full p-3 pl-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:border-cyan-400 focus:ring-cyan-400 placeholder-white/60 text-white"
              />

              {results.length > 0 && (
                <div className="absolute w-full bg-cyan shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto border border-[#5AB1BB]">
                  {results.map((blog, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 border-b border-white/20 hover:bg-cyan-500/20 cursor-pointer text-white"
                      onClick={() => {
                      window.location.href = blog.link;
                      }}
                    >
                      {blog.title}
                    </div>
                  ))}
                </div>
              )}

              <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
            </div>
          </div>
        </div>

        <div className="w-full mx-auto pb-16">
          <div className="flex justify-end mb-8">
            <Button
              onClick={() => router.push("/create_blog")}
              className="relative px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 group"
            >
              <span className="flex items-center">
                Create a Blog
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
            </Button>
          </div>

          <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
            <BlogList title={title} />
            </div>
        </div>
      </div>
    </div>
  )
}
