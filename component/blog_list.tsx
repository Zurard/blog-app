'use client'
import Link from 'next/link'
import { createClient } from "@/utils/supabase/client";
import { useState,useEffect } from 'react';



export default function BlogList() {
  const [blogData, setBlogData] = useState<{ title: string }[]>([]);
  const supabase = createClient()
 
  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("blog_data").select("title");
      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        console.log("Fetched data:", data);
        setBlogData(data);
        console.log("Blog data is ",blogData);
      }
    };

    fetchBlogs();
  }, []); 

  return (
    <div>
        <ul>
        {blogData.map((blog, index) => (
          <li key={index}>
            <Link href={`/blog/${blog.title.toLowerCase().replace(/\s+/g, "-")}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}