import React from "react";
import { NewsArticle } from "@/types/news";
import NewsCard from "../article/components/news-card";

interface NewsListProps {
  articles: NewsArticle[];
}

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
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

  return (
    <div className="w-full sm:w-[95%] sm:mx-auto max-w-[624px] md:mx-0 my-12">
      <div className="divide-y divide-dark/20 dark:divide-light/10">
        {articles.map((article, index) => (
          <NewsCard key={article.slug} article={article} priority={index < 6} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
