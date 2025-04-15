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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden transition-all">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 -right-4 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl shadow-xl p-8 max-w-md text-center relative z-10">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <p className="mb-6">{"The entry you're looking for could not be loaded."}</p>
          <Link href="/dashboard" className="px-5 py-2 bg-indigo-600 dark:bg-indigo-700 rounded-lg text-white font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-1 inline-flex items-center">
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative overflow-hidden transition-all">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -right-4 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <Link href="/dashboard" className="inline-flex items-center text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-500 transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6 text-indigo-600 dark:text-indigo-300 leading-tight transition-all duration-300 hover:text-indigo-800 dark:hover:text-indigo-500"
            >
              {blog.BlogTitle}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center"> 
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <time dateTime={blog.CreatedAt}>{formattedDate}</time>
              </div>
            </div>
          </header>

          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-12 transform transition-all duration-300 hover:shadow-2xl dark:hover:shadow-xl">
            <div className="prose max-w-none">
              {blog.Content.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
              Comments
            </h2>
            <Comments blogID={blogId} />
          </div>
        </article>
      </div>
    </div>
  );
}
