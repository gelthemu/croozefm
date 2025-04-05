"use client";

import React from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";

interface PlayerButtonProps {
  isActive: boolean;
  isAudioPlaying: boolean;
  epoch: number;
  onClick: () => void;
  className?: string;
}

export const PlayerButton: React.FC<PlayerButtonProps> = ({
  isActive,
  isAudioPlaying,
  epoch,
  onClick,
  className = "",
}) => {
  const { isLoading } = useMiniPlayer();

  const isDisabled = isActive || isLoading;

  return (
    <div
      role="button"
      tabIndex={isDisabled && isAudioPlaying ? -1 : 0}
      aria-label={
        isAudioPlaying && isDisabled
          ? "Currently Playing in Miniplayer"
          : "Play in Miniplayer"
      }
      aria-disabled={isDisabled && isAudioPlaying ? "true" : "false"}
      onClick={() => {
        if (!isDisabled) onClick();
      }}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`bg-gray/30 dark:bg-dark/50 p-2 rounded-sm text-light/90 font-semibold flex items-center justify-between relative border border-light/20 focus:outline-none ${className} ${
        isDisabled ? "opacity-80 cursor-default" : "cursor-pointer"
      }`}
    >
      <div
        className={`px-4 py-2 text-lg transition-all duration-200 rounded-sm ${
          isActive ? "text-red/80" : ""
        }`}
      >
        {isAudioPlaying && isActive ? (
          <>
            <span className="sr-only">Playing...</span>
            <i className="fa-solid fa-pause"></i>
          </>
        ) : (
          <>
            <span className="sr-only">Play</span>
            <i className="fa-solid fa-play"></i>
          </>
        )}
      </div>
      <div className="px-4 py-2 text-sm font-medium">
        <FormatSimpleDate epoch={epoch} />
      </div>
    </div>
  );
};

PlayerButton.displayName = "PlayerButton";
