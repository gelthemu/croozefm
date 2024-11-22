"use client";

import { X } from "lucide-react";
import MiniPlayer from "./tiny/mini-player";
import { useMiniPlayer } from "@/app/context/mini-player-context";

export default function PersistentMiniPlayer() {
  const {
    isMiniPlayerOpen,
    isStreamActive,
    isAudioPlaying,
    audioRef,
    setIsMiniPlayerOpen,
    setIsStreamActive,
    setIsAudioPlaying,
  } = useMiniPlayer();

  return (
    <div
      className={`w-[280px] md:w-[320px] overflow-hidden fixed bottom-2 right-2 transition-all duration-300 z-50 ${
        isMiniPlayerOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      }`}
    >
      <button
        type="button"
        className="absolute top-0 right-0 z-50 cursor-pointer p-2 hover:rotate-180 transition-transform duration-300"
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          setIsAudioPlaying(false);
          setIsStreamActive(true);
          setIsMiniPlayerOpen(false);
        }}
        aria-label="Close player"
      >
        <X className="w-4 h-4" />
      </button>
      <MiniPlayer
        audioRef={audioRef}
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
        isStreamActive={isStreamActive}
        setIsStreamActive={setIsStreamActive}
      />
    </div>
  );
}
