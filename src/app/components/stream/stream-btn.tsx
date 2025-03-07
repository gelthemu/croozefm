"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import { useCurrentShow } from "@/app/components/providers/schedule/current-show";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FiArrowDownRight } from "react-icons/fi";
import { usePathname } from "next/navigation";

const STREAM_URL = "https://stream-176.zeno.fm/vyxwdk08apxtv";

interface StreamButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isActive?: boolean;
  children?: React.ReactNode;
}

const StreamButton = forwardRef<HTMLDivElement, StreamButtonProps>(
  (
    { className = "", style = {}, onClick, isActive = false, children },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={isActive ? -1 : 0}
        aria-disabled={isActive}
        className={`font-semibold flex items-center space-x-1 transition-all duration-500 rounded-sm focus:outline-hidden ${className} _912cfm ${
          isActive ? "opacity-60 cursor-default" : "cursor-pointer"
        }`}
        style={style}
        onClick={() => {
          if (!isActive && onClick) {
            onClick();
          }
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !isActive && onClick) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {children}
      </div>
    );
  }
);

StreamButton.displayName = "StreamButton";

const StreamBtn = () => {
  const {
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    currentSource,
    setCurrentSource,
    setIsStreaming,
    setTagLine,
    setIsStreamBtnVisible,
  } = useMiniPlayer();
  const isActive = isMiniPlayerOpen && currentSource === STREAM_URL;
  const currentShow = useCurrentShow();
  const streamBtnRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(STREAM_URL);
      setIsStreaming(true);
      setTagLine(currentShow.name);
      setIsMiniPlayerOpen(true);
    }
  };

  useEffect(() => {
    const buttonElement = streamBtnRef.current;
    if (!buttonElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsStreamBtnVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    observer.observe(buttonElement);

    return () => {
      observer.disconnect();
    };
  }, [setIsStreamBtnVisible]);

  return (
    <StreamButton
      ref={streamBtnRef}
      className={`text-sm text-light px-4 py-2 ${
        isActive ? "bg-gray/80 dark:bg-gray/100" : "bg-red"
      }`}
      onClick={handleClick}
      isActive={isActive}
    >
      <span>Start Streaming, Now</span>
      <FiArrowDownRight className="w-4 h-4" />
    </StreamButton>
  );
};

const NavStreamBtn = ({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();
  const {
    isMiniPlayerOpen,
    isStreamBtnVisible,
    setIsMiniPlayerOpen,
    currentSource,
    setCurrentSource,
    setIsStreaming,
    setTagLine,
  } = useMiniPlayer();
  const isActive = isMiniPlayerOpen && currentSource === STREAM_URL;
  const currentShow = useCurrentShow();

  const handleClick = () => {
    setIsOpen(false);
    setCurrentSource(STREAM_URL);
    setIsStreaming(true);
    setTagLine(currentShow.name);
    setIsMiniPlayerOpen(true);
  };

  return (
    <StreamButton
      className={`text-xs text-light px-2.5 py-1.5 ${
        (pathname === "/home" && isStreamBtnVisible) || isActive
          ? "opacity-[0] pointer-events-none"
          : "opacity-[1]"
      } border border-light/40 bg-gray/10`}
      onClick={handleClick}
      isActive={isActive}
    >
      <span>Live Radio</span>
      <FiArrowDownRight className="w-4 h-4" />
    </StreamButton>
  );
};

export { StreamButton, StreamBtn, NavStreamBtn };
