import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
// Only show one card at a time for mobile/tablet using CSS, and set Embla options for single slide scroll
const emblaOptions = {
  loop: true,
  align: 'start' as 'start' | 'center' | 'end',
  slidesToScroll: 1,
};

interface EmblaCarouselProps {
  children: React.ReactNode;
}

export default function EmblaCarousel({ children }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(React.Children.count(children));

  useEffect(() => {
    if (!emblaApi) return;
    setSlideCount(emblaApi.slideNodes().length);
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, children]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx: number) => emblaApi && emblaApi.scrollTo(idx), [emblaApi]);

  return (
    <div className="w-full relative flex flex-col items-center">
      <div className="relative w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {children}
          </div>
        </div>
        {/* Left Arrow */}
        <button
          className="absolute -left-16 md:-left-20 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white dark:bg-[#23272f] border-2 border-blue-400 dark:border-blue-300 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-blue-700 dark:text-blue-200 text-2xl"
          style={{ transform: 'translateY(-50%)' }}
          onClick={scrollPrev}
          aria-label="Previous"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        {/* Right Arrow */}
        <button
          className="absolute -right-16 md:-right-20 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white dark:bg-[#23272f] border-2 border-blue-400 dark:border-blue-300 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-blue-700 dark:text-blue-200 text-2xl"
          style={{ transform: 'translateY(-50%)' }}
          onClick={scrollNext}
          aria-label="Next"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
        </button>
      </div>
      {/* Dot navigation */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <div className="relative w-32 h-8 flex items-center justify-center" style={{minWidth: '8rem'}}>
          {(() => {
            const maxDots = 4;
            let dotIndices: number[] = [];
            if (slideCount <= maxDots) {
              dotIndices = Array.from({ length: slideCount }, (_, idx) => idx);
            } else {
              // Looping carousel effect for dots
              for (let i = 0; i < maxDots; i++) {
                dotIndices.push((selectedIndex + i) % slideCount);
              }
            }
            // All buttons same size
            const size = 16; // px
            const spacing = 22; // px
            // Make container wide enough for smooth loop
            return dotIndices.map((idx, i) => {
              // For loop effect, wrap left position
              let left = i * spacing;
              // If looping, animate left from rightmost to leftmost
              if (i === 0 && selectedIndex + i >= slideCount) left = (maxDots - 1) * spacing;
              return (
                <button
                  key={idx}
                  className={`absolute rounded-full border-2 bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-600 transition-all duration-500 ease-in-out focus:outline-none`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}px`,
                    transitionProperty: 'width, height, left',
                  }}
                  onClick={() => scrollTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
