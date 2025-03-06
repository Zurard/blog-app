'use client';

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";


interface CommentData {
    blogID: string;
}

export default function AddComment( {blogID}: CommentData) {
    const supabase = createClient();
    const [comment, setComment] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {   
        e.preventDefault();
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

        console.log("Comment details are as follwed ", commentDetails);
        console.log("data being passed into a table ", commentData);
        if (insertError) {
        console.log("Error inserting user details:", insertError);
        }

    }

    return (
        <div >
            <input onChange={(e) => setComment(e.target.value)} className="border border-black "/> 
             <button onClick={handleSubmit} className="border border-black">Submit</button>
        </div>
    )
}