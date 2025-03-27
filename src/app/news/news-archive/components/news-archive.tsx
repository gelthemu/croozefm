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
    setSnapShot,
    currentSource,
    isAudioPlaying,
    isMiniPlayerOpen,
    setIsSeekable,
    isLoading,
  } = useMiniPlayer();

  const getAudioIdFromUrl = (url: string | null): string | null => {
    if (!url) return null;

    const match = url.match(/\/([^\/]+)\.mp3$/);
    return match ? match[1] : null;
  };

  const buildAudioUrl = (audioId: string): string => {
    return `https://croozefm.blob.core.windows.net/audio/${audioId}.mp3`;
  };

  useEffect(() => {
    if (isMiniPlayerOpen && currentSource) {
      const currentAudioId = getAudioIdFromUrl(currentSource);

      if (currentAudioId) {
        const currentlyPlayingNews = news.find(
          (item) => item.audio === currentAudioId
        );

        if (
          currentlyPlayingNews &&
          currentlyPlayingNews.id !== selectedNews.id
        ) {
          setSelectedNews(currentlyPlayingNews);
        }
      }
    }
  }, [isMiniPlayerOpen, currentSource, news, selectedNews.id]);

  const isPlaying =
    isMiniPlayerOpen &&
    isAudioPlaying &&
    currentSource === buildAudioUrl(selectedNews.audio);

  const handlePlay = () => {
    if (isLoading) return;

    const audioUrl = buildAudioUrl(selectedNews.audio);
    setCurrentSource(audioUrl);
    setTagLine(`${selectedNews.anchor.name}${" — "}Crooze FM News`);
    setSnapShot("https://croozefm.blob.core.windows.net/images/news.png");
    setIsStreaming(false);
    setIsSeekable(false);
    setIsMiniPlayerOpen(true);
  };

  const handleNewsSelect = (item: News) => {
    if (isLoading) return;

    setSelectedNews(item);
    const audioUrl = buildAudioUrl(item.audio);
    if (audioUrl !== currentSource) {
      setCurrentSource(audioUrl);
      setTagLine(`${item.anchor.name}${" — "}Crooze FM News`);
      setSnapShot("https://croozefm.blob.core.windows.net/images/news.png");
      setIsStreaming(false);
      setIsSeekable(false);
      setIsMiniPlayerOpen(true);
    }
  };

  const isCurrentlyPlaying = () => {
    if (!isMiniPlayerOpen || !currentSource || isLoading) return false;
    return currentSource === buildAudioUrl(selectedNews.audio);
  };

  const renderAnchorImage = () => (
    <span
      className={`absolute inset-0 w-full h-full rounded-full ${
        isPlaying ? "animate-heartbeat bg-red" : "border-2 border-red/80"
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
  );

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
                  plus more headlines...
                </span>
              </p>
            </div>

            <div
              role="button"
              tabIndex={isCurrentlyPlaying() ? -1 : 0}
              aria-label={
                isPlaying
                  ? "Currently Playing in Miniplayer"
                  : "Play in Miniplayer"
              }
              aria-disabled={isCurrentlyPlaying()}
              onClick={() => {
                if (isCurrentlyPlaying()) return;
                handlePlay();
              }}
              onKeyDown={(e) => {
                if (
                  (e.key === "Enter" || e.key === " ") &&
                  !isCurrentlyPlaying()
                ) {
                  e.preventDefault();
                  handlePlay();
                }
              }}
              className={`bg-gray/60 dark:bg-dark/40 p-2 rounded-sm text-light/80 font-semibold flex items-center justify-between relative border border-light/20 ${
                isCurrentlyPlaying() ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <div
                className={`px-4 py-2 ${
                  isCurrentlyPlaying() ? "text-red opacity-80 " : ""
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
                  {renderAnchorImage()}
                </Link>
              ) : (
                <div className="relative mx-4 w-8 h-8 flex-shrink-0 transition-all duration-500">
                  {renderAnchorImage()}
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
