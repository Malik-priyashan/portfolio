"use client";
import { useEffect, useState } from "react";
import { 
  HiMenu, 
  HiX, 
  HiHome,
  HiUser,
  HiLightBulb,
  HiBriefcase,
  HiMail
} from "react-icons/hi"; // React Icons

const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: HiHome },
  { id: "about", label: "About", Icon: HiUser },
  { id: "skills", label: "Skills", Icon: HiLightBulb },
  { id: "projects", label: "Projects", Icon: HiBriefcase },
  { id: "contacts", label: "Contacts", Icon: HiMail },
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
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for active nav item
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

      setScrolled(window.scrollY > 50); // add shadow after scrolling
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
    <nav
      className={classNames(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 rounded-b-2xl md:rounded-b-[3rem]",
        scrolled 
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-3xl shadow-lg border-b-2 border-blue-500/30" 
          : "bg-white/70 dark:bg-black/70 backdrop-blur-2xl shadow-md border-b border-blue-500/20"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-3 md:py-5">
        {/* Left - Name with gradient */}
        <div 
          className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300" 
          onClick={() => scrollToSection("home")}
        > 
          Malik Priyashan
        </div>

        {/* Center - Nav Items (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.Icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={classNames(
                  "relative flex items-center gap-3 px-5 py-3 rounded-lg group transition-all duration-300 hover:scale-110",
                  active === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
                )}
                aria-label={item.label}
              >
                <Icon className={classNames(
                  "text-2xl transition-transform duration-300 group-hover:rotate-12",
                  active === item.id ? "text-blue-600 dark:text-blue-400" : ""
                )} />
                <span className={classNames(
                  "text-base font-semibold tracking-wide",
                  active === item.id ? "text-blue-600 dark:text-blue-400" : ""
                )}>
                  {item.label}
                </span>
                {/* Animated underline */}
                <span 
                  className={classNames(
                    "absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300",
                    active === item.id ? "w-full" : "w-0"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Right - Hamburger */}
        <div className="flex items-center gap-2">
          {/* Hamburger menu for mobile */}
          <button
            className={classNames(
              "md:hidden p-2 rounded-lg transition-all duration-300",
              isOpen 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t-2 border-blue-500/30 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const Icon = item.Icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={classNames(
                  "flex items-center w-full px-5 py-4 text-left transition-all duration-300 border-l-4",
                  active === item.id
                    ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-bold"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 border-transparent hover:border-blue-500"
                )}
              >
                <Icon className={classNames(
                  "text-2xl mr-3",
                  active === item.id ? "text-blue-600 dark:text-blue-400" : ""
                )} />
                <span className="text-base font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
