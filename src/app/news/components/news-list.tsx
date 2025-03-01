import React from "react";
import { NewsArticle } from "@/types/news";
import NewsCard from "../article/components/news-card";

interface NewsListProps {
  articles: NewsArticle[];
}

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">No news articles found</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={article.slug} article={article} priority={index < 6} />
      ))}
    </div>
  );
};

export default NewsList;
