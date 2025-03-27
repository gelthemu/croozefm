"use client";
import { STREAM_URL } from "@/data/stream";
import React from "react";
import { useCurrentShow } from "@/app/components/providers/schedule/current-show";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FiArrowDownRight } from "react-icons/fi";

interface StreamButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isActive?: boolean;
  children?: React.ReactNode;
}

interface StreamBtnProps {
  className?: string;
}

const StreamButton: React.FC<StreamButtonProps> = ({
  className = "",
  style = {},
  onClick,
  isActive = false,
  children,
}) => {
  const { isLoading } = useMiniPlayer();

  const isDisabled = isActive || isLoading;

  return (
    <div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled ? "true" : "false"}
      className={`font-semibold flex items-center space-x-1 transition-all duration-500 rounded-md focus:outline-none select-none ${className} ${
        isDisabled ? "cursor-default" : "cursor-pointer"
      }`}
      style={style}
      onClick={() => {
        if (!isDisabled && onClick) {
          onClick();
        }
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if ((e.key === "Enter" || e.key === " ") && !isDisabled && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

StreamButton.displayName = "StreamButton";

const StreamBtn: React.FC<StreamBtnProps> = ({ className = "" }) => {
  const {
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    currentSource,
    setCurrentSource,
    setIsStreaming,
    setTagLine,
    setIsSeekable,
    isLoading,
  } = useMiniPlayer();
  const isActive = isMiniPlayerOpen && currentSource === STREAM_URL;
  const currentShow = useCurrentShow();

  const handleClick = () => {
    if (isLoading) return;

    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(STREAM_URL);
      setIsStreaming(true);
      setTagLine(currentShow.name);
      setIsSeekable(false);
      setIsMiniPlayerOpen(true);
    }
  };

  return (
    <StreamButton
      className={`text-sm text-light px-4 py-2 ${
        isActive ? "bg-gray/80 dark:bg-gray/100" : "bg-red"
      } ${className}`}
      onClick={handleClick}
      isActive={isActive}
    >
      <span>Start Streaming, Now</span>
      <FiArrowDownRight className="w-4 h-4" />
    </StreamButton>
  );
};

export { StreamButton, StreamBtn };
