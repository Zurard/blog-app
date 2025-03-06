"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

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
    <div>
      <ul>
        {blogData.map((blog) => (
          <li
            className="border border-black mt-4 p-6 rounded-sm"
            key={blog.BlogID}
          >
            <Link
              onClick={() => handleData(blog.title)}
              href={`/blog/${blog.BlogID}`}
            >
              {(title = blog.title)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
