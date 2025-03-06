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
import BackBtn from "@/app/components/tiny/backbtn";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import RecentNews from "../../components/recent-news";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";
import "@/app/styles/md/profile.css";
import { FormatCategory } from "@/app/components/tiny/formatCategoryDisplay";
import { markdownComponents } from "../components/markdown-components";
import ShareArticle from "../components/share-article";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.headline} | News - 91.2 Crooze FM`,
    description: article.excerpt,
    openGraph: {
      title: `${article.headline} | News - 91.2 Crooze FM`,
      description: article.excerpt,
      type: "website",
      url: `https://croozefm.geltaverse.com/news/article/${article.slug}`,
      images: article.image_url
        ? [article.image_url]
        : [
            "https://pbs.twimg.com/media/Gk3-uj0XMAAyl66?format=jpg&name=4096x4096",
          ],
    },
    twitter: {
      title: `${article.headline} | News - 91.2 Crooze FM`,
      description: article.excerpt,
      card: "summary_large_image",
      site: "@geltaverse",
      creator: "@geltaverse",
      images: article.image_url
        ? [article.image_url]
        : [
            "https://pbs.twimg.com/media/Gk3-uj0XMAAyl66?format=jpg&name=4096x4096",
          ],
    },
    alternates: {
      canonical: `https://croozefm.geltaverse.com/c/shows/${article.slug}`,
      languages: {
        "en-US": "/c/en-US",
      },
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

  const recentArticles = getRecentNews(5)
    .filter((a) => a.slug !== slug)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <BackBtn />
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
        </article>

        <div className="my-10">
          <RecentNews articles={recentArticles} className="md:grid-cols-2" />
        </div>

        <div className="flex items-center justify-center lg:justify-end mx-auto lg:mr-10 px-6 py-2">
          <ViewAllBtn href="/news" text="See All Articles" />
        </div>
      </div>
    </div>
  );
}
