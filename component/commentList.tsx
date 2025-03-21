'use client';

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, } from "react";

interface CommentData {
  blogID: string;
  Comment: string;
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
            Comment: comment.Comment,
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
      <ul className="space-y-4">
        {commmentData.map((comment) => (
          <li
            className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-5 text-white/90 shadow-sm transition-all hover:border-cyan-500/30"
            key={self.crypto.randomUUID()}
          >
            {comment.Comment}
          </li>
        ))}
      </ul>
    </div>
  );
}