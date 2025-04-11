import { useCallback, useEffect, useRef } from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { useDownload } from "@/app/context/download-context";

export function useAudioControls() {
  const {
    audioRef,
    currentSource,
    setIsMiniPlayerOpen,
    setIsAudioPlaying,
    setIsStreamActive,
    setIsStreaming,
    setIsLoading,
    setIsCollapse,
    setIsAnimating,
  } = useMiniPlayer();

  const { isDownloadMode, progress } = useDownload();

  const lastPausedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isDownloadMode && progress > 0) {
      if (!audioRef.current.paused) {
        lastPausedTimeRef.current = audioRef.current.currentTime;
        audioRef.current.pause();
        setIsAudioPlaying(false);
        setIsStreamActive(true);
      }
      setIsLoading(true);
    } else if (!isDownloadMode && progress === 0) {
      // Reset isLoading when download finishes
      setIsLoading(false);
    }
  }, [
    progress,
    audioRef,
    isDownloadMode,
    setIsLoading,
    setIsAudioPlaying,
    setIsStreamActive,
    setIsStreaming,
    setIsCollapse,
    setIsMiniPlayerOpen,
  ]);

  const handleAudioPlay = useCallback(() => {
    if (progress > 0 || !audioRef.current) return;

    if (audioRef.current.paused) {
      const isResuming =
        audioRef.current.src && audioRef.current.currentTime > 0;

      if (isResuming) {
        audioRef.current
          .play()
          .then(() => {
            setIsAudioPlaying(true);
            setIsStreamActive(true);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsStreamActive(false);
            setIsStreaming(false);
            setIsLoading(false);
            setTimeout(() => {
              setIsCollapse(false);
              setTimeout(() => {
                if (!audioRef.current) return;
                audioRef.current.src = "";
                setIsMiniPlayerOpen(false);
              }, 2000);
            }, 2000);
          });
      } else {
        audioRef.current.pause();
        const previousSource = audioRef.current.src;
        audioRef.current.src = "";

        setIsAudioPlaying(false);
        setIsLoading(true);

        setTimeout(() => {
          if (!audioRef.current) return;

          if (currentSource) {
            audioRef.current.src = currentSource;
          } else if (previousSource) {
            audioRef.current.src = previousSource;
          }

          audioRef.current.load();
          audioRef.current.currentTime = 0;

          audioRef.current
            .play()
            .then(() => {
              setIsStreamActive(true);
              setIsAudioPlaying(true);
              setIsAnimating(true);
              setTimeout(() => {
                setIsLoading(false);
                setTimeout(() => {
                  setIsCollapse(true);
                }, 2000);
              }, 2000);
            })
            .catch((error) => {
              console.error(error);
              setIsStreamActive(false);
              setIsStreaming(false);
              setIsLoading(false);
              setTimeout(() => {
                setIsCollapse(false);
                setTimeout(() => {
                  if (!audioRef.current) return;
                  audioRef.current.src = "";
                  setIsMiniPlayerOpen(false);
                }, 2000);
              }, 1000);
            });
        }, 2000);
      }
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
      setIsStreamActive(true);
    }
  }, [
    audioRef,
    setIsAudioPlaying,
    setIsStreamActive,
    setIsLoading,
    setIsStreaming,
    setIsCollapse,
    setIsAnimating,
    setIsMiniPlayerOpen,
    currentSource,
    progress,
  ]);

  return {
    handleAudioPlay,
  };
}
