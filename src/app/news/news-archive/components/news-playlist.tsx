"use client";

import React, { useState, useEffect } from "react";
import { News } from "@/types/news";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { FormatDate } from "@/app/components/tiny/format-date";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";

interface NewsPlaylistProps {
  news: News[];
  data: News[];
  selectedNews: News;
  onNewsSelect: (item: News) => void;
}

const ITEMS_PER_PAGE = 8;
const MAX_PAGE_BUTTONS = 5;

export function NewsPlaylist({
  news,
  data,
  selectedNews,
  onNewsSelect,
}: NewsPlaylistProps) {
  const { currentSource, isMiniPlayerOpen } = useMiniPlayer();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, selectedNews.id]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (news.length === 0) {
    return (
      <div className="py-10">
        <h3 className="font-medium">Oops! No News Items found...</h3>
        <p className="text-sm opacity-[0.65] mt-1.5">
          Check back later for new content!
        </p>
      </div>
    );
  }

  const indexOfLastArticle = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstArticle = indexOfLastArticle - ITEMS_PER_PAGE;
  const currentItems = news.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  const generatePageButtons = () => {
    if (totalPages <= MAX_PAGE_BUTTONS) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageButtons: (number | string)[] = [];

    pageButtons.push(1);

    const start = Math.max(2, currentPage - Math.floor(MAX_PAGE_BUTTONS / 3));
    const end = Math.min(totalPages - 1, start + MAX_PAGE_BUTTONS - 4);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pageButtons.push(i);
      }
    }

    if (end < totalPages - 1) {
      pageButtons.push("...");
    }

    if (totalPages > 1) {
      pageButtons.push(totalPages);
    }

    return pageButtons;
  };

  return (
    <>
      <div className="bg-gray/20 dark:bg-light/10 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-2">
          <small>In this PLAYLIST</small>
          <small>{data.length} Episodes</small>
        </div>
      </div>

      <div>
        {currentItems.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={selectedNews.id === item.id ? -1 : 0}
            aria-pressed={selectedNews.id === item.id}
            aria-disabled={selectedNews.id === item.id}
            onClick={() => {
              if (selectedNews.id !== item.id) {
                onNewsSelect(item);
              }
            }}
            onKeyDown={(e) => {
              if (
                (e.key === "Enter" || e.key === " ") &&
                selectedNews.id !== item.id
              ) {
                e.preventDefault();
                onNewsSelect(item);
              }
            }}
            className={`w-full text-left p-4 transition-all duration-200 ${
              selectedNews.id === item.id
                ? "bg-gray/10 dark:bg-light/5 border-l-4 border-l-red/100 dark:border-l-red/60 cursor-default"
                : "cursor-pointer"
            } hover:bg-gray/10 dark:hover:bg-light/5 border-b border-b-light/60 dark:border-b-dark/80`}
          >
            <div>
              <div
                className={`w-fit mb-1.5 text-xs text-light/80 rounded-sm bg-red/80 dark:bg-red/60 py-1 px-2 ${
                  news.indexOf(item) === 0 ? "show" : "hidden"
                }`}
              >
                Recent
              </div>
              <div className="mb-1.5 text-sm text-gray/90 dark:text-light/60 font-medium">
                <span className="line-clamp-2 md:line-clamp-1">
                  {item.headline}
                </span>
              </div>
              <div className="flex flex-row items-center justify-between text-gray/60 dark:text-light/40">
                <small className="flex-1 flex flex-row items-center line-clamp-1">
                  <span
                    className={`line-clamp-1 ${
                      isMiniPlayerOpen && currentSource === item.audio
                        ? "text-red/80"
                        : ""
                    }`}
                  >
                    {item.anchor.name}
                  </span>
                </small>
                <small>
                  <FormatDate date={item.aired.date} />
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {news.length > ITEMS_PER_PAGE && (
        <div className="text-sm flex flex-wrap items-center mt-3 mb-6 p-1 transition-all duration-300">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-1.5 py-1 m-1.5 rounded-sm ${
              currentPage === 1 ? "opacity-[0.45]" : ""
            } border border-gray/80 dark:border-light/20`}
            aria-label="Previous page"
          >
            <span className="sr-only">Previous Page</span>
            <TiArrowLeft size={18} />
          </button>

          {generatePageButtons().map((number, index) => (
            <button
              key={index}
              onClick={() =>
                typeof number === "number" ? handlePageChange(number) : null
              }
              className={`px-3 py-1 m-1 rounded-sm ${
                currentPage === number
                  ? "bg-red text-light"
                  : number === "..."
                  ? "cursor-default opacity-50"
                  : "bg-gray/10 dark:bg-light/10 hover:bg-gray/20 dark:hover:bg-light/20"
              }`}
              aria-label={
                typeof number === "number" ? `Page ${number}` : "Ellipsis"
              }
              aria-current={number === currentPage ? "page" : undefined}
              disabled={number === "..."}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-1.5 py-1 m-1.5 rounded-sm ${
              currentPage === totalPages ? "opacity-[0.45]" : ""
            } border border-gray/80 dark:border-light/20`}
            aria-label="Next page"
          >
            <span className="sr-only">Next Page</span>
            <TiArrowRight size={18} />
          </button>
        </div>
      )}
    </>
  );
}
