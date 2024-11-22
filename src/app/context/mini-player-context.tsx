"use client";

import React, { createContext, useContext, useState, useRef } from "react";

type MiniPlayerContextType = {
  isMiniPlayerOpen: boolean;
  setIsMiniPlayerOpen: (value: boolean) => void;
  isStreamActive: boolean;
  setIsStreamActive: (value: boolean) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (value: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
};

const MiniPlayerContext = createContext<MiniPlayerContextType | undefined>(undefined);

export function MiniPlayerProvider({ children }: { children: React.ReactNode }) {
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState(false);
  const [isStreamActive, setIsStreamActive] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);


  return (
    <MiniPlayerContext.Provider
      value={{
        isMiniPlayerOpen,
        setIsMiniPlayerOpen,
        isStreamActive,
        setIsStreamActive,
        isAudioPlaying,
        setIsAudioPlaying,
        audioRef,
      }}
    >
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