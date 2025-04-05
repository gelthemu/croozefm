import { useCallback, useEffect } from "react";
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
  } = useMiniPlayer();

  const { progress } = useDownload();

  useEffect(() => {
    if (progress > 0 && audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }

      audioRef.current.src = "";

      setIsStreamActive(false);
      setIsStreaming(false);
      setIsCollapse(false);

      setTimeout(() => {
        setIsMiniPlayerOpen(false);
      }, 1000);
      setIsLoading(true);
    }
  }, [
    progress,
    audioRef,
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
        setIsCollapse(true);

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
              setTimeout(() => {
                setIsLoading(false);
              }, 4000);
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
    setIsMiniPlayerOpen,
    currentSource,
    progress,
  ]);

  return {
    handleAudioPlay,
  };
}
