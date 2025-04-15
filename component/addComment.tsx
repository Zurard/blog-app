'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Sun, Moon } from 'lucide-react';

interface CommentData {
  blogID: string;
}

export default function AddComment({ blogID }: CommentData) {
  const supabase = createClient();
  const [comment, setComment] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(systemTheme as 'light' | 'dark');
    document.documentElement.classList.toggle('dark', systemTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme as 'light' | 'dark');
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof comment !== 'string' || !comment.trim()) {
      alert('Comment cannot be empty or just whitespace');
      return;
    }

    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData.user) {
      console.error('Error getting user:', error?.message);
      return;
    }

    const commentDetails = {
      CommentID: self.crypto.randomUUID(),
      UserID: userData.user.id,
      BlogID: blogID,
      Comment: comment
    };

    const { data: commentData, error: insertError } = await supabase
      .from('Comments')
      .insert([commentDetails]);

    if (insertError) {
      console.log('Error inserting comment:', insertError);
    } else {
      setComment('');
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 overflow-hidden transition-colors duration-300">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Theme toggle button
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleTheme}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full shadow-lg transition"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </div> */}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
        <button
          type="submit"
          className="self-end px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:translate-y-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-1/3 -right-10 w-60 h-60 bg-cyan-200 dark:bg-cyan-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
    </div>
  );
}
