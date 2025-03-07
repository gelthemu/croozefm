"use client";

import { useState, useEffect } from "react";
import { shows } from "@/data/shows/shows";
import { ShowCard } from "./show/showcard";
import { MoveLeft, MoveRight } from "lucide-react";

const ITEMS_PER_PAGE = 9;

export default function ShowsFullList() {
  const [currentPage, setCurrentPage] = useState(1);

  const ftShows = shows.filter((show) => show.isFt);

  const totalPages = Math.ceil(ftShows.length / ITEMS_PER_PAGE);
  const indexOfLastShow = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstShow = indexOfLastShow - ITEMS_PER_PAGE;

  const currentShows = ftShows.slice(indexOfFirstShow, indexOfLastShow);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {currentShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>

      <div className="max-w-md mx-auto mt-10 px-2 flex items-center justify-between gap-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-2.5 py-1 rounded-sm transition-all duration-300 ${
            currentPage === 1
              ? "opacity-[0.5]"
              : "text-light dark:text-dark bg-gray dark:bg-light"
          } border`}
        >
          <span className="sr-only">Previous Page</span>
          <MoveLeft size={16} />
        </button>
        <span className="text-sm">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-2.5 py-1 rounded-sm transition-all duration-300 ${
            currentPage === totalPages
              ? "opacity-[0.5]"
              : "text-light dark:text-dark bg-gray dark:bg-light"
          } border`}
        >
          <span className="sr-only">Next Page</span>
          <MoveRight size={16} />
        </button>
      </div>
    </>
  );
}
