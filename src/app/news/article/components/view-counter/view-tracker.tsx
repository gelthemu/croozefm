"use client";

import { useEffect, useRef, useState } from "react";
import { trackArticleView } from "./view-counter";

interface ViewTrackerProps {
  slug: string;
}

export default function ViewTracker({ slug }: ViewTrackerProps) {
  const trackerRef = useRef<HTMLDivElement>(null);
  const [isTracked, setIsTracked] = useState(false);

  useEffect(() => {
    if (isTracked) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          trackArticleView({ slug }).then((success) => {
            if (success) setIsTracked(true);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (trackerRef.current) {
      observer.observe(trackerRef.current);
    }

    return () => observer.disconnect();
  }, [slug, isTracked]);

  return <div ref={trackerRef} className="h-[0px] w-full !p-0 !m-0" />;
}
