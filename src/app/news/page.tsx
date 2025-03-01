import React from "react";
import { Metadata } from "next";
import NewsHeader from "./components/news-header";
import TagFilter from "./components/tag-filter";
import NewsList from "./components/news-list";
import { getAllNewsArticles, getAllTags } from "@/lib/news-parser";
import XNewsButton from "./news-archive/components/news-btn";

export const metadata: Metadata = {
  title: "News - 91.2 Crooze FM",
  description:
    "Stay updated with our latest news and articles. Always remember where you heard it first.",
};

export default function NewsPage() {
  const articles = getAllNewsArticles();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen overflow-hidden">
      <div className="sm:flex items-center justify-between">
        <NewsHeader title="Latest News" />

        <TagFilter tags={tags} />
      </div>

      <NewsList articles={articles} />

      <div className="pt-10 flex flex-col items-center justify-center border-t border-dark/10 dark:border-light/10">
        <p className="max-w-lg mx-auto mb-4">
          We don&apos;t just break stories, we tell real stories. Stay abreast
          of the latest developments in the world of news and information.
        </p>
        <div className="flex justify-center mb-4">
          <XNewsButton />
        </div>
        <p className="font-semibold text-sm text-red italic mb-4">
          &quot;Always remember where you heard it first.&quot;
        </p>
      </div>
    </div>
  );
}
