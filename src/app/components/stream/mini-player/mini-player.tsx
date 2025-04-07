"use client";

import { useEffect } from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import FixedDiv from "../../providers/divs/fixed-element";
import { ChatBtn, SnapShot } from "./components/snap-shot";
import { useAudioControls } from "./hooks/use-audio-controls";
import { useAudioProgress } from "./hooks/use-audio-progress";
import { useAudioEvents } from "./hooks/use-audio-events";
import PlayerHeader from "./components/player-header";
import PlayerControls from "./components/player-controls";
import ProgressBar from "./components/progress-bar";
import TimeDisplay from "./components/time-display";

export default function MiniPlayer() {
  const {
    isMiniPlayerOpen,
    currentSource,
    tagLine,
    snapShot,
    isLoading,
    isCollapse,
    setIsCollapse,
    isAnimating,
    setIsAnimating,
    audioRef,
  } = useMiniPlayer();

  const { handleAudioPlay } = useAudioControls();

  const {
    progress,
    setProgress,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    formatTime,
    handleProgressBarClick,
  } = useAudioProgress();

  useAudioEvents(setProgress, setCurrentTime, setDuration, formatTime);

  useEffect(() => {
    if (isMiniPlayerOpen && currentSource) {
      if (audioRef.current) {
        audioRef.current.src = currentSource;
        audioRef.current.load();
      }
      handleAudioPlay();
    }
  }, [
    setIsCollapse,
    isMiniPlayerOpen,
    currentSource,
    handleAudioPlay,
    audioRef,
  ]);

  const toggleCollapse = () => {
    if (isCollapse) {
      setIsCollapse(false);
      setIsAnimating(true);
    } else {
      setIsCollapse(true);
    }
  };

  return (
    <FixedDiv
      className={`${
        isMiniPlayerOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      } transition-all duration-[0.6s]`}
    >
      <div className="relative mx-2 my-1 select-none">
        <PlayerHeader
          tagLine={tagLine}
          isCollapse={isCollapse}
          toggleCollapse={toggleCollapse}
        />
        {(isCollapse || isAnimating) && snapShot && (
          <div className="relative rounded-sm overflow-hidden">
            <SnapShot
              url={snapShot}
              className={`border-none transition-all duration-[0.6s] ${
                isCollapse
                  ? "mb-2 opacity-100 max-h-[248px] translate-y-0"
                  : "opacity-0 max-h-0 translate-y-full"
              }`}
            />
            {isCollapse && (
              <div className={`absolute bottom-4 right-0 z-0`}>
                <ChatBtn />
              </div>
            )}
          </div>
        )}
        <div className={`w-full flex flex-col space-y-1`}>
          <div
            className={`flex items-center space-x-2.5 border border-light/10 p-4 bg-light/80 dark:bg-gray/80 rounded-sm shadow shadow-gray/40 `}
          >
            <PlayerControls
              isCollapse={isCollapse}
              isLoading={isLoading}
              handleAudioPlay={handleAudioPlay}
            />
            <ProgressBar
              progress={progress}
              isLoading={isLoading}
              handleProgressBarClick={handleProgressBarClick}
            />
            <TimeDisplay
              currentTime={currentTime}
              duration={duration}
              isLoading={isLoading}
            />
          </div>
        </div>
        <audio ref={audioRef} src={currentSource} preload="metadata" />
      </div>
    </FixedDiv>
  );
}
