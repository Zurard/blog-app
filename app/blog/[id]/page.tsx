import { createClient } from '@supabase/supabase-js';
import Comments from '@/component/comments';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';



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
    id: String(blog.BlogID)
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const blogId = (await params).id;

  const { data: blog, error } = await supabase
    .from('Blog')
    .select('BlogTitle, Content, CreatedAt, UserDetail (FirstName, LastName)')
    .eq('BlogID', blogId)
    .single();

  if (error || !blog) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-white/70 mb-6">{"The entry you're looking for could not be loaded."}</p>
          <Link href="/dashboard" className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(blog.CreatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/dashboard" className="inline-flex items-center text-white/70 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-300 leading-tight"
              style={{ fontFamily: "var(--font-libre-caslon-display)" }}
            >
              {blog.BlogTitle}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/70">
              <div className="flex items-center"> 
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <time dateTime={blog.CreatedAt}>{formattedDate}</time>
              </div>
            </div>
          </header>

          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-6 md:p-8 mb-12">
            <div className="prose prose-invert max-w-none">
              {blog.Content.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-6 text-white/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-white/90 border-b border-white/20 pb-2"
                style={{ fontFamily: "var(--font-libre-caslon-display)" }}>
              Comments
            </h2>
            <Comments blogID={blogId} />
          </div>
        </article>
      </div>
    </div>
  );
}