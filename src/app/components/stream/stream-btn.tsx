"use client";

import React from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { ArrowDownRight, Headphones } from "lucide-react";
import { usePathname } from "next/navigation";

const STREAM_URL =
  "https://fmradiohub.in/play?url=https://stream-176.zeno.fm/vyxwdk08apxtv";
const MIXTAPE_URL =
  "https://fmradiohub.in/play?url=https://croozefm.com/wp-content/uploads/2025/02/Crooze-FM-Weekly-Mixtapes-DJ-Emma-Vol-1-19th-Feb-2025_01.mp3";

interface StreamButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isActive?: boolean;
  children?: React.ReactNode;
}

const StreamButton: React.FC<StreamButtonProps> = ({
  className = "",
  style = {},
  onClick,
  isActive = false,
  children,
}) => {
  return (
    <button
      className={`text-sm font-semibold flex items-center space-x-1 transition-all duration-500 rounded-sm ${className} _912cfm`}
      style={style}
      onClick={onClick}
      disabled={isActive}
    >
      {children}
    </button>
  );
};

const StreamBtn = () => {
  const {
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    currentSource,
    setCurrentSource,
    setIsStreaming,
    setTagLine,
  } = useMiniPlayer();
  const isActive = isMiniPlayerOpen && currentSource === STREAM_URL;

  const handleClick = () => {
    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(STREAM_URL);
      setIsStreaming(true);
      setTagLine("Great Music. Great Friends.");
      setIsMiniPlayerOpen(true);
    }
  };

  return (
    <StreamButton
      className={`text-light px-4 py-2 ${
        isActive ? "bg-gray/80 dark:bg-gray/100" : "bg-red"
      }`}
      onClick={handleClick}
      isActive={isActive}
    >
      <>
        <span>Start Streaming, Now</span> <ArrowDownRight className="w-4 h-4" />
      </>
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
    setIsMiniPlayerOpen,
    currentSource,
    setCurrentSource,
    setIsStreaming,
    setTagLine,
  } = useMiniPlayer();
  const isActive = isMiniPlayerOpen && currentSource === STREAM_URL;

  return (
    <StreamButton
      className={`text-light px-2.5 py-1.5 ${
        isActive || pathname === "/"
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      } border border-light/40`}
      style={{
        backgroundImage:
          "linear-gradient(to right,rgba(40, 40, 40, 0.15) 0%,rgb(139, 18, 18) 50%, rgba(40, 40, 40, 0.15) 100%)",
      }}
      onClick={() => {
        setIsOpen(false);
        setCurrentSource(STREAM_URL);
        setIsStreaming(true);
        setTagLine("Great Music. Great Friends.");
        setIsMiniPlayerOpen(true);
      }}
      isActive={isActive}
    >
      <>
        <span>Live Radio</span> <ArrowDownRight className="w-4 h-4" />
      </>
    </StreamButton>
  );
};

const MixtapeBtn = () => {
  const {
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    currentSource,
    setCurrentSource,
    setIsStreaming,
    setTagLine,
  } = useMiniPlayer();
  const isActive = isMiniPlayerOpen && currentSource === MIXTAPE_URL;

  const handleClick = () => {
    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(MIXTAPE_URL);
      setIsStreaming(false);
      setTagLine("CFM Weekly Mixtape (DJ EmmaVol 1)");
      setIsMiniPlayerOpen(true);
    }
  };

  return (
    <StreamButton
      className={`text-light px-4 py-2 ${
        isActive ? "bg-gray/80 dark:bg-gray/100" : "bg-red"
      }`}
      onClick={handleClick}
      isActive={isActive}
    >
      <>
        <span>Listen Now</span> <Headphones className="w-4 h-4" />
      </>
    </StreamButton>
  );
};

export { StreamButton, StreamBtn, NavStreamBtn, MixtapeBtn };
