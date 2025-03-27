"use client";

import { useEffect, useState } from "react";
import { subscribeToViewCount } from "./view-counter";

interface ViewDisplayProps {
  slug: string;
  initialCount?: number;
}

export default function ViewDisplay({
  slug,
  initialCount = 0,
}: ViewDisplayProps) {
  const [viewCount, setViewCount] = useState(initialCount);

  useEffect(() => {
    const unsubscribe = subscribeToViewCount(slug, setViewCount);
    return () => unsubscribe();
  }, [slug]);

  if (viewCount === 0) {
    return null;
  }

  return (
    <span className="flex">
      {viewCount === 1 ? "1 view" : `${viewCount.toLocaleString()} views`}
    </span>
  );
}
