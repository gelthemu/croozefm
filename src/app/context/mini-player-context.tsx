"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { useCurrentShow } from "@/app/components/providers/schedule/current-show";
import dynamic from "next/dynamic";

const TitleUpdater = dynamic(() => import("@/app/components/providers/title-update"), {
  ssr: false,
});

type MiniPlayerContextType = {
  isMiniPlayerOpen: boolean;
  setIsMiniPlayerOpen: (value: boolean) => void;
  isStreamActive: boolean;
  setIsStreamActive: (value: boolean) => void;
  isStreaming: boolean;
  setIsStreaming: (value: boolean) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (value: boolean) => void;
  currentSource: string | undefined;
  setCurrentSource: (source: string | undefined) => void;
  tagLine: string | undefined;
  setTagLine: (source: string | undefined) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  isStreamBtnVisible: boolean;
  setIsStreamBtnVisible: (visible: boolean) => void;
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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentSource, setCurrentSource] = useState<string | undefined>();
  const [tagLine, setTagLine] = useState<string | undefined>();
  const [isStreamBtnVisible, setIsStreamBtnVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentShow = useCurrentShow();

  useEffect(() => {
    if (isStreaming) {
      setTagLine(currentShow.name);
    }
  }, [currentShow.name, isStreaming]);

  const value = {
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    isStreamActive,
    setIsStreamActive,
    isStreaming,
    setIsStreaming,
    isAudioPlaying,
    setIsAudioPlaying,
    currentSource,
    setCurrentSource,
    tagLine,
    setTagLine,
    isStreamBtnVisible,
    setIsStreamBtnVisible,
    audioRef,
  };

  return (
    <MiniPlayerContext.Provider value={value}>
      {children}
      <TitleUpdater isAudioPlaying={isAudioPlaying} tagLine={tagLine} />
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
