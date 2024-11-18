"use client";

import React, { useState, useRef, useEffect } from "react";
import { News } from "@/types/news";
import { Download, Play, Pause } from "lucide-react";
import useDownloader from "react-use-downloader";
import Image from "next/image";
import { toast } from "react-toastify";
import AudioManager from "./audiomanager";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const { download, isInProgress } = useDownloader();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioManager = useRef(AudioManager.getInstance());

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress(progressPercent);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    const unsubscribe = audioManager.current.addListener((currentAudio) => {
      setIsPlaying(currentAudio === audio);
    });

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      unsubscribe();
    };
  }, [news.audio]);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audioManager.current.pause();
    } else {
      audioManager.current.play(audio);
    }
  };

  const handleDownload = async () => {
    try {
      const filename = `croozefm-news-${news.aired.date}-${news.aired.time}.mp3`;

      const proxyUrl = await toast.promise(
        fetch(`/api/download?url=${encodeURIComponent(news.audio)}`),
        {
          pending: "Downloading...",
          error: "Error downloading",
          success: {
            render() {
              return "Downloaded";
            },
            autoClose: 2000,
          },
        }
      );

      const response = await proxyUrl;
      const audioUrl = await response.url;
      download(audioUrl, filename);
    } catch (error) {
      console.error(error);
    }
  };

  const formattedDate = new Date(news.aired.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`overflow-hidden rounded-md ${
        isPlaying ? "outline outline-red/40" : "border-2 border-light/10"
      } bg-custom-gradient-reverse`}
    >
      <div className="p-4">
        <div className="border-b border-light/20 flex items-center justify-between pb-2 text-light/50">
          <div className="flex items-center">
            <span className="text-sm">{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm">{news.aired.time}</span>
          </div>
        </div>

        <div className="py-4">
          <div className="flex items-center space-x-2">
            <Image
              src={news.profileImg}
              alt={news.anchor}
              width={3200}
              height={3200}
              className="rounded-full object-cover w-8 aspect-square _img_"
            />
            <span className="font-medium">{news.anchor}</span>
          </div>
        </div>

        <div className="bg-dark/40 rounded-sm p-4 text-red/80 flex items-center justify-between relative">
          <button onClick={handlePlay} disabled={isInProgress}>
            {isPlaying ? (
              <>
                <span className="sr-only">Pause</span>
                <Pause className="h-4 w-4" />
              </>
            ) : (
              <>
                <span className="sr-only">Play</span>
                <Play className="h-4 w-4" />
              </>
            )}
          </button>
          <button onClick={handleDownload} disabled={isInProgress}>
            <span className="sr-only">Download</span>
            <Download className="h-4 w-4" />
          </button>

          {isPlaying && (
            <div
              className="absolute bottom-0 left-0 right-0 h-1 w-full rounded-full bg-red/40 transition-all duration-200"
              style={{
                width: `${progress}%`,
                opacity: progress > 0 ? 1 : 0,
              }}
            />
          )}
        </div>

        <audio ref={audioRef} src={news.audio} preload="metadata" />
      </div>
    </div>
  );
}
