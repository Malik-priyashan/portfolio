"use client";
import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

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
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <HiSun className="text-yellow-400 text-xl" />
      ) : (
        <HiMoon className="text-gray-700 dark:text-gray-300 text-xl" />
      )}
    </button>
  );
}
