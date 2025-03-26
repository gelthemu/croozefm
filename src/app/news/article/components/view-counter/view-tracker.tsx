// components/ViewTracker.tsx
'use client';

import { useEffect } from 'react';
import { trackArticleView } from './view-counter';

interface ViewTrackerProps {
  slug: string;
}

export default function ViewTracker({ slug }: ViewTrackerProps) {
  useEffect(() => {
    // Track view on client-side mount
    const trackView = async () => {
      await trackArticleView({ slug });
    };

    trackView();
  }, [slug]);

  return null; // This component doesn't render anything
}