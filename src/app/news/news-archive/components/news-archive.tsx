"use client";

import React, { useState, useEffect } from "react";
import { News } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FormatDate } from "@/app/components/tiny/format-date";
import { NewsPlaylist } from "./news-playlist";

interface NewsArchiveProps {
  news: News[];
  data: News[];
  className?: string;
}

export default function NewsArchive({ news, data }: NewsArchiveProps) {
  const pathname = usePathname();
  const [selectedNews, setSelectedNews] = useState<News>(news[0]);
  const {
    setIsMiniPlayerOpen,
    setCurrentSource,
    setTagLine,
    setIsStreaming,
    currentSource,
    isAudioPlaying,
    isMiniPlayerOpen,
  } = useMiniPlayer();

  useEffect(() => {
    if (isMiniPlayerOpen && currentSource) {
      const currentlyPlayingNews = news.find(
        (item) => item.audio === currentSource
      );
      if (currentlyPlayingNews && currentlyPlayingNews.id !== selectedNews.id) {
        setSelectedNews(currentlyPlayingNews);
      }
    }
  }, [isMiniPlayerOpen, currentSource, news, selectedNews.id]);

  const isPlaying =
    isMiniPlayerOpen && isAudioPlaying && currentSource === selectedNews.audio;

  const handlePlay = () => {
    setCurrentSource(selectedNews.audio);
    setTagLine(`${selectedNews.anchor.name}${" — "}Crooze FM News`);
    setIsStreaming(false);
    setIsMiniPlayerOpen(true);
  };

  const handleNewsSelect = (item: News) => {
    setSelectedNews(item);

    if (item.audio !== currentSource) {
      setCurrentSource(item.audio);
      setTagLine(`${item.anchor.name}${" — "}Crooze FM News`);
      setIsStreaming(false);
      setIsMiniPlayerOpen(true);
    }
  };

  return (
    <div>
      <div className="bg-dark/10 dark:bg-gray/50 rounded-md shadow shadow-gray/20 dark:shadow-light/10 overflow-hidden border-y-4 border-red">
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat border-b border-dark/40 dark:border-light/20"
          style={{
            backgroundImage: `url("/assets/news-archive.png")`,
          }}
        >
          {" "}
          <div className="px-6 py-8 bg-light/90 dark:bg-dark/80">
            <div className="w-full flex items-center justify-between font-medium text-gray/60 dark:text-light/40">
              <small>
                <FormatDate date={selectedNews.aired.date} />
              </small>
              <small>{selectedNews.aired.time}</small>
            </div>

            <div
              className={`${
                pathname === "/news/news-archive" ? "" : "hidden"
              } py-6`}
            >
              <p className="text-left text-red/80 font-semibold leading-[1.5]">
                {selectedNews.headline}
                {", "}
                <span className="text-gray/60 dark:text-light/50 font-normal">
                  and more stories...
                </span>
              </p>
            </div>

            <div className="bg-gray/60 dark:bg-dark/40 p-2 rounded-sm text-light/80 font-semibold flex items-center justify-between relative border border-light/20">
              <div
                role="button"
                tabIndex={
                  isMiniPlayerOpen && currentSource === selectedNews.audio
                    ? -1
                    : 0
                }
                aria-label={
                  isPlaying
                    ? "Currently Playing in Miniplayer"
                    : "Play in Miniplayer"
                }
                aria-disabled={
                  isMiniPlayerOpen && currentSource === selectedNews.audio
                }
                onClick={() => {
                  if (isMiniPlayerOpen && currentSource === selectedNews.audio)
                    return;
                  handlePlay();
                }}
                onKeyDown={(e) => {
                  if (
                    (e.key === "Enter" || e.key === " ") &&
                    !(isMiniPlayerOpen && currentSource === selectedNews.audio)
                  ) {
                    e.preventDefault();
                    handlePlay();
                  }
                }}
                className={`px-4 py-2 ${
                  isMiniPlayerOpen && currentSource === selectedNews.audio
                    ? "text-red opacity-80 cursor-default"
                    : "cursor-pointer"
                }`}
              >
                {isPlaying ? (
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
              </div>

              {selectedNews.anchor.link ? (
                <Link
                  href={selectedNews.anchor.link}
                  className="relative mx-4 w-8 h-8 flex-shrink-0 transition-all duration-500"
                >
                  <span
                    className={`absolute inset-0 w-full h-full rounded-full ${
                      isPlaying
                        ? "animate-heartbeat bg-red"
                        : "border-2 border-red/80"
                    }`}
                  >
                    <Image
                      src={selectedNews.anchor.img}
                      alt={selectedNews.anchor.name}
                      width={2168}
                      height={2168}
                      className="rounded-full object-cover w-full aspect-square _img_ grayscale"
                    />
                  </span>
                </Link>
              ) : (
                <div className="relative mx-4 w-8 h-8 flex-shrink-0 transition-all duration-500">
                  <span
                    className={`absolute inset-0 w-full h-full rounded-full ${
                      isPlaying
                        ? "animate-heartbeat bg-red"
                        : "border-2 border-red/80"
                    }`}
                  >
                    <Image
                      src={selectedNews.anchor.img}
                      alt={selectedNews.anchor.name}
                      width={2168}
                      height={2168}
                      className="rounded-full object-cover w-full aspect-square _img_ grayscale"
                    />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <NewsPlaylist
          news={news}
          data={data}
          selectedNews={selectedNews}
          onNewsSelect={handleNewsSelect}
        />
      </div>
    </div>
  );
}
