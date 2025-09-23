"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);

      // Apply immediately
      document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-2 rounded-full p-2 bg-gray-100 dark:bg-[#23272f] border border-gray-200 dark:border-gray-700 shadow hover:bg-gray-200 dark:hover:bg-[#18181b] transition"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <span className="text-yellow-300 text-xl">☀️</span>
      ) : (
        <span className="text-gray-700 text-xl">🌙</span>
      )}
    </button>
  );
}
