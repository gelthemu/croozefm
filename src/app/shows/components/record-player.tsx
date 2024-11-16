"use client";

import React, { useState, useRef } from "react";
import { Show } from "@/types/shows";

interface Recording {
  id: string;
  title: string;
  audio: string;
}

interface RecordPlayerProps {
  show: Show;
}

const RecordPlayer = ({ show }: RecordPlayerProps) => {
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(
    null
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleRecordingClick = (recording: Recording) => {
    if (currentRecording?.id === recording.id) {
      if (audioRef.current?.paused) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
      return;
    }

    setCurrentRecording(recording);

    if (audioRef.current) {
      audioRef.current.src = recording.audio;
      audioRef.current.play();
    }
  };

  if (!show.recordings?.length) {
    return null;
  }

  return (
    <div className="py-10 border-y border-light/10">
      <div className="w-full md:w-5/6 mx-auto">
        <h2 className="text-2xl font-bold text-red/50 mb-4 border-l-4 border-red/40 pl-4">
          Latest
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {show.recordings.map((recording) => (
            <div
              key={recording.id}
              className={`bg-gray/40 p-4 rounded-sm cursor-pointer transition-colors ${
                currentRecording?.id === recording.id ? "bg-gray/70" : ""
              }`}
              onClick={() => handleRecordingClick(recording)}
            >
              <p className="text-sm font-medium mb-2 text-center">
                {recording.title}
              </p>
              {currentRecording?.id === recording.id && (
                <div className="h-1 bg-red/50 rounded-md animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {show.recordings?.length && (
          <audio
            ref={audioRef}
            controls
            controlsList="nodownload noplaybackrate"
            className="w-full mt-4 bg-[#3b3b3b] rounded-sm"
          />
        )}
      </div>
    </div>
  );
};

export default RecordPlayer;
