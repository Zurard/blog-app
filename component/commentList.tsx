'use client';

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

interface CommentData {
  blogID: string;
  Comment: string;
}

export default function CommentList({ blogID }: CommentData) {
  const [commentData, setCommentData] = useState<CommentData[]>([]);
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
    <div className="flex justify-center mt-6">
      <ul className="space-y-4 w-full max-w-3xl">
        {commentData.map((comment) => (
          <li
            className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 p-5 text-gray-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-md transform hover:translate-y-1"
            key={self.crypto.randomUUID()}
          >
            {comment.Comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
