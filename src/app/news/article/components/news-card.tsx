import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/types/news";
import { formatDate } from "@/lib/date-formatter";

interface NewsCardProps {
  article: NewsArticle;
  priority?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, priority = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/news/article/${article.slug}`}>
        <div className="relative h-48 w-full">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="bg-gray-200 h-full w-full flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        <div className="p-4">
          {article.tag && (
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mb-2">
              {article.tag}
            </span>
          )}
          <h3 className="text-lg font-bold mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{article.author}</span>
            <span>{formatDate(article.date)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
