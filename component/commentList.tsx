'use client';

import { createClient } from "@/utils/supabase/client";
import { User } from "lucide-react";
import { useState, useEffect, use } from "react";

interface CommentData {
  blogID: string;
}

export default function CommentList({ blogID }: CommentData) {
  const [commmentData, setCommentData] = useState<CommentData[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("Comments")
        .select("Comment, UserID")
        .eq("BlogID", blogID);
      if (error) {
        console.error("Error fetching comments:", error);
      }
      else {
        console.log("Fetched data:", data);
        setCommentData(
          data.map((comment: any) => ({
            comment: comment.Comment,
            UserID: comment.UserID,
            blogID: comment.blogID,
          }))
        );
      }
    };
    fetchComments();
  }, []);

  return (
    <div>
      {/* <ul>
        {commmentData.map((comment) => (
          <li
            className="border border-black mt-4 p-6 rounded-sm"
            key={comment.blogID}
          >
            <Link
              onClick={() => handleData(blog.title)}
              href={`/blog/${blog.BlogID}`}
            >
              {(title = blog.title)}
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
