// src\app\news\article\[slug]\page.tsx

import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  getAllNewsSlugs,
  getNewsArticle,
  getRecentNews,
} from "@/lib/news-parser";
import RecentNews from "../../components/recent-news";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";
import { FormatCategory } from "@/app/components/tiny/formatCategoryDisplay";
import { markdownComponents } from "../components/markdown-components";
import ShareArticle from "../components/share-article";
import { BannerAd, RectangleAd } from "@/app/components/providers/ads/ads";
import Divider from "@/app/components/providers/divs/divider";
import NewsFooter from "../../components/news-footer";
import { calculateReadingTime } from "@/lib/reading-time";
import "@/app/styles/md/profile.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) {
    return {
      title: "Story Not Found",
    };
  }

  return {
    title: `${article.headline}`,
    description: article.excerpt,
    keywords: `91.2 Crooze Fm, Western Uganda, ${article.keywords}, News, Crooze Fm news, Crooze Fm updates, Crooze Fm latest news, Crooze Fm 411, Crooze Fm Archive, Crooze Fm local news, Crooze Fm headlines, Crooze Fm media`,
    openGraph: {
      title: `${article.headline}`,
      description: article.excerpt,
      type: "website",
      url: `https://croozefm.geltaverse.com/news/article/${article.slug}`,
      images: article.image_url
        ? [
            {
              url: article.image_url,
              alt: `${article.headline} - Crooze FM News, Western Uganda`,
              width: 1200,
              height: 630,
            },
          ]
        : article.isPinned
        ? [
            {
              url: "https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png",
              alt: "Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday.",
              width: 1200,
              height: 630,
            },
          ]
        : [
            {
              url: "https://croozefm.blob.core.windows.net/images/news.png",
              alt: "Crooze FM News, Western Uganda. Home of Western Uganda's Biggest Radio Station.",
              width: 1200,
              height: 630,
            },
          ],
    },
    twitter: {
      title: `${article.headline}`,
      description: article.excerpt,
      card: "summary_large_image",
      site: "@geltaverse",
      creator: "@geltaverse",
      images: article.image_url
        ? [
            {
              url: article.image_url,
              alt: `${article.headline} - Crooze FM News, Western Uganda`,
            },
          ]
        : article.isPinned
        ? [
            {
              url: "https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png",
              alt: "Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday.",
              width: 1200,
              height: 630,
            },
          ]
        : [
            {
              url: "https://croozefm.blob.core.windows.net/images/default.png",
              alt: "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
            },
          ],
    },
    alternates: {
      canonical: `https://croozefm.geltaverse.com/news/article/${article.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug || slug === null) {
    return notFound();
  }

  const article = getNewsArticle(slug);

  if (!article) {
    return notFound();
  }

  const {
    headline,
    publication_date,
    excerpt,
    category,
    content,
    image_url,
    author,
    source,
    isPinned,
  } = article;

  const { readingTime } = calculateReadingTime(content);

  const recentArticles = getRecentNews(6)
    .filter((a) => a.slug !== slug && !a.isPinned)
    .slice(0, 4);

  return (
    <>
      <div className="w-full sm:w-[95%] sm:mx-auto max-w-[740px] text-left">
        <div className="mb-4 flex items-center md:text-xs font-light opacity-50">
          <small>
            Reading Time: <span className="ml-1.5">{readingTime}</span>
          </small>
        </div>

        <article className="rounded-sm shadow shadow-gray/20 dark:shadow-light/5 overflow-hidden border-y-4 border-red">
          {image_url && (
            <div className="relative w-full overflow-hidden">
              <Image
                src={image_url}
                alt={headline}
                width={600}
                height={400}
                priority={true}
                className="w-full h-full object-cover object-top aspect-[4/2] grayscale-[0.5] _img_"
              />
            </div>
          )}

          <div className="p-4 md:p-6">
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

            <div className="mb-6 py-4 italic font-light opacity-[0.85] border-y border-gray/10 dark:border-light/10">
              {excerpt}
            </div>

            <div className="prose prose-lg max-w-none">
              <Markdown
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {content}
              </Markdown>
            </div>
          </div>
          <div className="mb-10 mx-6 pt-8 border-t border-dashed border-dark/40 dark:border-light/40">
            <ShareArticle title={headline} slug={slug} />
          </div>
          <div>
            <RectangleAd />
            <BannerAd />
          </div>
        </article>

        <div className="my-10">
          <RecentNews
            articles={recentArticles}
            className="md:grid-cols-2 mt-6"
            title="Read More"
          />
        </div>
      </div>
      <Divider />
      <NewsFooter />
    </>
  );
}
