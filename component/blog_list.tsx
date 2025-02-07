'use client'
import Link from 'next/link'
import { createClient } from "@/utils/supabase/client";
import { useState,useEffect } from 'react';

interface BlogData {
  title: string;
}

export default function BlogList({title}: BlogData) {
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

  const handelData = () => {
    console.log("Title is",title);
  sessionStorage.setItem('title',title);
  }

  return (
    <div>
        <ul >
        {blogData.map((blog, index) => (
          <li className='border border-black mt-4 p-6' key={index}>
            <Link onClick={handelData} href={`/blog`}>
              {blog.title} 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}