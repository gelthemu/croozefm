import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import { getNewsArticle, getRecentNews } from "@/lib/news-parser";
import RecentNews from "../../components/recent-news";
import SubmitArticle from "@/app/home/components/submit-anything";
import { splitMarkdownContent } from "@/lib/markdown-utils";
import { calculateReadingTime } from "@/lib/reading-time";
import ViewDisplay from "../components/view-counter/view-display";
import { getArticleViewCount } from "../components/view-counter/view-counter";
import { ArticleHeader } from "./i/header";
import { ArticleContent } from "./i/content";
import { ArticleFooter } from "./i/footer";
import Divider from "@/app/components/providers/divs/divider";
import NewsFooter from "../../components/news-footer";
import "@/app/styles/md/profile.css";
import ArticleJsonLd from "./i/json-ld-data";

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
    category,
    content,
    image_url,
    author,
    source,
    isPinned,
  } = article;

  const initialViewCount = await getArticleViewCount(slug);
  const { readingTime } = calculateReadingTime(content);
  const [firstHalf, secondHalf] = splitMarkdownContent(content);
  const recentArticles = getRecentNews(6)
    .filter((a) => a.slug !== slug && !a.isPinned)
    .slice(0, 4);

  return (
    <>
      <Head>
        <ArticleJsonLd article={article} />
      </Head>
      <div className="w-full sm:w-[95%] mx-auto text-left">
        <div className="mb-4 flex items-center justify-between md:text-xs font-light opacity-50">
          <small>{readingTime} read</small>
          <small>
            <ViewDisplay slug={slug} initialCount={initialViewCount} />
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
            <ArticleHeader
              headline={headline}
              image_url={image_url}
              category={category}
              author={author}
              source={source}
              publication_date={publication_date}
              isPinned={isPinned}
            />
            <ArticleContent
              firstHalf={firstHalf}
              secondHalf={secondHalf}
              slug={slug}
            />
          </div>
          <ArticleFooter title={headline} slug={slug} />
        </article>
        <div className="my-10 space-y-6">
          <SubmitArticle
            title="Got a Scoop We Missed?"
            text={`Found a news-worthy article we haven't covered? Submit the link in a text message and we'll scrape it. Don't be selfish—share the story with us, we wanna read it too!`}
          />
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

export { generateMetadata } from "./i/metadata";
export { generateStaticParams } from "./i/params";
