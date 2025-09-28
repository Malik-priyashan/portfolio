import { useEffect, useState } from "react";

export default function ScrollToTopArrow() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device by screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) : 0;
      setScrollPercent(percent);
      // On mobile, show only when not at top
      if (isMobile) {
        setVisible(scrollTop > 0);
      } else {
        setVisible(scrollTop > 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circleLength = 2 * Math.PI * 24;
  const strokeDashoffset = circleLength * (1 - scrollPercent);

  if (!visible) return null;
  return (
    <div
      className="fixed right-6 bottom-6 z-50 flex items-center justify-center"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className="group bg-white dark:bg-[#18181b] rounded-full shadow-lg border-2 border-white/80 p-2 transition-transform hover:scale-110"
        style={{ boxShadow: "0 4px 24px 0 rgba(255,255,255,0.25)" }}
      >
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-14 lg:h-14 xl:w-14 xl:h-14 2xl:w-14 2xl:h-14"
          viewBox="0 0 56 56" fill="none"
        >
          {/* Progress Circle - white, starts at top */}
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="#fff"
            strokeWidth="4"
            strokeDasharray={circleLength}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.2s linear", transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
          {/* Arrow in center */}
          <g>
            <circle cx="28" cy="28" r="18" fill="white" opacity="0.7" />
            <path
              d="M28 20 L28 36 M28 20 L22 26 M28 20 L34 26"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}
