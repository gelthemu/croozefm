"use client";

import React, { useState, useEffect } from "react";
import { NewsArticle } from "@/types/news";
import NewsCard from "../article/components/news-card";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";

interface NewsListProps {
  articles: NewsArticle[];
}

const ARTICLES_PER_PAGE = 10;

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  const indexOfLastArticle = currentPage * ARTICLES_PER_PAGE;
  const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  return (
    <div className="w-full">
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 m-1 rounded-sm ${
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
    </div>
  );
};

export default NewsList;
