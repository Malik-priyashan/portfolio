"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger icons

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "👤" },
  { id: "skills", label: "Skills", icon: "💡" },
  { id: "projects", label: "Projects", icon: "🛠️" },
  { id: "contacts", label: "Contacts", icon: "✉️" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({
  sectionRefs,
}: {
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}) {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 80; // offset for navbar
      let current = "home";
      for (const item of NAV_ITEMS) {
        const ref = sectionRefs.current[item.id];
        if (ref) {
          const { top } = ref.getBoundingClientRect();
          if (top + window.scrollY - 100 <= scrollY) {
            current = item.id;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  const scrollToSection = (id: string) => {
    const ref = sectionRefs.current[id];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false); // close menu on mobile
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#18181b]/80 shadow-lg backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Left - Name */}
        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Malik Priyashan
        </div>

        {/* Center - Nav Items (hidden on mobile) */}
        <div className="hidden md:flex gap-4 sm:gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={classNames(
                "flex flex-col items-center px-2 sm:px-4 py-1 group transition",
                active === item.id
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
              )}
              aria-label={item.label}
            >
              <span className="text-xl mb-0.5">{item.icon}</span>
              <span className="text-xs tracking-wide">{item.label}</span>
              <span
                className={classNames(
                  "block h-1 w-6 rounded-full mt-1 transition-all",
                  active === item.id ? "bg-blue-500 dark:bg-blue-400" : "bg-transparent"
                )}
              />
            </button>
          ))}
        </div>

        {/* Right - Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#18181b] border-t border-gray-200 dark:border-gray-800">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={classNames(
                "flex items-center w-full px-4 py-3 text-left transition",
                active === item.id
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
              )}
            >
              <span className="text-xl mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
