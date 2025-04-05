"use client";

import React from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { StreamButton } from "../../../components/stream/stream-btn";
import { Mixtape } from "@/types/mixtape";

interface MixtapeProps {
  mixtape: Mixtape;
}

export default function MixtapeBtn({ mixtape }: MixtapeProps) {
  const {
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    currentSource,
    setCurrentSource,
    setIsStreaming,
    setTagLine,
    setSnapShot,
    setIsSeekable,
    isLoading,
  } = useMiniPlayer();
  const isActive = isMiniPlayerOpen && currentSource === mixtape.url;

  const handleClick = () => {
    if (isLoading) return;

    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(mixtape.url);
      setIsStreaming(false);
      setTagLine(`${mixtape.title} - CFM Weekly Mixtapes`);
      setSnapShot(
        "https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png"
      );
      setIsSeekable(true);
      setIsMiniPlayerOpen(true);
    }
  };

  return (
    <StreamButton
      className={`flex-shrink-0 text-sm text-light px-4 py-2 ${
        isActive ? "bg-gray/80 dark:bg-gray/100" : "bg-turquoise"
      }`}
      onClick={handleClick}
      isActive={isActive}
    >
      <span>{isActive ? "Listening..." : "Listen Now"}</span>
      <i className="fa-solid fa-headphones pl-1.5"></i>
    </StreamButton>
  );
}
