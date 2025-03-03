"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/types/news";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";

interface NewsCardProps {
  article: NewsArticle;
  priority?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, priority = false }) => {
  const { slug, tag, title, date, author, excerpt, coverImage } = article;

  const formatTagDisplay = (tag: string): string => {
    return tag
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <Link
        href={`/news/article/${slug}`}
        className="text-left flex flex-col py-6"
      >
        <div className="mb-2">            <span className="px-2 py-1 text-xs font-semibold rounded bg-gray/10 dark:bg-light/5 opacity-[0.75]">
              {tag === null ? formatTagDisplay("news") : formatTagDisplay(tag)}
            </span></div>
        <div className="flex">
          <div className="w-full">
            <h3 className="sm:text-lg font-semibold mb-2 leading-[1.2]">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">{excerpt}</p>
            <div className="flex items-center text-xs font-medium uppercase opacity-60">
              <span className="line-clamp-1">{author}</span>
              <span className="mx-1.5">{" • "}</span>
              <span>
                <FormatSimpleDate epoch={date} />
              </span>
            </div>
          </div>
          {coverImage ? (
            <div className="ml-2">
              <div className="relative rounded-sm overflow-hidden w-[72px] sm:w-[160px] xl:max-w-[236px]">
                <Image
                  src={coverImage}
                  alt={title}
                  width={600}
                  height={400}
                  priority={priority}
                  className="w-full h-full object-cover aspect-[1/1] sm:aspect-[1.5/1] grayscale-[0.85] _img_"
                />{" "}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Link>
    </>
  );
};

export default NewsCard;
