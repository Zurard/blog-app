// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/utils/supabase/client";
// import { getRandomValues, randomUUID } from "crypto";

// export default function CreateBlog() {
//   const supabase = createClient();
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [author_Name, setAuthorName] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     console.log("Button Clicked");
//     e.preventDefault();
//     const { data: userData, error } = await supabase.auth.getUser();
//      console.log(userData);
//     if (error || !userData.user) {
//       console.error("Error getting user:", error?.message);
//       return; 
//   }

//     let xyz = userData.user?.id;
    
//     const blog = {
//       BlogID: self.crypto.randomUUID(),
//       title,
//       AuthorID : xyz, 
//       author_Name,
//       content,
//       created_at: new Date().toISOString(), 
//       };

//     const { data: blogData, error: insertError }  = await supabase.from("blog_data").insert([blog]);
//       console.log(blogData, insertError);

//     if (error){
//       console.log("Error inserting blog:");
//       // console.log(error.message);
//     }
     
//     router.push("/dashboard");
//   };

//   return (
//     <div>
//       <form className="flex flex-col items-center " onSubmit={handleSubmit}>
//         <label htmlFor="title">Title:</label>
//         <input
//           className=" border border-black"
//           onChange={(e) => setTitle(e.target.value)}
//           id="title"
//           type="text"
//           required
//         />

//         <label htmlFor="authorName">Author Name:</label>
//         <input
//           className=" border border-black"
//           onChange={(e) => setAuthorName(e.target.value)}
//           id="authorName"
//           type="text"
//           required
//         />

//         <label htmlFor="content">Conten:</label>
//         <textarea
//           className=" border border-black"
//           onChange={(e) => setContent(e.target.value)}
//           id="content"
//           required
//         ></textarea>

//         <button className="bg-red-600 rounded-e-md" type="submit">Post this Blog</button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";

export default function CreateBlog() {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author_Name, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Button Clicked");
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data: userData, error } = await supabase.auth.getUser();
      console.log(userData);
      if (error || !userData.user) {
        console.error("Error getting user:", error?.message);
        return;
      }

      let xyz = userData.user?.id;
      
      const blog = {
        BlogID: self.crypto.randomUUID(),
        title,
        AuthorID: xyz,
        author_Name,
        content,
        created_at: new Date().toISOString(),
      };

      const { data: blogData, error: insertError } = await supabase.from("blog_data").insert([blog]);
      console.log(blogData, insertError);

      if (insertError) {
        console.log("Error inserting blog:");
        throw insertError;
      }
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to submit blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center">
          <Button
            variant="ghost"
            className="flex items-center text-slate-600 hover:text-slate-900 mr-4"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-slate-800">Create New Blog</h1>
        </div>

        <div className="bg-white shadow-md rounded-xl p-8 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                Blog Title
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                type="text"
                placeholder="Enter a captivating title..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="authorName" className="block text-sm font-medium text-slate-700">
                Author Name
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                onChange={(e) => setAuthorName(e.target.value)}
                id="authorName"
                type="text"
                placeholder="Your name or pseudonym"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-slate-700">
                Content
              </label>
              <textarea
                className="w-full px-4 py-3 h-64 rounded-lg border border-slate-300 shadow-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                onChange={(e) => setContent(e.target.value)}
                id="content"
                placeholder="Write your blog content here..."
                required
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                type="submit"
                disabled={isSubmitting}
              >
                <div className="flex items-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Publish Blog
                    </>
                  )}
                </div>
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-slate-500 text-sm">
          {/* <p>All blog posts are subject to community guidelines and moderation.</p> */}
        </div>
      </div>
    </div>
  );
}