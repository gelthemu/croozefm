"use client";

import { useMiniPlayer } from "@/app/context/mini-player-context";
import { useEffect, useCallback, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

export default function MiniPlayer() {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

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

  const formatTime = useCallback((timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  }, []);

  const handleAudioError = useCallback(() => {
    setIsStreamActive(false);
    setIsAudioPlaying(false);
  }, [setIsStreamActive, setIsAudioPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const percentage =
        (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0;
      setProgress(isNaN(percentage) ? 0 : percentage);
      setCurrentTime(formatTime(audioRef.current.currentTime));
    }
  }, [audioRef, formatTime]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  }, [audioRef, formatTime]);

  const handleProgressBarClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || isStreaming) return;

      const progressBar = event.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const progressBarWidth = rect.width;

      const clickPercentage = (clickPosition / progressBarWidth) * 100;

      const newTime = (clickPercentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;

      setProgress(clickPercentage);
      setCurrentTime(formatTime(newTime));
    },
    [audioRef, isStreaming, formatTime]
  );

  const handleEnded = useCallback(() => {
    if (audioRef.current) {
      setProgress(100);
      setIsAudioPlaying(false);

      setTimeout(() => {
        audioRef.current
          ?.play()
          .then(() => {
            setIsStreamActive(true);
            setIsAudioPlaying(true);
          })
          .catch(() => {
            setIsStreamActive(false);
            setIsStreaming(false);
          });
      }, 2500);
    }
  }, [audioRef, setIsStreamActive, setIsAudioPlaying, setIsStreaming]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.onerror = handleAudioError;
      currentAudio.ontimeupdate = handleTimeUpdate;
      currentAudio.onloadedmetadata = handleLoadedMetadata;
      currentAudio.onended = handleEnded;
    }

    return () => {
      if (currentAudio) {
        currentAudio.onerror = null;
        currentAudio.ontimeupdate = null;
        currentAudio.onloadedmetadata = null;
        currentAudio.onended = null;
      }
    };
  }, [
    audioRef,
    handleAudioError,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
  ]);

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
      setIsAudioPlaying(false);
      setIsStreamActive(true);
    }
  }, [audioRef, setIsAudioPlaying, setIsStreamActive, setIsStreaming]);

  const handleClose = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setProgress(0);
    setCurrentTime("0:00");
    setDuration("0:00");
    setIsAudioPlaying(false);
    setIsStreamActive(true);
    setIsStreaming(false);
    setIsMiniPlayerOpen(false);
    setCurrentSource(undefined);
    setTagLine("Great Music. Great Friends");
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
      className={`fixed bottom-1.5 left-1.5 right-1.5 md:left-auto md:right-1.5 md:w-[320px] lg:w-[400px] p-2.5 text-center text-light backdrop-blur-md bg-gray/80 border-2 border-red/80 rounded-sm transition-all duration-500 overflow-hidden z-50 ${
        isMiniPlayerOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      } shadow-lg`}
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
              {!isAudioPlaying && isStreaming ? "Stream Error" : "Unavailable"}
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
        {isStreamActive && (
          <>
            <div className="text-light/80 text-left text-sm md:text-xs md:font-light pt-1.5 pb-0">
              <span>
                <strong className="font-medium md:font-normal line-clamp-1">
                  {tagLine}
                </strong>
              </span>
            </div>
            <div
              className="w-full h-fit bg-dark/40 border border-light/20 mt-2"
              onClick={handleProgressBarClick}
              style={{ cursor: isStreaming ? "" : "pointer" }}
            >
              <div
                className={`w-full h-[4px] transition-all duration-500 ${
                  isStreaming ? "animate-stream" : ""
                } bg-red/80 border-r border-light/30`}
                style={{
                  width: isStreaming ? "100%" : `${progress}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-light/60 mt-1 px-1">
              <span>{currentTime}</span>
              <span>{isStreaming ? "LIVE" : duration}</span>
            </div>
          </>
        )}
        <audio ref={audioRef} src={currentSource} preload="metadata" />
      </div>
    </div>
  );
}
