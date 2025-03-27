"use client";

import { useEffect } from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { useChat } from "@/app/context/chat-context";
import FixedDiv from "../../providers/divs/fixed-element";
import ImgDiv from "@/app/components/providers/divs/image-div";
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
  const { toggleChatVisibility, users } = useChat();

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
  }, [isMiniPlayerOpen, currentSource, handleAudioPlay, audioRef]);

  const toggleCollapse = () => {
    if (isCollapse) {
      setIsCollapse(false);
      setIsAnimating(true);
    } else {
      setIsCollapse(true);
    }
  };

  const showChat = () => {
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
          <div className="rounded-md shadow shadow-gray/20 dark:shadow-light/5">
            <ImgDiv
              url={snapShot}
              alt={tagLine}
              className={`border-none ${
                isCollapse
                  ? "opacity-100 max-h-[248px] md:max-h-[278px] translate-x-0 rounded-md shadow shadow-gray/20 dark:shadow-light/5"
                  : "opacity-0 max-h-0 translate-x-full shadow-none"
              }`}
              text={tagLine}
            />
          </div>
        )}
        <div
          className={`flex flex-col space-y-1 ${
            isCollapse && snapShot
              ? "absolute bottom-1 left-1 right-1"
              : "w-full"
          } `}
        >
          {isCollapse && (
            <div className={`w-full text-sm mt-auto`}>
              <div className="w-full flex justify-end bg-transparent rounded-sm">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    showChat();
                    toggleChatVisibility();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      showChat();
                      toggleChatVisibility();
                    }
                  }}
                  className={`bg-red text-light font-medium _912cfm px-3 py-1 rounded-sm focus:outline-none ${
                    isLoading
                      ? "opacity-0 -translate-x-full"
                      : "opacity-100 translate-x-0"
                  } transition-all duration-[0.4s]`}
                >
                  <span className="">Show Chat</span>{" "}
                  <span className="text-sm opacity-80">({users.length})</span>
                </div>
              </div>
            </div>
          )}
          <div
            className={`flex items-center space-x-2.5 border border-light/10 p-4 ${
              isCollapse && snapShot
                ? "bg-light/80 dark:bg-dark/80 backdrop-blur-sm rounded-sm shadow shadow-gray/40"
                : "bg-light/20 dark:bg-gray/60 dark:bg-dark/40 rounded-sm shadow shadow-gray/40"
            } `}
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
