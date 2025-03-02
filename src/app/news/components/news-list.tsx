"use client";

import React, { useState, useEffect } from "react";
import { NewsArticle } from "@/types/news";
import NewsCard from "../article/components/news-card";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";

interface NewsListProps {
  articles: NewsArticle[];
}

const ARTICLES_PER_PAGE = 8;

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [articles]);

  if (articles.length === 0) {
    return (
      <div className="py-10">
        <h3 className="font-medium">Oops! No articles found...</h3>
        <p className="text-sm opacity-[0.65] mt-1.5">
          Check back later for new content!
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  const indexOfLastArticle = currentPage * ARTICLES_PER_PAGE;
  const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="w-full sm:w-[95%] sm:mx-auto max-w-[600px] lg:mx-0 flex-shrink-0">
      <div className="divide-y divide-dark/20 dark:divide-light/10">
        {currentArticles.map((article, index) => (
          <NewsCard
            key={article.slug}
            article={article}
            priority={currentPage === 1 && index < 6}
          />
        ))}
      </div>

      {articles.length > ARTICLES_PER_PAGE && (
        <div className="text-sm flex items-center mt-3 mb-6 space-x-1.5 p-1 transition-all duration-300">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-1.5 py-1 rounded-sm ${
              currentPage === 1 ? "opacity-50" : ""
            } border border-gray/80 dark:border-light/20`}
            aria-label="Previous page"
          >
            <span className="sr-only">Previous Page</span>
            <TiArrowLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded-sm ${
                currentPage === number
                  ? "bg-red text-light"
                  : "bg-gray/10 dark:bg-light/10 hover:bg-gray/20 dark:hover:bg-light/20"
              }`}
              aria-label={`Page ${number}`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              <span className="sr-only">{`Page ${number}`}</span>
              {number}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-1.5 py-1 rounded-sm ${
              currentPage === totalPages ? "opacity-50" : ""
            } border border-gray/80 dark:border-light/20`}
            aria-label="Next page"
          >
            <span className="sr-only">Next Page</span>
            <TiArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
