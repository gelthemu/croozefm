"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { useCurrentShow } from "@/app/components/providers/schedule/current-show";
import { SNAPSHOTS } from "@/data/endpoints";

type MiniPlayerContextType = {
  isMiniPlayerOpen: boolean;
  setIsMiniPlayerOpen: (value: boolean) => void;
  isStreamActive: boolean;
  setIsStreamActive: (value: boolean) => void;
  isStreaming: boolean;
  setIsStreaming: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (value: boolean) => void;
  currentSource: string | undefined;
  setCurrentSource: (source: string | undefined) => void;
  tagLine: string | undefined;
  setTagLine: (source: string | undefined) => void;
  snapShot: string | undefined;
  setSnapShot: (source: string | undefined) => void;
  isCollapse: boolean;
  setIsCollapse: (value: boolean) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  isSeekable: boolean;
  setIsSeekable: (value: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
};

const MiniPlayerContext = createContext<MiniPlayerContextType | undefined>(
  undefined
);

export function MiniPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState(false);
  const [isStreamActive, setIsStreamActive] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentSource, setCurrentSource] = useState<string | undefined>();
  const [tagLine, setTagLine] = useState<string | undefined>();
  const [snapShot, setSnapShot] = useState<string | undefined>();
  const [isCollapse, setIsCollapse] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSeekable, setIsSeekable] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentShow = useCurrentShow();

  useEffect(() => {
    if (isStreaming) {
      setTagLine(currentShow.name);
      setSnapShot(`${SNAPSHOTS}/snap-shot-live-radio.png`);
    }
  }, [currentShow, isStreaming]);

  const value = {
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    isStreamActive,
    setIsStreamActive,
    isStreaming,
    setIsStreaming,
    isLoading,
    setIsLoading,
    isAudioPlaying,
    setIsAudioPlaying,
    currentSource,
    setCurrentSource,
    tagLine,
    setTagLine,
    snapShot,
    setSnapShot,
    isCollapse,
    setIsCollapse,
    isAnimating,
    setIsAnimating,
    isSeekable,
    setIsSeekable,
    audioRef,
  };

  return (
    <MiniPlayerContext.Provider value={value}>
      {children}
    </MiniPlayerContext.Provider>
  );
}

export function useMiniPlayer() {
  const context = useContext(MiniPlayerContext);
  if (context === undefined) {
    throw new Error("useMiniPlayer must be used within a MiniPlayerProvider");
  }
  return context;
}
