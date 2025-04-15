"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-800 p-2 rounded-full transition-colors"
    >
      {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-700" />}
    </button>
  );
}
