import React from "react";
import Link from "next/link";
import { NewsArticle } from "@/types/news";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";

interface RecentNewsProps {
  articles: NewsArticle[];
  className?: string;
}

const RecentNews: React.FC<RecentNewsProps> = ({
  articles,
  className = "",
}) => {
  return (
    <div className="bg-gray-50 p-2 rounded-lg text-left">
      <h3 className="w-fit text-2xl text-red font-light mb-4 pb-2.5 relative after:absolute after:bottom-0 after:left-0 after:w-1/2 after:border-b-2 after:border-red/80">
        Recent Articles
      </h3>
      <div className={`${className} grid grid-cols-1 gap-2`}>
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/news/article/${article.slug}`}
            className="flex flex-col justify-between p-6 bg-gray/10 dark:bg-light/5 rounded-sm"
          >
            <h3 className="mb-2 font-normal text-sm line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs font-medium uppercase opacity-60">
              <FormatSimpleDate epoch={article.date} />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentNews;
