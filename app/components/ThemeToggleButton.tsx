"use client";

import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        px-3 py-1.5 rounded-md border text-[14px] font-medium
        transition-all duration-300 shadow-sm
        ${theme === "dark" 
          ? "bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700"
          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"}
      `}
    >
      {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
