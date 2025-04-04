"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ArchiveProps {
  view?: boolean;
}

export default function XNewsButton({ view = true }: ArchiveProps) {
  const router = useRouter();

  const handleNewsClick = () => {
    window.open(
      "https://x.com/hashtag/CroozeFMNews?src=hashtag_click&f=live",
      "_blank"
    );
  };

  const handleArchiveClick = () => {
    router.push("/c/mixtapes");
  };

  return (
    <div className="w-fit flex flex-col sm:flex-row gap-4 _912cfm">
      <button
        onClick={handleNewsClick}
        className="text-light text-sm font-medium px-4 py-2.5 rounded-md bg-red"
      >
        <span className="sr-only">
          Check the Latest Crooze FM Headlines on X
        </span>
        Crooze FM Headlines on X
      </button>
      <button
        onClick={handleArchiveClick}
        className={`text-red text-sm font-semibold px-4 py-2.5 border-2 border-red rounded-md ${
          view ? "" : "hidden"
        }`}
      >
        <span className="sr-only">
          Check the available Crooze FM Mixtapes Archive here
        </span>
        Crooze FM Mixtapes Archive
      </button>
    </div>
  );
}
