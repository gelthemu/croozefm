import { useMiniPlayer } from "@/app/context/mini-player-context";

interface ProgressBarProps {
  progress: number;
  handleProgressBarClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ProgressBar({
  progress,
  handleProgressBarClick,
}: ProgressBarProps) {
  const { isStreaming, isAudioPlaying } = useMiniPlayer();

  return (
    <div
      className="flex-grow flex items-center justify-center w-full h-4"
      onClick={handleProgressBarClick}
      style={{ cursor: isStreaming ? "" : "pointer" }}
    >
      <div className="w-full h-fit bg-light dark:bg-dark/40 border border-dark/30 dark:border-light/10">
        <div
          className={`w-full h-[3px] transition-all duration-[0.25s] ${
            isStreaming && isAudioPlaying ? "animate-stream" : ""
          } bg-red border-r border-light/30`}
          style={{
            width: isStreaming ? "10%" : `${progress}%`,
          }}
        />
      </div>{" "}
    </div>
  );
}
