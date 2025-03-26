import React from "react";
import Link from "next/link";
import { H2Title } from "@/app/components/providers/divs/page-heading";
import Image from "next/image";
import { NewsArticle } from "@/types/news";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";

interface RecentNewsProps {
  articles: NewsArticle[];
  className?: string;
  title?: string;
}

const RecentNews: React.FC<RecentNewsProps> = ({
  articles,
  className = "",
  title = "Crooze FM News",
}) => {
  return (
    <>
      <div className="text-left">
        <H2Title title={title} />
        <div className={`${className} grid grid-cols-1 gap-2`}>
          {articles.map((article) => (
            <div
              key={article.slug}
              className="group flex flex-row justify-center p-1.5 bg-gray/10 dark:bg-light/5 rounded-md"
            >
              {article.image_url ? (
                <Link href={`/news/article/${article.slug}`} className="mr-2.5">
                  <div className="flex-shrink-0 relative overflow-hidden w-[120px]">
                    <Image
                      src={article.image_url}
                      alt={article.headline}
                      width={600}
                      height={400}
                      className="w-full object-cover rounded-sm aspect-[1.5/1] grayscale-[0.5] _img_"
                    />
                  </div>{" "}
                </Link>
              ) : null}
              <div className="flex flex-col justify-between">
                <Link href={`/news/article/${article.slug}`}>
                  <h3 className="mb-2 font-medium text-sm line-clamp-3 group-hover:underline decoration-red/60 transition-all duration-500">
                    {article.headline}
                  </h3>{" "}
                </Link>
                <p className="text-xs font-medium opacity-60">
                  <FormatSimpleDate epoch={article.publication_date} />
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end mx-auto mt-5">
          <ViewAllBtn href="/news" text="Follow All Updates" />
        </div>
      </div>
    </>
  );
};

export default RecentNews;
