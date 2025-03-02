"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

interface ScrollToTopProps {
  threshold?: number;
  smooth?: boolean;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 500,
  smooth = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-1.5 flex items-center justify-center text-light/90 rounded-md bg-dark/30 dark:bg-dark/40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
