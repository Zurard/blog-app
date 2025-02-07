"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function CreateBlog() {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author_Name, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Button Clicked");
    e.preventDefault();
    

    const blog = {
      title,
      AuthorID : (supabase.auth.getUser()).then((user) => {
        console.log("User id is")
        console.log(user.data.user?.id);
        return user.data.user?.id;
      }),
      author_Name,
      content,
      created_at: new Date().toISOString(), 
    };

    const {data,error}  = await supabase.from("blog_data").insert([blog]);
      console.log(data,error);

    if (error){
      console.log("Error inserting blog:");
      // console.log(error.message);
    }
     
    // router.push("/dashboard");
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

        <label htmlFor="content">Content:</label>
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
