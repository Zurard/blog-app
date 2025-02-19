// 'use client';

import { createClient } from '@supabase/supabase-js';

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: blogs, error } = await supabase.from('blog_data').select('BlogID');

  if (error) {
    console.error('Error fetching blog id:', error);
    return [];
  }

  return blogs.map((blog) => ({
   id:(blog.BlogID), 
  }));
}


export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  console.log("Received params:", params);
console.log("Type of params.id:", typeof params.id);
console.log("Value of params.id:", params.id);


  const { data: blog, error } = await supabase
    .from('blog_data')
    .select('title, content, author_Name, created_at')
    .eq('BlogID', params.id)
    .single();

  if (error || !blog) {
    console.error("Error fetching blog post:", error);
    return <div>Error loading blog post.</div>;
  }

  return (
    // <div>
    //   <p className='text-6xl ml-4'>{blog.title}</p>
    //   <p className='border border-black pd-6 w-max'>{blog.content}</p>
    //   <p><strong>Author:</strong> {blog.author_Name}</p>
    //   <p><strong>Published:</strong> {new Date(blog.created_at).toLocaleDateString()}</p>
    // </div>
    <div className="p-6 m-5 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
  <p className="text-6xl font-bold ml-4 text-gray-800">{blog.title}</p>
  <p className="border border-black p-6 w-max bg-gray-100 rounded-lg">{blog.content}</p>
  <p className="text-gray-600">
    <strong className="text-gray-800">Author:</strong> {blog.author_Name}
  </p>
  <p className="text-gray-600">
    <strong className="text-gray-800">Published:</strong> {new Date(blog.created_at).toLocaleDateString()}
  </p>
</div>

  );
}



