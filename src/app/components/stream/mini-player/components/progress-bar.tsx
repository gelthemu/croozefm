import { useMiniPlayer } from "@/app/context/mini-player-context";

interface ProgressBarProps {
  progress: number;
  isLoading: boolean;
  handleProgressBarClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ProgressBar({
  progress,
  isLoading,
  handleProgressBarClick,
}: ProgressBarProps) {
  const { isStreaming, isAudioPlaying, isSeekable } = useMiniPlayer();

  return (
    <div
      className="flex items-center justify-center w-full h-4"
      onClick={(e) => {
        if (isLoading || !isSeekable) return;
        handleProgressBarClick(e);
      }}
      style={{ cursor: isLoading || !isSeekable ? "" : "pointer" }}
    >
      <div className="w-full h-fit bg-light dark:bg-dark/40 border border-dark/30 dark:border-light/10">
        <div
          className={`relative w-full h-[3px] transition-all duration-[0.25s] ${
            isStreaming && isAudioPlaying ? "animate-stream" : ""
          } bg-red`}
          style={{
            width: isStreaming ? "10%" : `${progress}%`,
          }}
        >
          <div className="w-[8px] h-[8px] absolute -right-1 top-1/2 -translate-y-1/2 rounded-full bg-red"></div>
        </div>
      </div>
    </div>
  );
}
