// lib/getBlogStaticParams.ts
import { createClient } from '@supabase/supabase-js';

export async function getBlogStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: blogs, error } = await supabase.from('Blog').select('BlogID');
  if (error) {
    console.error('Error fetching blog ids:', error);
    return [];
  }

  return blogs.map((blog) => ({
    id: String(blog.BlogID),
  }));
}
