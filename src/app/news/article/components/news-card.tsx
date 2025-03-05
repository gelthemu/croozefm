"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/types/news";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";
import { FormatCategory } from "@/app/components/tiny/formatCategoryDisplay";

interface NewsCardProps {
  article: NewsArticle;
  priority?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, priority = false }) => {
  const {
    slug,
    headline,
    publication_date,
    excerpt,
    category,
    image_url,
    author,
    source,
  } = article;

  return (
    <>
      <Link
        href={`/news/article/${slug}`}
        className="text-left flex flex-col py-6"
      >
        <div className="mb-2">
          {" "}
          <span className="px-2 py-1 text-xs font-semibold rounded bg-gray/10 dark:bg-light/5 opacity-[0.75]">
            {category === null ? (
              <FormatCategory category="news" />
            ) : (
              <FormatCategory category={category} />
            )}
          </span>
        </div>
        <div className="flex">
          <div className="w-full">
            <h3 className="sm:text-lg font-semibold mb-2 leading-[1.2]">
              {headline}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">{excerpt}</p>
          </div>
          {image_url ? (
            <div className="ml-2">
              <div className="relative rounded-sm overflow-hidden w-[72px] sm:w-[160px] xl:max-w-[236px]">
                <Image
                  src={image_url}
                  alt={headline}
                  width={600}
                  height={400}
                  priority={priority}
                  className="w-full h-full object-cover aspect-[1/1] sm:aspect-[1.5/1] grayscale-[0.75] _img_"
                />{" "}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-wrap items-center text-xs font-medium opacity-60">
          {(author || source) && (
            <div className="flex flex-wrap items-center">
              {author && <span>{author}</span>}
              {author && source && (
                <span className="mx-1 opacity-50">{"/"}</span>
              )}
              {source && <span>{source}</span>}
              <span className="mx-1.5 opacity-50">•</span>
            </div>
          )}
          <div>
            <span>
              <FormatSimpleDate epoch={publication_date} />
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NewsCard;
