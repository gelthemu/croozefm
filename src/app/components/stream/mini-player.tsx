"use client";

import { useMiniPlayer } from "@/app/context/mini-player-context";
import { useEffect, useCallback, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

export default function MiniPlayer() {
  const [progress, setProgress] = useState(0);
  const {
    isMiniPlayerOpen,
    isStreamActive,
    isStreaming,
    isAudioPlaying,
    audioRef,
    currentSource,
    tagLine,
    setIsMiniPlayerOpen,
    setIsStreamActive,
    setIsStreaming,
    setIsAudioPlaying,
    setCurrentSource,
    setTagLine,
  } = useMiniPlayer();

  const handleAudioError = useCallback(() => {
    setIsStreamActive(false);
    setIsAudioPlaying(false);
  }, [setIsStreamActive, setIsAudioPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const percentage =
        (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0;
      setProgress(isNaN(percentage) ? 0 : percentage);
    }
  }, [audioRef]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.onerror = handleAudioError;
      currentAudio.ontimeupdate = handleTimeUpdate;
    }

    return () => {
      if (currentAudio) {
        currentAudio.onerror = null;
        currentAudio.ontimeupdate = null;
      }
    };
  }, [audioRef, handleAudioError, handleTimeUpdate]);

  const handleAudioPlay = useCallback(() => {
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
          setIsStreaming(false);
        });
    } else {
      audioRef.current.pause();
      // audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
      setIsStreamActive(true);
      setIsStreaming(false);
    }
  }, [audioRef, setIsAudioPlaying, setIsStreamActive, setIsStreaming]);

  const handleClose = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setProgress(0);
    setIsAudioPlaying(false);
    setIsStreamActive(true);
    setIsStreaming(false);
    setIsMiniPlayerOpen(false);
    setCurrentSource(undefined);
    setTagLine("...");
  }, [
    audioRef,
    setProgress,
    setCurrentSource,
    setIsAudioPlaying,
    setIsMiniPlayerOpen,
    setIsStreamActive,
    setIsStreaming,
    setTagLine,
  ]);

  useEffect(() => {
    if (isMiniPlayerOpen && currentSource) {
      if (audioRef.current) {
        audioRef.current.src = currentSource;
      }
      handleAudioPlay();
    }

    if (!isMiniPlayerOpen && currentSource) {
      handleClose();
    }
  }, [isMiniPlayerOpen, currentSource, handleAudioPlay, audioRef, handleClose]);

  return (
    <div
      className={`fixed bottom-1.5 left-1.5 right-1.5 md:left-auto md:right-1.5 md:w-[320px] p-2.5 text-center text-light backdrop-blur-md bg-gray/80 border-2 border-red/80 rounded-sm transition-all duration-500 overflow-hidden z-50 ${
        isMiniPlayerOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      }`}
    >
      <div>
        <div className="relative flex flex-row items-center justify-between space-x-1.5">
          {isStreamActive ? (
            <button
              type="button"
              className="flex justify-center items-center cursor-pointer"
              onClick={handleAudioPlay}
              aria-label={isAudioPlaying ? "Pause Audio" : "Play Audio"}
            >
              {isAudioPlaying ? (
                <FaPauseCircle className="w-5 h-5" />
              ) : (
                <FaPlayCircle className="w-5 h-5" />
              )}
            </button>
          ) : (
            <p className="text-center text-sm md:text-xs text-red font-medium">
              <i className="fa-solid fa-exclamation-triangle mr-1"></i>
              Stream Error
            </p>
          )}
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer hover:rotate-180 transition-transform duration-500"
            onClick={handleClose}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-sm text-light/60 px-2 py-1 rounded-sm"></i>
          </button>
        </div>
        {isStreamActive && isAudioPlaying && (
          <>
            <div className="w-full h-1 bg-dark/40 border border-light/20 mt-2">
              <div
                className={`w-full h-full transition-all duration-500 ${
                  isStreaming ? "animate-stream" : ""
                } bg-red/80`}
                style={{
                  width: isStreaming ? "100%" : `${progress}%`,
                }}
              />
            </div>
            <div className="text-light/60 text-left text-sm md:text-xs md:font-light px-1 pt-1.5">
              <span>
                <strong className="font-medium md:font-normal line-clamp-1">
                  {tagLine}
                </strong>
              </span>
            </div>
          </>
        )}
        <audio ref={audioRef} src={currentSource} preload="metadata" />
      </div>
    </div>
  );
}
