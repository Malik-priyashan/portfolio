import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
// Embla options for infinite loop carousel
const emblaOptions = {
  loop: true,
  align: 'start' as 'start' | 'center' | 'end',
  slidesToScroll: 1,
  skipSnaps: false,
  dragFree: false,
};

interface EmblaCarouselProps {
  children: React.ReactNode;
}

export default function EmblaCarousel({ children }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const maxVisibleDots = 5;

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx: number) => emblaApi && emblaApi.scrollTo(idx), [emblaApi]);
  const visibleDotStart = Math.min(
    Math.max(selectedIndex - 2, 0),
    Math.max(scrollSnaps.length - maxVisibleDots, 0)
  );
  const dotSlotWidth = 18;

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
      <div className="mt-6 flex h-6 items-center justify-center">
        <div
          className="overflow-hidden"
          style={{ width: `${Math.min(scrollSnaps.length, maxVisibleDots) * dotSlotWidth}px` }}
        >
          <div
            className="flex items-center transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${visibleDotStart * dotSlotWidth}px)` }}
          >
        {scrollSnaps.map((_, index) => {
          const isSelected = index === selectedIndex;
          const isNearSelected = Math.abs(index - selectedIndex) <= 1;

          return (
          <button
            key={index}
            className="flex h-6 shrink-0 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ width: `${dotSlotWidth}px` }}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isSelected ? 'true' : 'false'}
          >
            <span
              className={`rounded-full transition-all duration-500 ease-out ${
                isSelected
                  ? 'h-2.5 w-5 bg-blue-600 shadow-md dark:bg-blue-400'
                  : isNearSelected
                    ? 'h-2.5 w-2.5 bg-blue-300 hover:bg-blue-400 dark:bg-blue-800 dark:hover:bg-blue-700'
                    : 'h-1.5 w-1.5 bg-blue-200 hover:bg-blue-300 dark:bg-blue-950 dark:hover:bg-blue-800'
              }`}
            />
          </button>
        )})}
          </div>
        </div>
      </div>
    </div>
  );
}
