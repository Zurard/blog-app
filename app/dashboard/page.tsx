"use client";

import BlogList from "@/component/blog_list";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Search, User } from "lucide-react";
import ThemeToggle from "@/component/ThemeToogle";

interface BlogData {
  title: string;
  BlogID: string;
  link: string;
}

interface UserData {
  FirstName: string;
  LastName: string;
  UserID: string;
}

export default function Dashboard() {
  const supabase = createClient();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogData[]>([]);
  const [title, setTitle] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = sessionStorage.getItem("title");
    if (storedData) {
      setTitle(storedData);
    }

    const fetchUser = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) return;

      const userId = authData.user.id;
      const { data: userDetails } = await supabase
        .from("UserDetail")
        .select("FirstName, LastName, UserID")
        .eq("UserID", userId)
        .single();

      if (userDetails) setUserData(userDetails);
    };

    fetchUser();
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

    if (!error && data) {
      const blogs = data.map((item) => ({
        title: item.BlogTitle,
        link: `/blog/${item.BlogID}`,
        BlogID: item.BlogID,
      }));
      setResults(blogs);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4 relative overflow-hidden">
      <ThemeToggle />
      <div className="w-full container mx-auto px-4 py-16 relative z-10">
        {/* Profile Icon + Name */}
        <div className="absolute top-6 right-6">
          <div
            onClick={() => router.push("/profilePage")}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow hover:shadow-md transition hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <User className="w-5 h-5" />
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
              {userData ? `${userData.FirstName} ${userData.LastName}` : "Loading..."}
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 transition-all duration-300 hover:text-indigo-800 hover:scale-105">
            The Diaries
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Your personal space for thoughts</p>
        </div>

        <div className="w-full max-w-md mx-auto mb-8">
          <div className="relative group">
            <input
              onChange={handleSearch}
              value={query}
              placeholder="Search your diaries..."
              className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 hover:border-indigo-300"
            />
            {results.length > 0 && (
              <div className="absolute w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 z-20">
                {results.map((blog, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                    onClick={() => {
                      window.location.href = blog.link;
                    }}
                  >
                    {blog.title}
                  </div>
                ))}
              </div>
            )}
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          </div>
        </div>

        <div className="w-full mx-auto pb-16">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => router.push("/create_blog")}
              className="px-6 py-3 bg-indigo-600 rounded-lg text-white font-medium shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:translate-y-1 hover:shadow-lg flex items-center justify-center"
            >
              Create a Blog
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
            <div className="p-6">
              <BlogList title={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
