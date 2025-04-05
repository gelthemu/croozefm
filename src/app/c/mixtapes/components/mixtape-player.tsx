"use client";

import React, { useState, useEffect } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import Link from "next/link";
import ImgDiv from "@/app/components/providers/divs/image-div";
import type { Mixtape } from "@/types/mixtape";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { PlayerButton } from "@/app/components/providers/divs/record-player";
import ViewerBoard from "./downloads/viewer-board";

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
    isLoading,
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
    if (!mixtapes || mixtapes.length === 0 || isLoading) return;

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
    <div className="w-full border-y border-gray/40 dark:border-light/10 px-2 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between text-red/80 font-medium">
          <p>In this PLAYLIST</p>
          <small>{mixtapes.length} Episodes</small>
        </div>
      </div>
      <ImgDiv
        url="https://cfmpulse-fxavapfdeybedqdt.z01.azurefd.net/assets/cfm-weekly-mixtape.png"
        alt="Crooze FM Weekly Mixtape"
        className="w-full mb-8"
        text="CFM Weekly Mixtape"
      />
      <div className="grid grid-cols-1 gap-3">
        {mixtapes.map((mixtape: Mixtape, index: number) => {
          const isActive = isMiniPlayerOpen && currentSource === mixtape.url;
          const fileName = `${mixtape.title}.mp3`;

          return (
            <div
              key={mixtape.id}
              className={`group overflow-hidden rounded-md ${
                isActive
                  ? "border-2 border-red/80 dark:border-red/60"
                  : "border-2 border-red/0"
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
                <div>
                  <PlayerButton
                    isActive={isActive}
                    isAudioPlaying={isAudioPlaying}
                    epoch={mixtape.id}
                    onClick={() => handlePlay(index)}
                  />
                </div>
                <div className="mt-2">
                  <ViewerBoard audioUrl={mixtape.url} fileName={fileName} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
