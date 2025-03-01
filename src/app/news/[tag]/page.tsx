import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsHeader from "../components/news-header";
import TagFilter from "../components/tag-filter";
import NewsList from "../components/news-list";
import { getAllTags, getNewsByTag } from "@/lib/news-parser";
import { NewsTag } from "@/types/news";
import XNewsButton from "../news-archive/components/news-btn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;

  const validTags = getAllTags();
  if (!validTags.includes(tag as NewsTag)) {
    return {
      title: "Tag Not Found",
    };
  }

  return {
    title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} News`,
    description: `Browse all our news articles tagged with ${tag}`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  const validTags = getAllTags();
  if (!validTags.includes(tag as NewsTag)) {
    notFound();
  }

  const articles = getNewsByTag(tag as NewsTag);
  const tags = getAllTags();
  const formatTagText = (tag: string): string => {
    return tag
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen overflow-hidden">
      <div className="sm:flex items-center justify-between">
        <NewsHeader
          title={
            tag === "411"
              ? `${formatTagText(tag)} - Entertainment`
              : `${formatTagText(tag)}`
          }
        />
        <TagFilter tags={tags} currentTag={tag as NewsTag} />
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
