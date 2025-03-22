import { useMiniPlayer } from "@/app/context/mini-player-context";

interface TimeDisplayProps {
  currentTime: string;
  duration: string;
  isLoading: boolean;
}

export default function TimeDisplay({
  currentTime,
  duration,
  isLoading,
}: TimeDisplayProps) {
  const { isStreaming } = useMiniPlayer();

  return (
    <div
      className={`flex items-center justify-center text-xs ${isStreaming ? "text-red font-medium" : "text-dark dark:text-light/80"} flex-shrink-0 ${
        isLoading ? "hidden" : ""
      } transition-none`}
    >
      <span className={`${isStreaming ? "hidden" : ""}`}>{currentTime}</span>
      <span className={`mx-0.5 ${isStreaming ? "hidden" : ""}`}>{"/"}</span>
      <span>{isStreaming ? "LIVE" : duration}</span>
    </div>
  );
}
