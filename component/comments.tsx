'use client';

import { useEffect, useState } from 'react';
import CommentList from '@/component/commentList';
import AddComment from '@/component/addComment';
import { Sun, Moon } from 'lucide-react';

interface CommentsProps {
  blogID: string;
}

export default function Comments({ blogID }: CommentsProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme as 'light' | 'dark');
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="relative max-w-4xl mx-auto mt-16 z-10">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Theme Toggle
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleTheme}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full shadow-lg transition"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </div> */}

      {/* Comment Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 shadow-xl transform transition-all duration-300 hover:shadow-2xl relative z-10">
        <AddComment blogID={blogID} />
        <CommentList blogID={blogID} Comment="Sample Comment" />
      </div>
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
