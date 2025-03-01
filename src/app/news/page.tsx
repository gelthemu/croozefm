import React from "react";
import { Metadata } from "next";
import NewsHeader from "./components/news-header";
import TagFilter from "./components/tag-filter";
import NewsList from "./components/news-list";
import { getAllNewsArticles, getAllTags } from "@/lib/news-parser";

export const metadata: Metadata = {
  title: "News and Updates",
  description:
    "Stay up-to-date with our latest news, announcements, and updates",
};

export default function NewsPage() {
  const articles = getAllNewsArticles();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-8">
      <NewsHeader
        title="News and Updates"
        subtitle="Stay up-to-date with our latest news, announcements, and updates"
      />

      <TagFilter tags={tags} />

      <div className="mt-8">
        <NewsList articles={articles} />
      </div>
    </div>
  );
}
