"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import type { Mixtape } from "@/types/mixtape";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FormatEpochDate } from "@/app/components/tiny/format-date";

interface MixtapePlayerProps {
  mixtapes: Mixtape[];
}

export default function MixtapePlayer({ mixtapes }: MixtapePlayerProps) {
  const {
    isAudioPlaying,
    isMiniPlayerOpen,
    currentSource,
    setIsMiniPlayerOpen,
    setCurrentSource,
    setTagLine,
    setIsStreaming,
  } = useMiniPlayer();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isMiniPlayerOpen && currentSource && mixtapes?.length > 0) {
      const index = mixtapes.findIndex((mixtape) => mixtape.url === currentSource);
      if (index !== -1) {
        setPlayingIndex(index);
      }
    }
  }, [currentSource, isMiniPlayerOpen, mixtapes]);

  const handlePlay = (index: number) => {
    if (!mixtapes || mixtapes.length === 0) return;

    const mixtape = mixtapes[index];
    const isActive = isMiniPlayerOpen && currentSource === mixtape.url;

    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(mixtape.url);
      setIsStreaming(false);
      setTagLine(`${mixtape.title} - CFM Weekly Mixtapes`);
      setIsMiniPlayerOpen(true);
      setPlayingIndex(index);
    }
  };

  if (!mixtapes || mixtapes.length === 0) {
    return (
      <div className="mt-10 flex items-center justify-center p-4">
        <p className="text-red">No mixtapes available, yet.</p>
      </div>
    );
  }

  return (
    <div className="border-y border-gray/40 dark:border-light/10 px-2 py-8">
      <div className="w-full md:w-4/6 mx-auto">
        <div className="mb-4">
          <div className="flex items-center justify-between text-red/80 font-normal">
            <p>In this PLAYLIST</p>
            <small>{mixtapes.length} Episodes</small>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mixtapes.map((mixtape, index) => {
            const isActive = isMiniPlayerOpen && currentSource === mixtape.url;

            return (
              <div
                key={mixtape.id}
                className={`overflow-hidden rounded-sm ${
                  isActive
                    ? "border-2 border-red/80 dark:border-red/60"
                    : "border-2 border-red/0"
                } bg-dark/20 dark:bg-gray/60 transition-all duration-200`}
              >
                <div className="p-4">
                  <div className="flex flex-row-reverse items-center justify-between pb-3">
                    <span className="text-xs text-gray/60 dark:text-light/40 font-medium">
                      <FormatEpochDate epoch={mixtape.id} />
                    </span>
                    <span className="text-xs text-gray/90 dark:text-light/80 font-medium">
                      <i className="fa-solid fa-headphones pr-1.5"></i>{" "}
                      {mixtape.dj?.name}
                    </span>
                  </div>
                  <div className="bg-gray/60 dark:bg-dark/40 p-2 rounded-sm text-light/80 font-semibold flex items-center justify-between relative border border-light/20">
                    <button
                      aria-label={
                        isAudioPlaying && isActive
                          ? "Currently Playing in Miniplayer"
                          : "Play in Miniplayer"
                      }
                      onClick={() => handlePlay(index)}
                      className={`px-4 py-2 transition-all duration-200 rounded-sm ${
                        isActive ? "text-red/80" : ""
                      }`}
                      disabled={isActive && isAudioPlaying}
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
                    </button>
                    <button
                      aria-label="Download"
                      onClick={() =>
                        toast.info(
                          "The file download feature is currently unavailable... sorry!",
                          { autoClose: 4000 }
                        )
                      }
                      className="px-4 py-2 transition-all duration-200 rounded-sm"
                    >
                      <span className="sr-only">Download</span>
                      <i className="fa-solid fa-download"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}