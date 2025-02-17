"use client";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { useEffect, useCallback } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

export default function MiniPlayer() {
  const {
    isMiniPlayerOpen,
    isStreamActive,
    isAudioPlaying,
    audioRef,
    setIsMiniPlayerOpen,
    setIsStreamActive,
    setIsAudioPlaying,
  } = useMiniPlayer();

  const handleAudioError = useCallback(() => {
    setIsStreamActive(false);
    setIsAudioPlaying(false);
  }, [setIsStreamActive, setIsAudioPlaying]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.onerror = handleAudioError;
    }

    return () => {
      if (currentAudio) {
        currentAudio.onerror = null;
      }
    };
  }, [audioRef, handleAudioError]);

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
        });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
      setIsStreamActive(true);
    }
  }, [audioRef, setIsAudioPlaying, setIsStreamActive]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAudioPlaying(false);
    setIsStreamActive(true);
    setIsMiniPlayerOpen(false);
  };

  useEffect(() => {
    if (isMiniPlayerOpen) {
      handleAudioPlay();
    }
  }, [isMiniPlayerOpen, handleAudioPlay]);

  return (
    <div
      className={`fixed bottom-1.5 left-1.5 right-1.5 md:left-auto md:right-1.5 md:w-[320px] p-2.5 text-center text-light backdrop-blur-md bg-gray/80 border-2 border-red/80 rounded-sm transition-all duration-500 overflow-hidden z-50 ${
        isMiniPlayerOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      }`}
    >
      <div>
        <div className="flex flex-row items-center justify-between space-x-1.5 pb-2">
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
        <div className="text-left text-sm md:text-xs md:font-light px-1 pt-1.5 border-t border-light/40">
          <span>
            Call Us:{" "}
            <strong className="font-medium">
              0752-912912{" • "}0780-912910
            </strong>
          </span>
        </div>
        <audio
          ref={audioRef}
          src="https://fmradiohub.in/play?url=http://15.235.80.190/vyxwdk08apxtv"
        />
      </div>
    </div>
  );
}
