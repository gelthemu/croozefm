import { FaPlay, FaPause } from "react-icons/fa";
import { PiSpinnerBold } from "react-icons/pi";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { useEffect } from "react";

interface PlayerControlsProps {
  isCollapse: boolean;
  isLoading: boolean;
  handleAudioPlay: () => void;
}

export default function PlayerControls({
  isLoading,
  handleAudioPlay,
}: PlayerControlsProps) {
  const { isStreamActive, isAudioPlaying, audioRef } = useMiniPlayer();

  useEffect(() => {
    if (!("mediaSession" in navigator) || !audioRef.current) {
      return;
    }

    navigator.mediaSession.playbackState = isAudioPlaying
      ? "playing"
      : "paused";
  }, [isAudioPlaying, audioRef]);

  useEffect(() => {
    if (!("mediaSession" in navigator) || !audioRef.current) {
      return;
    }

    navigator.mediaSession.setActionHandler("play", () => {
      if (!isAudioPlaying) {
        handleAudioPlay();
      }
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      if (isAudioPlaying) {
        handleAudioPlay();
      }
    });

    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
    };
  }, [handleAudioPlay, isAudioPlaying, audioRef]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-red focus:outline-none">
        <PiSpinnerBold size={16} className="fa-spin" />
      </div>
    );
  }

  if (isStreamActive) {
    return (
      <div
        role="button"
        tabIndex={0}
        className="flex justify-center items-center text-red cursor-pointer focus:outline-none"
        onClick={handleAudioPlay}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleAudioPlay();
          }
        }}
        aria-label={isAudioPlaying ? "Pause Audio" : "Play Audio"}
      >
        {isAudioPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </div>
    );
  }

  return (
    <p className="text-center text-sm md:text-xs text-red flex-shrink-0">
      <i className="fa-solid fa-exclamation-triangle mr-1"></i>
      {"Error"}
    </p>
  );
}
