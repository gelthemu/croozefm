"use client";

import React from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { Headphones } from "lucide-react";
import { StreamButton } from "../../stream/stream-btn";

const MIXTAPE_URL =
  "https://fmradiohub.in/play?url=https://croozefm.com/wp-content/uploads/2025/02/Crooze-FM-Weekly-Mixtapes-DJ-Emma-Vol-1-19th-Feb-2025_01.mp3";

export default function MixtapeBtn() {
  const {
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    currentSource,
    setCurrentSource,
    setIsStreaming,
    setTagLine,
  } = useMiniPlayer();
  const isActive = isMiniPlayerOpen && currentSource === MIXTAPE_URL;

  const handleClick = () => {
    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(MIXTAPE_URL);
      setIsStreaming(false);
      setTagLine("CFM Weekly Mixtape (DJ EmmaVol 1)");
      setIsMiniPlayerOpen(true);
    }
  };

  return (
    <StreamButton
      className={`flex-shrink-0 text-light px-4 py-2 ${
        isActive ? "bg-gray/80 dark:bg-gray/100" : "bg-[#3eac75]"
      }`}
      onClick={handleClick}
      isActive={isActive}
    >
      <span>Listen Now</span>
      <Headphones className="w-4 h-4" />
    </StreamButton>
  );
}
