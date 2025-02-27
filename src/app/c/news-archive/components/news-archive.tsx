"use client";

import React, { useState, useEffect, useCallback } from "react";
import { News } from "@/types/news";
import { news } from "@/data/news";
import Image from "next/image";
import { toast } from "react-toastify";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FormatDate } from "@/app/components/tiny/format-date";

export default function NewsArchive() {
  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(b.aired.date).getTime() - new Date(a.aired.date).getTime()
  );

  const [selectedNews, setSelectedNews] = useState<News>(sortedNews[0]);
  const [displayOrder, setDisplayOrder] = useState<News[]>(sortedNews);
  const {
    setIsMiniPlayerOpen,
    setCurrentSource,
    setTagLine,
    setIsStreaming,
    currentSource,
    isAudioPlaying,
    isMiniPlayerOpen,
  } = useMiniPlayer();

  const updateDisplayOrder = useCallback(
    (selected: News) => {
      const selectedIndex = sortedNews.findIndex(
        (item) => item.id === selected.id
      );

      if (selectedIndex !== 0) {
        const newOrder = [...sortedNews];
        const selectedItem = newOrder.splice(selectedIndex, 1)[0];
        newOrder.splice(1, 0, selectedItem);
        return newOrder;
      } else {
        return [...sortedNews];
      }
    },
    [sortedNews]
  );

  useEffect(() => {
    if (isMiniPlayerOpen && currentSource) {
      const currentlyPlayingNews = sortedNews.find(
        (item) => item.audio === currentSource
      );
      if (currentlyPlayingNews && currentlyPlayingNews.id !== selectedNews.id) {
        setSelectedNews(currentlyPlayingNews);
        setDisplayOrder(updateDisplayOrder(currentlyPlayingNews));
      }
    }
  }, [
    isMiniPlayerOpen,
    currentSource,
    sortedNews,
    selectedNews.id,
    updateDisplayOrder,
  ]);

  const isNewsItemPlaying = (audioSource: string): boolean => {
    return isMiniPlayerOpen && isAudioPlaying && currentSource === audioSource;
  };

  const handlePlay = () => {
    setCurrentSource(selectedNews.audio);
    setTagLine(
      `#CroozeFMNews${" "}(${selectedNews.aired.time})${" • "}${
        selectedNews.anchor
      }`
    );
    setIsStreaming(false);
    setIsMiniPlayerOpen(true);
  };

  const handleNewsSelect = (item: News) => {
    if (selectedNews.id !== item.id) {
      setSelectedNews(item);
      setDisplayOrder(updateDisplayOrder(item));

      if (item.audio !== currentSource) {
        setCurrentSource(item.audio);
        setTagLine(
          `#CroozeFMNews${" "}(${item.aired.time})${" • "}${item.anchor}`
        );
        setIsStreaming(false);
        setIsMiniPlayerOpen(true);
      }
    }
  };

  const isPlaying = isNewsItemPlaying(selectedNews.audio);

  return (
    <div className="max-w-xl mx-auto bg-dark/20 dark:bg-gray/60 rounded-sm border border-dark/20 dark:border-light/20">
      <div className="border-b border-dark/40 dark:border-light/20 p-6">
        <div className="mb-4 w-full flex items-center justify-between font-medium text-gray/60 dark:text-light/40">
          <small>
            <FormatDate date={selectedNews.aired.date} />
          </small>
          <small>{selectedNews.aired.time}</small>
        </div>

        <div className="py-4 border-y border-gray/20 dark:border-light/10 ">
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
                isPlaying
                  ? "animate-heartbeat bg-red"
                  : "border-2 border-red/80"
              }`}
            >
              {" "}
              <Image
                src={selectedNews.profileImg}
                alt={selectedNews.anchor}
                width={2168}
                height={2168}
                className="rounded-full object-cover w-full aspect-square _img_ grayscale"
              />
            </span>
          </div>
          <div className="overflow-hidden text-left ml-2.5">
            <span className="font-medium text-sm text-dark/80 dark:text-light/80 line-clamp-1">
              {selectedNews.anchor}
            </span>
          </div>
        </div>

        <div className="bg-gray/60 dark:bg-dark/40 p-2 rounded-sm text-light/80 font-semibold flex items-center justify-between relative border border-light/20">
          <button
            aria-label={
              isPlaying
                ? "Currently Playing in Miniplayer"
                : "Play in Miniplayer"
            }
            onClick={handlePlay}
            className={`px-4 py-2 transition-all duration-200 rounded-sm ${
              isMiniPlayerOpen && currentSource === selectedNews.audio
                ? "text-red/80"
                : ""
            }`}
            disabled={isMiniPlayerOpen && currentSource === selectedNews.audio}
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

      <div className="bg-gray/20 dark:bg-light/10 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-2">
          <small>In this PLAYLIST</small>
          <small>{displayOrder.length} Episodes</small>
        </div>
      </div>

      <div className="h-[40vh] md:h-[60vh] overflow-x-hidden overflow-y-scroll">
        {displayOrder.map((item, index) => {
          const isItemPlaying = isNewsItemPlaying(item.audio);

          return (
            <button
              key={item.id}
              onClick={() => handleNewsSelect(item)}
              disabled={selectedNews.id === item.id}
              className={`w-full text-left p-4 transition-all duration-200 ${
                selectedNews.id === item.id
                  ? "bg-gray/10 dark:bg-light/5 border-l-4 border-l-red/100 dark:border-l-red/60"
                  : ""
              } hover:bg-gray/10 dark:hover:bg-light/5 border-b border-b-light/30 dark:border-b-dark/60`}
            >
              <div>
                <div
                  className={`w-fit mb-1.5 text-light/80 bg-red/80 dark:bg-red/60 py-0 px-1.5 ${
                    index === 0 ? "show" : "hidden"
                  }`}
                >
                  <small>Recently Archived</small>
                </div>
                <div className="mb-1.5 text-sm text-gray/90 dark:text-light/60 font-medium">
                  <span className="line-clamp-2 md:line-clamp-1">
                    {item.headline}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between text-gray/60 dark:text-light/20">
                  <small className="flex-1 flex flex-row items-center line-clamp-1">
                    <span
                      className={`line-clamp-1 ${
                        isItemPlaying ? "text-red/80" : ""
                      }`}
                    >
                      {item.anchor}
                    </span>
                  </small>
                  <small>
                    <FormatDate date={item.aired.date} />
                  </small>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
