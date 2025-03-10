"use client";

import { useState, useEffect, ReactNode } from "react";
import { MoveLeft, MoveRight } from "lucide-react";

interface MainPaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  scrollToTop?: boolean;
}

export function MainPagination<T>({
  items,
  itemsPerPage,
  renderItem,
  className = "",
  scrollToTop = true,
}: MainPaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

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
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, scrollToTop]);

  return (
    <>
      <div
        className={`${className} grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {currentItems.map((item, index) => renderItem(item, index))}
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
