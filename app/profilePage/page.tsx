"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Book,
  Clock,
  Mail,
  Calendar,
  Sun,
  Moon,
} from "lucide-react";
import ThemeToggle from "@/component/ThemeToogle";

interface BlogData {
  title: string;
  BlogID: string;
  CreatedAt: string;
}

interface UserData {
  FirstName: string;
  LastName: string;
  UserID: string;
}

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const [userBlogs, setUserBlogs] = useState<BlogData[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userCreatedAt, setUserCreatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
 
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  
  useEffect(() => {
    const html = document.querySelector("html");
    if (theme === "dark") {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // persist it
  }, [theme]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        console.error("Error fetching authenticated user:", authError?.message);
        router.push("/login");
        return;
      }

      const userId = authData.user.id;
      setUserEmail(authData.user.email ?? null);
      setUserCreatedAt(authData.user.created_at ?? null);

      try {
        setLoading(true);

        const { data: userDetails } = await supabase
          .from("UserDetail")
          .select("FirstName, LastName, UserID")
          .eq("UserID", userId)
          .single();

        setUserData(userDetails || null);

        const { data: blogs } = await supabase
          .from("Blog")
          .select("BlogID, BlogTitle, CreatedAt")
          .eq("UserID", userId)
          .order("CreatedAt", { ascending: false });

        setUserBlogs(
          blogs?.map((blog: any) => ({
            BlogID: blog.BlogID,
            title: blog.BlogTitle,
            CreatedAt: blog.CreatedAt,
          })) || []
        );
      } catch (error) {
        console.error("Error in profile data fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleBlogClick = (title: string) => {
    sessionStorage.setItem("title", title);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative overflow-hidden transition-colors duration-500">
      {/* Blobs Background */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -right-4 w-80 h-80 bg-teal-300 dark:bg-cyan-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Theme Toggle */}
      <ThemeToggle/>

        <Link
          href="/dashboard"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 transition-all duration-300 hover:text-indigo-800 dark:hover:text-white">
              Your Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your account and view your entries
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
            </div>
          ) : (
            <>
              {/* User Profile Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-12 transition-all hover:shadow-2xl">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="bg-indigo-100 dark:bg-indigo-600 rounded-full p-6 text-indigo-600 dark:text-white">
                    <User size={64} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-bold">
                      {userData?.FirstName} {userData?.LastName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-indigo-500" />
                        {userEmail}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                        Member since {userCreatedAt ? formatDate(userCreatedAt) : "N/A"}
                      </div>
                      <div className="flex items-center col-span-full">
                        <Book className="h-5 w-5 mr-2 text-indigo-500" />
                        {userBlogs.length} {userBlogs.length === 1 ? "Entry" : "Entries"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog List */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-600">
                  Your Diary Entries
                </h2>

                {userBlogs.length === 0 ? (
                  <div className="text-center py-8">
                    <Book className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-500 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">You haven't created any entries yet</p>
                    <Link
                      href="/create_blog"
                      className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-white mt-4 font-medium"
                    >
                      Create your first entry
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {userBlogs.map((blog) => (
                      <li
                        key={blog.BlogID}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-indigo-300 hover:shadow-lg group transition-all transform hover:translate-y-1"
                      >
                        <Link
                          href={`/blog/${blog.BlogID}`}
                          onClick={() => handleBlogClick(blog.title)}
                          className="block p-5"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                              {blog.title}
                            </h3>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transform group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="mt-3 flex items-center text-gray-500 dark:text-gray-300 text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            {formatDate(blog.CreatedAt)}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
