import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  getAllNewsSlugs,
  getNewsArticle,
  getRecentNews,
} from "@/lib/news-parser";
import RecentNews from "../../components/recent-news";
import { formatDate } from "@/lib/date-formatter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = getNewsArticle(slug);

    return {
      title: article.title,
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
      title: "Article Not Found",
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
  const recentArticles = getRecentNews(4).filter((a) => a.slug !== slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/news"
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to News
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        {article.coverImage && (
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="mb-6">
            {article.tag && (
              <Link href={`/news/${article.tag}`}>
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mb-2">
                  {article.tag}
                </span>
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center">
                <span className="font-medium">{article.author}</span>
              </div>
              <span>{formatDate(article.date)}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <div className="mt-12">
        <RecentNews articles={recentArticles} />
      </div>
    </div>
  );
}
