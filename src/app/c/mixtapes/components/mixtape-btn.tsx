"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { StreamButton } from "../../../components/stream/stream-btn";
import { Mixtape } from "@/types/mixtape";
import { SNAPSHOTS } from "@/data/endpoints";

interface MixtapeProps {
  mixtape: Mixtape;
}

const MixtapeBtn = ({ mixtape }: MixtapeProps) => {
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
      setSnapShot(`${SNAPSHOTS}/snap-shot-cfm-weekly-mixtape.png`);
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
};

const MixtapeDownloadBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/c/mixtapes");

    setTimeout(() => {
      const element = document.getElementById("download");
      if (element) {
        const headerOffset = 120;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 1000);
  };

  return (
    <StreamButton
      className={`flex-shrink-0 text-sm text-turquoise px-4 py-2 border-[1px] border-turquoise`}
      onClick={handleClick}
    >
      <span>{"Download"}</span>
    </StreamButton>
  );
};

export { MixtapeBtn, MixtapeDownloadBtn };
