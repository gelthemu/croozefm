"use client";

import React from "react";
import Schedule from "../shows/schedule";

interface MiniPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isAudioPlaying: boolean;
  isStreamActive: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  setIsStreamActive: (active: boolean) => void;
}

export default function MiniPlayer({
  audioRef,
  isAudioPlaying,
  isStreamActive,
  setIsAudioPlaying,
  setIsStreamActive,
}: MiniPlayerProps) {
  const handleAudioPlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsStreamActive(true);
          setIsAudioPlaying(true);
        })
        .catch(() => {
          setIsStreamActive(false);
          return;
        });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
      setIsStreamActive(true);
    }
  };

  return (
    <>
      <div className="w-full p-1 backdrop-blur-md bg-gray/80 border border-light/20 rounded-sm">
        <div className="w-full flex items-center justify-between pb-1">
          <div className="flex justify-center items-center">
            {isStreamActive ? (
              <>
                {isAudioPlaying ? (
                  <button
                    className="px-2 cursor-pointer rounded-sm hover:bg-dark/40 transition-colors duration-300"
                    onClick={handleAudioPlay}
                    aria-label="Pause audio"
                  >
                    <i className="fa-solid fa-pause"></i>
                  </button>
                ) : (
                  <button
                    className="px-2 cursor-pointer hover:bg-dark/40 rounded-sm transition-colors duration-300"
                    onClick={handleAudioPlay}
                    aria-label="Play audio"
                  >
                    <i className="fa-solid fa-play"></i>
                  </button>
                )}{" "}
              </>
            ) : (
              <p className="text-center text-xs text-red font-medium p-1">
                <i className="fa-solid fa-exclamation-triangle mr-1"></i>
                Disconnected
              </p>
            )}
            <audio
              ref={audioRef}
              src="https://fmradiohub.in/play?url=http://51.255.235.165:21563/stream"
              className="w-full rounded-none"
            />
          </div>
        </div>
        <Schedule />
      </div>
    </>
  );
}
