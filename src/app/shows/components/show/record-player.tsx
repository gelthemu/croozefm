"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Show } from "@/types/show";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { PlayerButton } from "@/app/components/providers/divs/record-player";
import { FormatCategory } from "@/app/components/tiny/formatCategoryDisplay";
import { SNAPSHOTS } from "@/data/endpoints";

interface RecordPlayerProps {
  show: Show;
}

export default function RecordPlayer({ show }: RecordPlayerProps) {
  const {
    isAudioPlaying,
    isMiniPlayerOpen,
    currentSource,
    setIsMiniPlayerOpen,
    setCurrentSource,
    setTagLine,
    setSnapShot,
    setIsStreaming,
    setIsSeekable,
    isLoading,
  } = useMiniPlayer();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const recordings = useMemo(() => show.recs || [], [show.recs]);

  useEffect(() => {
    if (isMiniPlayerOpen && currentSource && recordings.length) {
      const foundIndex = recordings.findIndex(
        (rec) =>
          `https://croozefm.blob.core.windows.net/audio/${rec.url}.mp3` ===
          currentSource
      );
      if (foundIndex !== -1) {
        setPlayingIndex(foundIndex);
      }
    }
  }, [isMiniPlayerOpen, currentSource, recordings]);

  const isRecordingActive = (recordingUrl: string): boolean => {
    const fullAudioUrl = `https://croozefm.blob.core.windows.net/audio/${recordingUrl}.mp3`;
    return isMiniPlayerOpen && currentSource === fullAudioUrl;
  };

  const handlePlay = (index: number): void => {
    if (!recordings || !recordings[index] || isLoading) return;

    const recording = recordings[index];
    const fullAudioUrl = `https://croozefm.blob.core.windows.net/audio/${recording.url}.mp3`;
    const isActive = isRecordingActive(recording.url) && playingIndex === index;

    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(fullAudioUrl);
      setIsStreaming(false);
      setTagLine(recording.name ? `${recording.name}` : `${show.name}`);
      setSnapShot(`${SNAPSHOTS}/snap-shot-default.png`);
      setIsMiniPlayerOpen(true);
      setIsSeekable(false);
      setPlayingIndex(index);
    }
  };

  if (!recordings.length || recordings.length === 0) {
    return (
      <div className="flex items-center justify-center p-1 my-12">
        <p className="text-red">No recordings available, yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full max-w-3xl mx-auto my-16">
        <div className="mb-4">
          <div className="flex items-center justify-between text-red/80 font-normal">
            <p>In this PLAYLIST</p>
            <small>
              {`
              ${recordings.length} Episode${
                recordings.length === 1 ? "" : "s"
              }`}
            </small>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recordings.map((recording, index) => {
            const isActive = isRecordingActive(recording.url);

            return (
              <div
                key={recording.id}
                className={`group overflow-hidden rounded-md ${
                  isActive
                    ? "border-2 border-red/80 dark:border-red/60"
                    : "border-2 border-red/0"
                } bg-gray/20 dark:bg-gray transition-all duration-500 select-none`}
              >
                <div className="p-4">
                  <div className="flex flex-row items-center justify-between pb-3">
                    <div className="flex items-center text-xs text-gray/90 dark:text-light/80">
                      {recording.category ? (
                        <>
                          <Link href={`/news/${recording.category}`}>
                            <span className="font-medium group-hover:text-red/80">
                              <FormatCategory category={recording.category} />
                            </span>
                          </Link>
                        </>
                      ) : recording.name ? (
                        <>
                          <div className="font-medium">{recording.name}</div>
                        </>
                      ) : (
                        <div className="line-clamp-1">{show.name}</div>
                      )}
                    </div>
                  </div>
                  <PlayerButton
                    isActive={isActive}
                    isAudioPlaying={isAudioPlaying}
                    epoch={recording.id}
                    onClick={() => handlePlay(index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
