import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/types/news";
import { formatDate } from "@/lib/date-formatter";

interface RecentNewsProps {
  articles: NewsArticle[];
}

const RecentNews: React.FC<RecentNewsProps> = ({ articles }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Recent News</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            className="flex gap-3 p-3 hover:bg-white rounded-lg transition-colors"
          >
            {article.coverImage && (
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="64px"
                  className="object-cover rounded"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(article.date)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/news"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View all news
        </Link>
      </div>
    </div>
  );
};

export default RecentNews;
