// 'use client'
// import Link from 'next/link'
// import { createClient } from "@/utils/supabase/client";
// import { useState, useEffect } from 'react';

// interface BlogData {
//   title: string;
//   BlogID: string;
// }

// interface BlogListProps {
//   title: string;
// }

// export default function BlogList({ title }: BlogListProps) {
//   const [blogData, setBlogData] = useState<BlogData[]>([]);
//   const supabase = createClient();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const { data, error } = await supabase.from("blog_data").select("title, BlogID"); 

//       if (error) {
//         console.error("Error fetching blogs:", error);
//       } else {
//         console.log("Fetched data:", data);
//         setBlogData(data);
//       }
//     };

//     fetchBlogs();
//   }, []); 

//   const handleData = (title: string) => {
//     console.log("Title is", title);
//     sessionStorage.setItem('title', title);
//   };

//   return (
//     <div>
//       <ul>
//         {blogData.map((blog) => (
//           <li className='border border-black mt-4 p-6 rounded-sm' key={blog.BlogID}>
//             <Link onClick={() => handleData(blog.title)} href={`/blog/${blog.BlogID}`}>
//               {title=blog.title} 
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


'use client'
import Link from 'next/link'
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface BlogData {
  title: string;
  BlogID: string;
  author_Name?: string;
  created_at?: string;
}

interface BlogListProps {
  title: string;
}

export default function BlogList({ title }: BlogListProps) {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("blog_data")
          .select("title, BlogID, author_Name, created_at")
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching blogs:", error);
        } else {
          console.log("Fetched data:", data);
          setBlogData(data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []); 

  const handleData = (title: string) => {
    console.log("Title is", title);
    sessionStorage.setItem('title', title);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-md shadow-sm border border-slate-200 p-4 animate-pulse">
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-100 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-slate-50 rounded w-full mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (blogData.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-12 bg-white rounded-md shadow-sm border border-slate-200">
        <div className="text-center">
          <h3 className="text-lg font-medium text-slate-700 mb-2">No blogs yet</h3>
          <p className="text-slate-500 mb-4">Start writing to see your entries here.</p>
          <Link 
            href="/create_blog"
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium shadow-sm hover:bg-blue-700 transition-colors"
          >
            Create Your First Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogData.map((blog) => (
          <Link 
            key={blog.BlogID}
            href={`/blog/${blog.BlogID}`}
            onClick={() => handleData(blog.title)}
            className="block"
          >
            <div className="h-full bg-white rounded-md shadow-sm border border-slate-200 hover:border-blue-300 transition-all duration-200 p-4">
              <h2 className="text-lg font-medium text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                {blog.title}
              </h2>
              
              <div className="flex flex-wrap items-center text-sm text-slate-500 mb-3">
                {blog.author_Name && (
                  <span className="mr-3">By {blog.author_Name}</span>
                )}
                
                {blog.created_at && (
                  <span>{formatDate(blog.created_at)}</span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-blue-600 font-medium mt-2">
                Read more
                <ArrowRight className="h-3 w-3 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}