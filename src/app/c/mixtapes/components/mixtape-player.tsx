"use client";

import React, { useState, useEffect } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import Link from "next/link";
import type { Mixtape } from "@/types/mixtape";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";

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
    setSnapShot,
    setIsSeekable,
  } = useMiniPlayer();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isMiniPlayerOpen && currentSource && mixtapes?.length > 0) {
      const index = mixtapes.findIndex(
        (mixtape) => mixtape.url === currentSource
      );
      if (index !== -1) {
        setPlayingIndex(index);
      }
    }
  }, [currentSource, isMiniPlayerOpen, mixtapes]);

  const handlePlay = (index: number) => {
    if (!mixtapes || mixtapes.length === 0) return;

    const mixtape = mixtapes[index];
    const isActive =
      isMiniPlayerOpen &&
      currentSource === mixtape.url &&
      playingIndex === index;

    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(mixtape.url);
      setIsStreaming(false);
      setTagLine(`${mixtape.title} - CFM Weekly Mixtapes`);
      setSnapShot(
        "https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png"
      );
      setIsMiniPlayerOpen(true);
      setIsSeekable(true);
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
      <div className="w-full md:w-5/6 mx-auto">
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
                className={`group overflow-hidden rounded-md ${
                  isActive
                    ? "border-2 border-red/80 dark:border-red/60"
                    : "border-2 border-red/0"
                } ${
                  mixtapes.indexOf(mixtape) === 0 ? "md:col-span-2" : ""
                } bg-gray/20 dark:bg-gray transition-all duration-500 select-none`}
              >
                <div className="p-4">
                  <div className="flex flex-row items-center justify-between pb-3">
                    <div className="text-sm text-gray/90 dark:text-light/80 font-medium flex items-center">
                      <div className="pr-1.5">
                        <i className="fa-solid fa-headphones"></i>
                      </div>
                      <div>
                        {mixtape.dj?.link ? (
                          <Link
                            href={mixtape.dj.link}
                            aria-label={`${mixtape.dj?.name}'s Profile`}
                          >
                            <span> {mixtape.dj?.name}</span>
                          </Link>
                        ) : (
                          <div>
                            <span> {mixtape.dj?.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {mixtapes.indexOf(mixtape) === 0 && (
                      <div className="px-3 text-xs text-gray/90 dark:text-light/80">
                        <span>
                          <FaWandMagicSparkles size={12} />
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    role="button"
                    tabIndex={isActive && isAudioPlaying ? -1 : 0}
                    aria-label={
                      isAudioPlaying && isActive
                        ? "Currently Playing in Miniplayer"
                        : "Play in Miniplayer"
                    }
                    aria-disabled={isActive && isAudioPlaying}
                    onClick={() => {
                      if (isActive) return;
                      handlePlay(index);
                    }}
                    onKeyDown={(e) => {
                      if ((e.key === "Enter" || e.key === " ") && !isActive) {
                        e.preventDefault();
                        handlePlay(index);
                      }
                    }}
                    className={`bg-gray/30 dark:bg-dark/50 p-2 rounded-sm text-light/80 font-semibold flex items-center justify-between relative border border-light/20 ${
                      isActive ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 transition-all duration-200 rounded-sm ${
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
                    <div className="px-4 py-2 text-sm font-normal">
                      <FormatSimpleDate epoch={mixtape.id} />
                    </div>
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
