import { useCallback, useEffect } from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";

export function useAudioEvents(
  setProgress: (progress: number) => void,
  setCurrentTime: (time: string) => void,
  setDuration: (duration: string) => void,
  formatTime: (timeInSeconds: number) => string
) {
  const { audioRef, setIsStreamActive, setIsAudioPlaying, setIsStreaming } =
    useMiniPlayer();

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
  }, [audioRef, formatTime, setProgress, setCurrentTime]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  }, [audioRef, formatTime, setDuration]);

  const handleEnded = useCallback(() => {
    if (audioRef.current) {
      setProgress(0);
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
  }, [
    audioRef,
    setProgress,
    setIsStreamActive,
    setIsAudioPlaying,
    setIsStreaming,
  ]);

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

  return {
    handleAudioError,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
  };
}
