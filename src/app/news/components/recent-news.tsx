import React from "react";
import Link from "next/link";
import { H2Title } from "@/app/components/providers/divs/page-heading";
import { NewsArticle } from "@/types/news";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";

interface RecentNewsProps {
  articles: NewsArticle[];
  className?: string;
}

const RecentNews: React.FC<RecentNewsProps> = ({
  articles,
  className = "",
}) => {
  return (
    <>
      <div className="text-left">
        <H2Title title="Crooze FM News" />
        <div className={`${className} grid grid-cols-1 gap-2`}>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/news/article/${article.slug}`}
              className="flex flex-col justify-between p-6 bg-gray/10 dark:bg-light/5 rounded-md"
            >
              <h3 className="mb-2 font-normal text-sm line-clamp-2">
                {article.headline}
              </h3>
              <p className="text-xs font-medium opacity-60">
                <FormatSimpleDate epoch={article.publication_date} />
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end mx-auto mt-5">
        <ViewAllBtn href="/news" text="Follow All Updates" />
      </div>
    </>
  );
};

export default RecentNews;
