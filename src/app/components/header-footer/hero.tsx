"use client";

import { useMiniPlayer } from "@/app/context/mini-player-context";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const { isMiniPlayerOpen, setIsMiniPlayerOpen } = useMiniPlayer();

  return (
    <div>
      <div className="w-full my-12 border border-dark">
        <div className="w-full h-full flex justify-center items-center">
          <button
            className={`text-light text-sm font-semibold px-4 py-2 rounded-sm hidden md:flex items-center space-x-1 transition-all duration-300 ${
              isMiniPlayerOpen
                ? "bg-gray/80 dark:bg-gray/100"
                : "bg-red/80 hover:bg-red"
            }`}
            onClick={() => {
              setTimeout(() => {
                setIsMiniPlayerOpen(true);
              }, 500);
            }}
            disabled={isMiniPlayerOpen}
          >
            <span>Listen Live</span> <ArrowDownRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
