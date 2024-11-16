import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowDownRight, X } from "lucide-react";
import Schedule from "../shows/schedule";

export default function Hero() {
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioPlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch((error) => {
          setIsAudioPlaying(false);
          console.error("Audio playback error:", error);
        });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
    }
  };

  const handleAudioReset = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsAudioPlaying(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full mt-10 p-0">
          <Image
            src="/assets/cfm-hero.png"
            alt="Hero Image"
            width={2295}
            height={675}
            className="w-full aspect-[2295/675]"
          />
        </div>
        <div className="w-full my-12">
          <div className="w-full h-full flex justify-center items-center">
            <button
              className={`bg-red/80 hover:bg-red font-semibold px-4 py-2 rounded-md flex items-center space-x-1 transition-all duration-300 ${
                isMiniPlayerOpen ? "opacity-40" : ""
              }`}
              onClick={() => setIsMiniPlayerOpen(true)}
              disabled={isMiniPlayerOpen}
            >
              <span>Listen Live</span> <ArrowDownRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {isMiniPlayerOpen && (
        <div className="max-w-xs overflow-hidden fixed bottom-2 right-2 transition-all duration-300">
          <div className="w-full p-1 backdrop-blur-md bg-gray/80 border border-light/20 rounded-sm">
            <div className="w-full flex items-center justify-between pb-1">
              <div className="flex justify-center items-center">
                {isAudioPlaying ? (
                  <button
                    className="px-2 cursor-pointer rounded-sm transition-colors duration-300"
                    onClick={handleAudioPlay}
                    aria-label="Pause audio"
                  >
                    {/* <Pause className="w-4 h-4" /> */}
                    <i className="fa-solid fa-pause"></i>
                  </button>
                ) : (
                  <button
                    className="px-2 cursor-pointer rounded-sm transition-colors duration-300"
                    onClick={handleAudioPlay}
                    aria-label="Play audio"
                  >
                    {/* <Play className="w-4 h-4" /> */}
                    <i className="fa-solid fa-play"></i>
                  </button>
                )}
                <audio
                  ref={audioRef}
                  crossOrigin="anonymous"
                  src="https://fmradiohub.in/play?url=http://mp.techsysug.com:21563/stream"
                  className="w-full rounded-none"
                />
              </div>
              <button
                className="cursor-pointer p-1 hover:rotate-180 transition-transform duration-300"
                onClick={() => {
                  setIsMiniPlayerOpen(false);
                  handleAudioReset();
                }}
                aria-label="Close player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Schedule />
          </div>
        </div>
      )}
    </>
  );
}
