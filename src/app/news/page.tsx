import React from "react";
import { Metadata } from "next";
import NewsHeader from "./components/news-header";
import CategoryFilter from "./components/category-filter";
import NewsList from "./components/news-list";
import { getAllNewsArticles, getAllCategories } from "@/lib/news-parser";
import XNewsButton from "./news-archive/components/news-btn";

export const metadata: Metadata = {
  title: "News / Crooze FM",
  description:
    "Stay updated with our latest news and articles. Always remember where you heard it first.",
  keywords:
    "CroozeFM, 91.2 FM, Western Uganda's Biggest Radio Station, Great Music, Great Friends, Western Uganda, News, Crooze FM news, Crooze FM articles, Crooze FM updates, Crooze FM latest news, Crooze FM radio news, Crooze FM breaking news, Crooze FM blog, Crooze FM stories, Crooze FM music news, Crooze FM entertainment news, Crooze FM local news, Crooze FM headlines, Crooze FM features, Crooze FM online articles, Crooze FM media",
};

export default function NewsPage() {
  const articles = getAllNewsArticles();
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen overflow-hidden">
      <div className="w-full sm:w-[95%] sm:mx-auto max-w-[720px] text-left">
        <div className="flex flex-col">
          <NewsHeader title="Latest News" />

          <CategoryFilter categories={categories} />
        </div>

        <div className="my-8 flex flex-col">
          <NewsList articles={articles} />
        </div>
      </div>

      <div className="text-center pt-10 flex flex-col items-center justify-center border-t border-dark/10 dark:border-light/10">
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
