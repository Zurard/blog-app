'use client';

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface CommentData {
    blogID: string;
}

export default function AddComment({ blogID }: CommentData) {
    const supabase = createClient();
    const [comment, setComment] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {   
        e.preventDefault();

        console.log("Comment is", comment);
        
        if (typeof comment !== 'string' || !comment.trim()) {
            alert("Comment cannot be empty or just whitespace");
            return;
        }

        const { data: userData, error } = await supabase.auth.getUser();
        if (error || !userData.user) {
            console.error("Error getting user:", error?.message);
            return;
        }
        let uid = userData.user?.id;
        
        const commentDetails = {
            CommentID: self.crypto.randomUUID(),
            UserID: uid,
            BlogID: blogID,
            Comment: comment,
        };
         
        const { data: commentData, error: insertError } = await supabase
        .from("Comments")
        .insert([commentDetails]);

        console.log("Comment details are as followed ", commentDetails);
        console.log("data being passed into a table ", commentData);
        if (insertError) {
            console.log("Error inserting user details:", insertError);
        }
    }

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-5 shadow-lg mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input 
                    onChange={(e) => setComment(e.target.value)} 
                    className="w-full px-4 py-3 m-1 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Add a comment..."
                />
                <button 
                    type="submit"
                    className="self-end px-6 py-2 mt-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}