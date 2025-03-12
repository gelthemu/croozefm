import { useState, useCallback } from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";

export function useAudioProgress() {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const { audioRef, isStreaming } = useMiniPlayer();

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

  const handleProgressBarClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || isStreaming) return;

      const progressBar = event.currentTarget.querySelector("div");
      if (!progressBar) return;

      const rect = progressBar.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const progressBarWidth = rect.width;

      const clickPercentage = Math.max(
        0,
        Math.min(100, (clickPosition / progressBarWidth) * 100)
      );

      if (audioRef.current.duration) {
        console.log("duration:", audioRef.current.duration);
        const newTime = (clickPercentage / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;

        setProgress(clickPercentage);
        setCurrentTime(formatTime(newTime));
      }
    },
    [audioRef, isStreaming, formatTime]
  );

  return {
    progress,
    setProgress,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    formatTime,
    handleProgressBarClick,
  };
}
