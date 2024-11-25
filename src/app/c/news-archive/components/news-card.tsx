"use client";

import React, { useState, useRef, useEffect } from "react";
import { News } from "@/types/news";
import { Download, Play, Pause } from "lucide-react";
import useDownloader from "react-use-downloader";
import Image from "next/image";
import { toast } from "react-toastify";
import AudioManager from "@/app/components/tiny/audiomanager";
import { FormatDate } from "@/app/components/tiny/format-date";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const { download, isInProgress } = useDownloader();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioManager = useRef(AudioManager.getInstance());
  const router = useRouter();
  const { data: session } = useSession();

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
      // if not logged in, redirect to login
      if (!session) {
        toast.error("You must be logged in", {
          autoClose: 5000,
        });
        return;
      }

      const filename = `croozefm-news_${news.aired.date.split("T")[0]}_${
        news.aired.time
      }.mp3`;

      const proxyUrl = await toast.promise(
        fetch(`/api/download?url=${encodeURIComponent(news.audio)}`, {
          credentials: "include", // Include cookies for authentication
        }),
        {
          pending: "Downloading...",
          error: "Error downloading",
          success: {
            render() {
              return "Your download will start shortly!";
            },
            autoClose: 4000,
          },
        }
      );

      if (!proxyUrl.ok) {
        if (proxyUrl.status === 401) {
          router.push(`/user/login?url=${encodeURIComponent(news.audio)}`);
          toast.error("You must be logged in", {
            autoClose: 5000,
          });
          return;
        }
        toast.error("Download failed. Please try again.", {
          autoClose: 5000,
        });
        return;
      }

      const response = await proxyUrl;
      const audioUrl = await response.url;
      download(audioUrl, filename);
    } catch (error) {
      console.error(error);
      toast.error("Download failed. Please try again.", {
        autoClose: 5000,
      });
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-md ${
        isPlaying ? "border-2 border-red/40" : "border-2 border-light/10"
      } hover:border-red/40 bg-custom-gradient-reverse transition-all duration-200`}
    >
      <div className="p-4">
        <div className="border-b border-light/20 flex items-center justify-between pb-2 text-light/50">
          <div className="flex items-center">
            <span className="text-xs">
              <FormatDate date={news.aired.date} />
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xs">{news.aired.time}</span>
          </div>
        </div>

        <div className="py-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <span
                className={`absolute inset-0 w-full h-full rounded-full ${
                  isPlaying ? "animate-heartbeat bg-red" : ""
                }`}
              >
                <Image
                  src={news.profileImg}
                  alt={news.anchor}
                  width={2168}
                  height={2168}
                  className="rounded-full object-cover w-full aspect-square _img_ grayscale"
                />
              </span>
            </div>
            <span className="font-medium text-sm text-light/70">
              {news.anchor}
            </span>
          </div>
        </div>

        <div className="bg-dark/40 p-2 rounded-sm text-red/80 flex items-center justify-between relative">
          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={handlePlay}
            disabled={isInProgress}
            className="p-2 hover:bg-light/5 transition-all duration-200 rounded-sm"
          >
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
          <button
            aria-label="Download"
            onClick={handleDownload}
            disabled={isInProgress}
            className="p-2 hover:bg-light/5 transition-all duration-200 rounded-sm"
          >
            <span className="sr-only">Download</span>
            <Download className="h-4 w-4" />
          </button>

          <div
            className="absolute bottom-0 left-0 right-0 h-1 w-full rounded-full bg-gray transition-all duration-200"
            style={{
              width: "100%",
              opacity: isPlaying ? 1 : 0,
            }}
          >
            <div
              className="h-full rounded-full bg-red/50"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <audio ref={audioRef} src={news.audio} preload="metadata" />
      </div>
    </div>
  );
}
