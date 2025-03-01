import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsHeader from "../components/news-header";
import TagFilter from "../components/tag-filter";
import NewsList from "../components/news-list";
import { getAllTags, getNewsByTag } from "@/lib/news-parser";
import { NewsTag } from "@/types/news";

// Properly type the params according to Next.js App Router conventions
type Props = {
  params: {
    tag: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = params;

  // Validate tag
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
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default function TagPage({ params }: Props) {
  const { tag } = params;

  // Validate tag
  const validTags = getAllTags();
  if (!validTags.includes(tag as NewsTag)) {
    notFound();
  }

  const articles = getNewsByTag(tag as NewsTag);
  const tags = getAllTags();
  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <NewsHeader
        title={`${formattedTag} News`}
        subtitle={`Browse all our news articles tagged with ${tag}`}
      />

      <TagFilter tags={tags} currentTag={tag as NewsTag} />

      <div className="mt-8">
        <NewsList articles={articles} />
      </div>
    </div>
  );
}
