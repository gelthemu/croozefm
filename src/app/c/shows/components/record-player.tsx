"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import type { Show } from "@/types/show";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FormatDate } from "@/app/components/tiny/format-date";

interface RecordPlayerProps {
  show: Show;
}

const RecordPlayer = ({ show }: RecordPlayerProps) => {
  const {
    isAudioPlaying,
    setIsMiniPlayerOpen,
    setCurrentSource,
    setTagLine,
    setIsStreaming,
  } = useMiniPlayer();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    if (!show.recordings || !show.recordings[index]) return;

    const recording = show.recordings[index];
    setCurrentSource(recording.audio);
    setTagLine(`${show.title} - ${FormatDate({ date: recording.date })}`);
    setIsMiniPlayerOpen(true);
    setIsStreaming(false);
    setPlayingIndex(index);
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
          {show.recordings?.map((recording, index) => (
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
                    aria-label={
                      isAudioPlaying && playingIndex === index
                        ? "Currently Playing in Miniplayer"
                        : "Play in Miniplayer"
                    }
                    onClick={() => handlePlay(index)}
                    className={`px-4 py-2 transition-all duration-200 rounded-sm ${
                      isAudioPlaying && playingIndex === index
                        ? "text-red/80"
                        : ""
                    }`}
                    disabled={playingIndex === index}
                  >
                    {isAudioPlaying && playingIndex === index ? (
                      <>
                        <span className="sr-only">Playing...</span>
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
                        "The file download feature is currently unavailable... sorry!",
                        { autoClose: 4000 }
                      )
                    }
                    className="px-4 py-2 transition-all duration-200 rounded-sm"
                  >
                    <span className="sr-only">Download</span>
                    <i className="fa-solid fa-download"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordPlayer;
