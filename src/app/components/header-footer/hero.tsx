"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import MiniPlayer from "../tiny/mini-player";
import { ArrowDownRight, X } from "lucide-react";

export default function Hero() {
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState(false);
  const [isStreamActive, setIsStreamActive] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <div className="w-full">
        <div className="w-full mt-10 p-0">
          <Image
            src="/assets/cfm-hero.png"
            alt="Hero Image"
            width={2295}
            height={675}
            priority={true}
            className="w-full aspect-[2295/675] object-cover _img_"
          />
        </div>
        <div className="w-full my-12">
          <div className="w-full h-full flex justify-center items-center">
            <button
              className={`bg-red/80 hover:bg-red font-semibold px-4 py-2 rounded-md flex items-center space-x-1 transition-all duration-300 ${
                isMiniPlayerOpen ? "opacity-40" : ""
              }`}
              onClick={() => {
                setTimeout(() => {
                  setIsMiniPlayerOpen(true);
                }, 500);
              }}
              disabled={isMiniPlayerOpen}
            >
              <span>Listen Live</span> <ArrowDownRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`max-w-xs overflow-hidden fixed bottom-2 right-2 transition-all duration-300 z-50 ${
          isMiniPlayerOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full"
        }`}
      >
        <button
          className="absolute top-0 right-0 z-50 cursor-pointer p-2 hover:rotate-180 transition-transform duration-300"
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            setIsAudioPlaying(false);
            setIsStreamActive(true);
            setIsMiniPlayerOpen(false);
          }}
          aria-label="Close player"
        >
          <X className="w-4 h-4" />
        </button>
        <MiniPlayer
          audioRef={audioRef}
          isAudioPlaying={isAudioPlaying}
          setIsAudioPlaying={setIsAudioPlaying}
          isStreamActive={isStreamActive}
          setIsStreamActive={setIsStreamActive}
        />
      </div>
    </>
  );
}
