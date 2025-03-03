"use client";

import { Button } from "@/components/ui/button";
import BlogList from "@/component/blog_list";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState,useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [title, settitle] = useState("");
  useEffect(() => {
    const storedData = sessionStorage.getItem("title");
    if (storedData) {
        console.log("Stored data is", storedData);
            settitle(storedData); 
    }
}, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-7xl font-mono">The Diaries</div>
        <Input placeholder="Search" />
      </div>
      <div className= "w-full justify-end mr-10 px-6">
        <div className="flex justify-end">
          <Button onClick={() => {
             router.push("/create_blog");
          }}> start writing</Button>
        </div>
        <BlogList title={title} />
      </div>
    </div>
  );
}
