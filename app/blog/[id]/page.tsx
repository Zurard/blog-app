

import { createClient } from '@supabase/supabase-js';
import Comments from '@/component/comments';

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: blogs, error } = await supabase.from('Blog').select('BlogID');

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
  
//   console.log("Received params:", params);
// console.log("Type of params.id:", typeof params.id);
// console.log("Value of params.id:", params.id);
   
const blogId = params.id;

  const { data: blog, error } = await supabase
    .from('Blog')
    .select('BlogTitle, Content, CreatedAt, UserDetail (FirstName ,LastName)')
    .eq('BlogID', blogId)
    .single();

// console.log("Blog data:", blog);

  if (error || !blog) {
    console.error("Error fetching blog post:", error);
    return <div>Error loading blog post.</div>;
  }

  return (
    <div>
      <p className='text-6xl ml-4'>{blog.BlogTitle}</p>
      <p className='border border-black pd-6 w-max'>{blog.Content}</p>
      <p><strong>Author:</strong> {blog.CreatedAt}</p>
      <p><strong>Published:</strong> {new Date(blog.CreatedAt).toLocaleDateString()}</p>
      <div>
        <Comments blogID= {blogId}/>
      </div>
    </div>
  );
}
