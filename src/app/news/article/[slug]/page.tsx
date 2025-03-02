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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = getNewsArticle(slug);

    if (!article) {
      return {
        title: "Not Found",
      };
    }

    return {
      title: `${article.title} | News - 91.2 Crooze FM`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: article.coverImage ? [article.coverImage] : [],
      },
    };
  } catch (error) {
    console.log(error);

    return {
      title: "Not Found",
    };
  }
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

  const recentArticles = getRecentNews(5)
    .filter((a) => a.slug !== slug)
    .slice(0, 4);

  const formatTagDisplay = (tag: string): string => {
    return tag
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <BackBtn />
        </div>

        <article className="rounded-sm shadow shadow-gray/20 dark:shadow-light/5 overflow-hidden">
          {article.coverImage && (
            <div className="relative w-full rounded-sm overflow-hidden">
              <Image
                src={article.coverImage}
                alt={article.title}
                width={600}
                height={400}
                priority={true}
                className="w-full h-full object-cover aspect-[3/2] rounded-sm grayscale-[0.85] _img_"
              />
            </div>
          )}

          <div className="p-4 md:p-8">
            <div className="mb-6">
              {article.tag && (
                <Link href={`/news/${article.tag}`}>
                  <span className="px-1.5 py-1 text-xs font-semibold rounded bg-gray/10 opacity-[0.75]">
                    {formatTagDisplay(article.tag)}
                  </span>
                </Link>
              )}
              <h1 className="text-2xl md:text-3xl relative _912cfm my-4 leading-[1.25]">
                {article.title}
              </h1>
              <div className="flex items-center text-sm md:text-xs font-medium opacity-60">
                <span className="line-clamp-1">{article.author}</span>
                <span className="mx-2">{" • "}</span>
                <span>
                  <FormatSimpleDate date={article.date} />
                </span>
              </div>
            </div>

            <div className="mb-6 py-4 italic font-light opacity-[0.85] border-y border-gray/10 dark:border-light/10">
              {article.excerpt}
            </div>

            <div className="prose prose-lg max-w-none">
              <Markdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  a: ({ href, children }) =>
                    href?.startsWith("/") ? (
                      <Link href={href}>{children}</Link>
                    ) : (
                      <Link
                        href={href ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </Link>
                    ),
                }}
              >
                {article.content}
              </Markdown>
            </div>
          </div>
        </article>

        <div className="flex items-center justify-center lg:justify-end mx-auto mt-10 lg:mr-10 px-6 py-2">
          <ViewAllBtn href="/news" text="See All Articles" />
        </div>

        <div className="mt-8">
          <RecentNews articles={recentArticles} className="md:grid-cols-2" />
        </div>
      </div>
    </div>
  );
}
