"use client";

import React, { useState, useEffect } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import Link from "next/link";
import ImgDiv from "@/app/components/providers/divs/image-div";
import type { Mixtape } from "@/types/mixtape";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { useDownload } from "@/app/context/download-context";
import { PlayerButton } from "@/app/components/providers/divs/record-player";
import { ViewerBoard } from "./downloads/user-feedback";
import Download from "./downloads/download";
import { LiveChatBtn } from "./downloads/user-feedback";
import { ENDPOINT_URL } from "@/data/endpoint";

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

  const { isDownloading, progress, error } = useDownload();

  const [selectedMixtape, setSelectedMixtape] = useState<Mixtape | null>(null);

  useEffect(() => {
    if (mixtapes && mixtapes.length > 0 && !selectedMixtape) {
      setSelectedMixtape(mixtapes[0]);
    }
  }, [mixtapes, selectedMixtape]);

  useEffect(() => {
    if (isMiniPlayerOpen && currentSource && mixtapes?.length > 0) {
      const mixtape = mixtapes.find((m) => m.url === currentSource);
      if (mixtape) {
        setSelectedMixtape(mixtape);
      }
    }
  }, [currentSource, isMiniPlayerOpen, mixtapes]);

  const handlePlay = (mixtape: Mixtape) => {
    if (!mixtape || isLoading) return;

    const isActive = isMiniPlayerOpen && currentSource === mixtape.url;

    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(mixtape.url);
      setIsStreaming(false);
      setTagLine(`${mixtape.title}`);
      setSnapShot(`${ENDPOINT_URL}/assets/cfm-weekly-mixtape.png`);
      setIsMiniPlayerOpen(true);
      setIsSeekable(true);
    }
  };

  const handleSelect = (mixtape: Mixtape) => {
    if (!mixtape || isLoading) return;

    setSelectedMixtape(mixtape);
    const isActive = isMiniPlayerOpen && currentSource === mixtape.url;

    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(mixtape.url);
      setIsStreaming(false);
      setTagLine(`${mixtape.title}`);
      setSnapShot(`${ENDPOINT_URL}/assets/cfm-weekly-mixtape.png`);
      setIsMiniPlayerOpen(true);
      setIsSeekable(true);
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
    <div className="w-full border-y border-gray/40 dark:border-light/10 px-1 py-8">
      <div>
        <ImgDiv
          url={`${ENDPOINT_URL}/assets/cfm-weekly-mixtape.png`}
          alt="Crooze FM Weekly Mixtape"
          className="w-full mb-6"
          text="CFM Weekly Mixtape"
        />

        {selectedMixtape && (
          <div
            id="download"
            className="relative rounded-sm bg-gray/20 dark:bg-gray/80 p-4 border-2 border-red/80 overflow-hidden"
          >
            <div className="flex flex-row items-center justify-between mb-1.5">
              <div className="text-lg font-semibold">
                {selectedMixtape.title}
              </div>
              {mixtapes.indexOf(selectedMixtape) === 0 && (
                <div className="px-3">
                  <span title="Latest Mixtape">
                    <FaWandMagicSparkles size={16} />
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center mb-4 opacity-70">
              <i className="fa-solid fa-headphones mr-2"></i>
              {selectedMixtape.dj?.link ? (
                <Link
                  href={selectedMixtape.dj.link}
                  aria-label={`${selectedMixtape.dj?.name}'s Profile`}
                  className="hover:text-red/80 transition-colors"
                >
                  <span>{selectedMixtape.dj?.name}</span>
                </Link>
              ) : (
                <span>{selectedMixtape.dj?.name}</span>
              )}
            </div>
            <div className="mb-2.5">
              <PlayerButton
                isActive={
                  isMiniPlayerOpen && currentSource === selectedMixtape.url
                }
                isAudioPlaying={isAudioPlaying}
                epoch={selectedMixtape.id}
                onClick={() => handlePlay(selectedMixtape)}
                className="bg-turquoise dark:bg-turquoise"
              />
            </div>
            <div className="flex items-center justify-between">
              <Download
                audioUrl={selectedMixtape.azureUrl}
                fileName={`${selectedMixtape.title}.mp3`}
              />
              <ViewerBoard count={selectedMixtape.title.length} />
            </div>
            {!error && isDownloading && (
              <div
                className="absolute bottom-0 left-0 h-[2px] md:h-[3px] transition-all duration-[0.25s] bg-turquoise z-0"
                style={{ width: `${progress}%` }}
              ></div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="mb-6">
          <div className="flex items-center justify-between text-red/80 font-medium">
            <p>In this PLAYLIST</p>
            <small>{mixtapes.length} Episodes</small>
          </div>
        </div>
        <div className="grid grid-cols-1 space-y-2 mb-4">
          {mixtapes.map((mixtape: Mixtape) => {
            const isSelected = selectedMixtape?.id === mixtape.id;
            const isActive = isMiniPlayerOpen && currentSource === mixtape.url;

            return (
              <div
                key={mixtape.id}
                onClick={() => handleSelect(mixtape)}
                className={`group p-3 rounded-sm cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "bg-red/10 dark:bg-red/20 border-l-4 border-red"
                    : "bg-gray/10 dark:bg-gray/40 hover:bg-gray/20 dark:hover:bg-gray/70 border-l-4 border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-3">
                      {isActive && isAudioPlaying ? (
                        <div className="w-4 h-4 rounded-full bg-red animate-pulse"></div>
                      ) : (
                        <span className="text-gray/60 dark:text-light/60">
                          {mixtapes.indexOf(mixtape) + 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <p>{mixtape.title}</p>
                    </div>
                  </div>

                  {mixtapes.indexOf(mixtape) === 0 && (
                    <div className="px-2 opacity-70">
                      <FaWandMagicSparkles size={12} title="Latest Mixtape" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <p className="font-light text-sm italic opacity-60 mt-4">
            {`Mixtapes obtained from www.croozefm.com, retrieved shortly following their upload to Hostinger. For details, see our `}
            <Link
              href="/policies/legal-notice"
              className="underline hover:text-red"
            >
              Legal Notice
            </Link>
            {`.`}
          </p>
        </div>
        <div className="mt-8">
          <LiveChatBtn />
        </div>
      </div>
    </div>
  );
}
