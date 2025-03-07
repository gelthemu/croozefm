"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface TitleUpdaterProps {
  isAudioPlaying: boolean;
  tagLine: string | undefined;
}

export default function TitleUpdater({
  isAudioPlaying,
  tagLine,
}: TitleUpdaterProps) {
  const pathname = usePathname();
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return;
    }

    try {
      if (!hasInitializedRef.current) {
        if (!localStorage.getItem("pageTitles")) {
          localStorage.setItem("pageTitles", JSON.stringify({}));
        }
        hasInitializedRef.current = true;
      }

      const pageTitles = JSON.parse(localStorage.getItem("pageTitles") || "{}");

      if (!pageTitles[pathname]) {
        pageTitles[pathname] = document.title;
        localStorage.setItem("pageTitles", JSON.stringify(pageTitles));
      }
    } catch (error) {
      console.error(error);
    }
  }, [pathname]);

  useEffect(() => {
    const pageTitles = JSON.parse(localStorage.getItem("pageTitles") || "{}");
    const originalTitle = pageTitles[pathname] || document.title;

    if (isAudioPlaying && tagLine) {
      document.title = `${tagLine} | Crooze FM`;
    } else {
      document.title = originalTitle;
    }

    return () => {
      if (!isAudioPlaying) {
        document.title = originalTitle;
      }
    };
  }, [isAudioPlaying, tagLine, pathname]);

  return null;
}
