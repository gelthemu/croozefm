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
  const { slug, title, date, author, excerpt, coverImage } = article;

  return (
    <>
      <Link
        href={`/news/article/${slug}`}
        className="text-left flex flex-col py-6"
      >
        <div className="flex gap-2">
          <div className="w-full">
            <h3 className="sm:text-lg font-semibold mb-2 leading-[1.2]">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{excerpt}</p>
            <div className="flex items-center text-xs font-medium uppercase opacity-60">
              <span className="line-clamp-1">{author}</span>
              <span className="mx-1.5">{" • "}</span>
              <span>
                <FormatSimpleDate date={date} />
              </span>
            </div>
          </div>
          {coverImage ? (
            <div>
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
