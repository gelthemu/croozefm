"use client";

import { useState, useEffect, useRef } from "react";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

interface CarouselProps {
  className?: string;
  btnClass?: string;
  children?: React.ReactNode;
  itemWidth?: number;
}

export default function Carousel({
  className = "",
  btnClass = "",
  children,
  itemWidth = 256,
}: CarouselProps) {
  const [showLeftControl, setShowLeftControl] = useState(false);
  const [showRightControl, setShowRightControl] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const updateControlsVisibility = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    setShowLeftControl(scrollLeft > 0);

    setShowRightControl(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      setTimeout(updateControlsVisibility, 500);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
      setTimeout(updateControlsVisibility, 500);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", updateControlsVisibility);

      updateControlsVisibility();

      setTimeout(updateControlsVisibility, 500);

      return () => {
        carousel.removeEventListener("scroll", updateControlsVisibility);
      };
    }
  }, []);

  return (
    <>
      <div
        ref={carouselRef}
        className={`flex items-start overflow-x-auto scrollbar-hide scroll-smooth ${className}`}
      >
        {children}
      </div>

      {showLeftControl && (
        <div className="absolute left-0 top-0 h-full flex items-center justify-center bg-transparent">
          <button
            onClick={scrollLeft}
            className={`${btnClass} p-1.5 rounded-r-md`}
            aria-label="Previous Item"
          >
            <GrFormPreviousLink size={18} />
          </button>
        </div>
      )}

      {showRightControl && (
        <div className="absolute right-0 top-0 h-full flex items-center justify-center bg-transparent">
          <button
            onClick={scrollRight}
            className={`${btnClass} p-1.5 rounded-l-md`}
            aria-label="Next Item"
          >
            <GrFormNextLink size={18} />
          </button>
        </div>
      )}
    </>
  );
}
