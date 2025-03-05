"use client";

import React, { useState, useEffect } from "react";
import { News } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FormatDate } from "@/app/components/tiny/format-date";
import { IoMdDownload } from "react-icons/io";
import { NewsPlaylist } from "./news-playlist";

interface NewsArchiveProps {
  news: News[];
  data: News[];
  className?: string;
}

export default function NewsArchive({
  news,
  data,
  className,
}: NewsArchiveProps) {
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
      <div className="bg-dark/20 dark:bg-gray/60 rounded-sm border border-dark/20 dark:border-light/20">
        <div className="border-b border-dark/40 dark:border-light/20 p-6">
          <div className="w-full flex items-center justify-between font-medium text-gray/60 dark:text-light/40">
            <small>
              <FormatDate date={selectedNews.aired.date} />
            </small>
            <small>{selectedNews.aired.time}</small>
          </div>

          <div
            className={`${
              pathname === "/news/news-archive" ? "" : "hidden"
            } w-full relative rounded-sm overflow-hidden`}
          >
            <Image
              src="/assets/news-archive-banner.png"
              alt="News Archive"
              width={1200}
              height={300}
              priority={true}
              className="w-full h-full object-cover aspect-[4/1] grayscale-[0.2] dark:opacity-[0.85] _img_"
            />
          </div>

          <div
            className={`${
              pathname === "/news/news-archive" ? "" : "hidden"
            } py-4 border-b border-gray/20 dark:border-light/10 `}
          >
            <p className="text-left text-red/80 font-semibold leading-[1.5]">
              {selectedNews.headline}
              {", "}
              <span className="text-gray/60 dark:text-light/50 font-normal">
                and more stories...
              </span>
            </p>
          </div>

          <div className="my-4 flex items-center">
            <div className="relative w-8 h-8 flex-shrink-0">
              <span
                className={`absolute inset-0 w-full h-full rounded-full ${
                  isMiniPlayerOpen && currentSource === selectedNews.audio
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
            <div className="overflow-hidden text-left ml-2.5">
              <Link
                href={
                  selectedNews.anchor.link
                    ? selectedNews.anchor.link
                    : `/i/${selectedNews.anchor.name
                        ?.toLowerCase()
                        .replace(/ /g, "-")}`
                }
              >
                <span className="font-medium text-sm text-dark/80 dark:text-light/80 line-clamp-1">
                  {selectedNews.anchor.name}
                </span>
              </Link>
            </div>
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
                  ? "text-red/80 opacity-80 cursor-default"
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
            <div
              role="button"
              tabIndex={0}
              aria-label="Download"
              onClick={() =>
                toast.info(
                  "The file download feature is currently unavailable... sorry!",
                  { autoClose: 4000 }
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toast.info(
                    "The file download feature is currently unavailable... sorry!",
                    { autoClose: 4000 }
                  );
                }
              }}
              className={`px-4 py-2 cursor-pointer ${
                pathname === "/news/news-archive" ? "" : "hidden"
              }`}
            >
              <span className="sr-only">Download</span>
              <IoMdDownload size={18} />
            </div>
          </div>
        </div>

        <NewsPlaylist
          news={news}
          data={data}
          selectedNews={selectedNews}
          onNewsSelect={handleNewsSelect}
          className={className}
        />
      </div>
    </div>
  );
}
