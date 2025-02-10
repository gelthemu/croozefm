"use client";

import React from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { ArrowDownRight } from "lucide-react";

export default function StreamBtn() {
  const { isMiniPlayerOpen, setIsMiniPlayerOpen } = useMiniPlayer();

  return (
    <button
      className={`text-light text-sm font-semibold md:font-medium px-4 py-2 rounded-sm flex items-center space-x-1 transition-all duration-500 ${
        isMiniPlayerOpen
          ? "bg-gray/80 dark:bg-gray/100"
          : "bg-red"
      }`}
      onClick={() => {
        setTimeout(() => {
          setIsMiniPlayerOpen(true);
        }, 500);
      }}
      disabled={isMiniPlayerOpen}
    >
      <span>Start Streaming, Now</span> <ArrowDownRight className="w-4 h-4" />
    </button>
  );
}
