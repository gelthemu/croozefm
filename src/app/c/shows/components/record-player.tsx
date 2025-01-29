"use client";

import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import type { Show } from "@/types/shows";
import AudioManager from "@/app/components/tiny/audiomanager";
import { FormatDate } from "@/app/components/tiny/format-date";

interface RecordPlayerProps {
  show: Show;
}

const RecordPlayer = ({ show }: RecordPlayerProps) => {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState<number[]>([]);
  const audioManager = useRef(AudioManager.getInstance());

  useEffect(() => {
    const length = show.recordings?.length || 0;
    setProgress(new Array(length).fill(0));
  }, [show.recordings]);

  useEffect(() => {
    if (!show.recordings) return;

    const currentAudioRefs = audioRefs.current;

    const handleTimeUpdate = (index: number) => {
      const audio = currentAudioRefs[index];
      if (!audio) return;

      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = progressPercent;
        return newProgress;
      });
    };

    const handleEnded = (index: number) => {
      setPlayingIndex(null);
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = 0;
        return newProgress;
      });
    };

    show.recordings.forEach((_, index) => {
      const audio = currentAudioRefs[index];
      if (!audio) return;

      audio.addEventListener("timeupdate", () => handleTimeUpdate(index));
      audio.addEventListener("ended", () => handleEnded(index));
    });

    const unsubscribe = audioManager.current.addListener((currentAudio) => {
      const index = audioRefs.current.findIndex(
        (audio) => audio === currentAudio
      );
      setPlayingIndex(index === -1 ? null : index);
    });

    return () => {
      show.recordings?.forEach((_, index) => {
        const audio = currentAudioRefs[index];
        if (!audio) return;

        audio.removeEventListener("timeupdate", () => handleTimeUpdate(index));
        audio.removeEventListener("ended", () => handleEnded(index));
      });
      unsubscribe();
    };
  }, [show.recordings]);

  const handlePlay = (index: number) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      audioManager.current.pause();
    } else {
      audioManager.current.play(audio);
    }
  };

  if (!show.recordings?.length) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-red">No recordings available, yet.</p>
      </div>
    );
  }

  return (
    <div className="border-y border-gray/40 dark:border-light/10 px-2 py-8">
      <div className="w-full md:w-5/6 mx-auto">
        <h4 className="text-xl text-red/80 text-sm font-normal mb-4 border-l-2 border-red/80 pl-4">
          Recordings Available
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {show.recordings.map((recording, index) => (
            <div
              key={recording.id}
              className={`overflow-hidden rounded-sm ${
                playingIndex === index
                  ? "border-2 border-red/80 dark:border-red/60"
                  : "border-2 border-red/0"
              } bg-dark/20 dark:bg-gray/60 transition-all duration-200`}
            >
              <div className="p-4">
                <div className="flex flex-row-reverse items-center justify-between pb-3">
                  <span className="text-xs text-gray/60 dark:text-light/40 font-medium">
                    <FormatDate date={recording.date} />
                  </span>
                  <span className="text-xs text-gray/90 dark:text-light/80 font-medium">
                    {show.title}
                  </span>
                </div>

                <div className="bg-gray/60 dark:bg-dark/40 p-2 rounded-sm text-light/80 font-semibold flex items-center justify-between relative border border-light/20">
                  <button
                    aria-label={playingIndex ? "Pause" : "Play"}
                    onClick={() => handlePlay(index)}
                    className="px-4 py-2 transition-all duration-200 rounded-sm"
                  >
                    {playingIndex === index ? (
                      <>
                        <span className="sr-only">Pause</span>
                        <i className="fa-solid fa-pause"></i>
                      </>
                    ) : (
                      <>
                        <span className="sr-only">Play</span>
                        <i className="fa-solid fa-play"></i>
                      </>
                    )}
                  </button>

                  <button
                    aria-label="Download"
                    onClick={() =>
                      toast.info(
                        "The file download feature is currently unavailable...",
                        {
                          autoClose: 4000,
                        }
                      )
                    }
                    className="px-4 py-2 transition-all duration-200 rounded-sm"
                  >
                    <span className="sr-only">Download</span>
                    <i className="fa-solid fa-download"></i>
                  </button>

                  <div className="absolute bottom-0 left-2 right-2 h-1">
                    <div
                      className="bg-red/60 w-full h-full"
                      style={{
                        width: `${progress[index]}%`,
                        opacity: progress[index] > 0 ? 1 : 0,
                      }}
                    />
                  </div>
                </div>

                <audio
                  ref={(el) => {
                    if (el) audioRefs.current[index] = el;
                  }}
                  src={recording.audio}
                  preload="metadata"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordPlayer;
