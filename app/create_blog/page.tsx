"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function CreateBlog() {
  const supabase = createClient();
  const router = useRouter();
  const [BlogTitle,setTitle] = useState("");
  const [AuthorName, setAuthorName] = useState("");
  const [Content, setContent] = useState("");
  const [CreatedAt,setCreatedAt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Button Clicked");
    e.preventDefault();
    const { data: userData, error } = await supabase.auth.getUser();
     console.log(userData);
    if (error || !userData.user) {
      console.error("Error getting user:", error?.message);
      return; 
  }

    let xyz = userData.user?.id;
    
    const blog = {
      BlogID: self.crypto.randomUUID(),
      BlogTitle,
      UserID : xyz,
      Content,
      CreatedAt, 
      };

    const { data: blogData, error: insertError }  = await supabase.from("Blog").insert([blog]);
      console.log(blogData, insertError);

    if (error){
      console.log(error);
      console.log("Error inserting blog:");
    }
     
    router.push("/dashboard");
  };

  return (
    <div>
      <form className="flex flex-col items-center " onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          className=" border border-black"
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          type="text"
          required
        />

        <label htmlFor="authorName">Author Name:</label>
        <input
          className=" border border-black"
          onChange={(e) => setAuthorName(e.target.value)}
          id="authorName"
          type="text"
          required
        />
         <label htmlFor="created_at">Created At:</label>
        <input
        className=" border border-black"
        onChange={(e) => setCreatedAt(e.target.value)}
        id="created_at"
        type="datetime-local"
        />

        <label htmlFor="content">Content :</label>
        <textarea
          className=" border border-black"
          onChange={(e) => setContent(e.target.value)}
          id="content"
          required
        ></textarea>

        <button className="bg-red-600 rounded-e-md" type="submit">Post this Blog</button>
      </form>
    </div>
  );
}
