// "use client";

// import { Button } from "@/components/ui/button";
// import BlogList from "@/component/blog_list";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { useState, useEffect } from "react";

// export default function Dashboard() {
//   const router = useRouter();
//   const [title, settitle] = useState("");

//   useEffect(() => {
//     const storedData = sessionStorage.getItem("title");
//     if (storedData) {
//       console.log("Stored data is", storedData);
//       settitle(storedData);
//     }
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <div className="flex items-center justify-between p-4">
//         <div className="text-7xl font-mono items-center">The Diaries</div>
//         <Input placeholder="Search" className="w-80" />
//         <Button
//           className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition transform hover:scale-105"
//           onClick={() => {
//             router.push("/create_blog");
//           }}
//         >
//           Start Writing
//         </Button>
//       </div>
//       <div className="flex-1 grid grid-cols-2  gap-1 p-6">
//         <BlogList title={title} />
//       </div>
//     </div>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
import BlogList from "@/component/blog_list";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Search } from "lucide-react"; // Import search icon

export default function Dashboard() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("title");
    if (storedData) {
      console.log("Stored data is", storedData);
      setTitle(storedData);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header section with improved styling */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo with improved typography */}
            <div className="text-5xl md:text-6xl font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              The Diaries
            </div>
            
            {/* Search bar with icon */}
            <div className="relative w-64 md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                placeholder="Search diaries..." 
                className="pl-10 py-2 rounded-lg border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            
            {/* Action button with animations */}
            <Button
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => {
                router.push("/create_blog");
              }}
            >
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 000 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Start Writing
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content area with improved layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-100">
          <h2 className="text-2xl font-medium text-slate-800 mb-4">Your Diaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <BlogList title={title} />
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} The Diaries. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}