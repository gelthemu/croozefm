import React from "react";
import Link from "next/link";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";
import { FormatCategory } from "@/app/components/tiny/formatCategoryDisplay";

interface ArticleHeaderProps {
  headline: string;
  image_url: string | null;
  category: string | null;
  author: string | null;
  source: string | null;
  publication_date: number;
  isPinned?: boolean;
}

export function ArticleHeader({
  headline,
  category,
  author,
  source,
  publication_date,
  isPinned,
}: ArticleHeaderProps) {
  return (
    <>
      <div className="mb-6">
        {!isPinned && (
          <Link href={category === null ? "/news" : `/news/${category}`}>
            <span className="px-2 py-1 text-xs font-semibold rounded bg-gray/10 dark:bg-light/5 opacity-[0.75]">
              {category === null ? (
                <FormatCategory category="news" />
              ) : (
                <FormatCategory category={category} />
              )}
            </span>
          </Link>
        )}
        <h1 className="text-2xl md:text-3xl relative _912cfm my-4 leading-[1.25]">
          {headline}
        </h1>
        <div className="flex flex-wrap items-center text-sm md:text-xs font-medium opacity-60">
          {(author || source) && (
            <div className="flex flex-wrap items-center">
              {author && <span>{author}</span>}
              {author && source && (
                <span className="mx-1 opacity-60">{"/"}</span>
              )}
              {source && <span>{source}</span>}
              <span className="mx-1.5 opacity-60">•</span>
            </div>
          )}
          <div>
            <span>
              <FormatSimpleDate epoch={publication_date} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
