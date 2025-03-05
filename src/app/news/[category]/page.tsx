import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { news } from "@/data/news";
import NewsHeader from "../components/news-header";
import CategoryFilter from "../components/category-filter";
import NewsList from "../components/news-list";
import { getAllCategories, getNewsByCategory } from "@/lib/news-parser";
import { NewsCategory } from "@/types/news";
import XNewsButton from "../news-archive/components/news-btn";
import NewsArchive from "../news-archive/components/news-archive";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import { FormatCategory } from "@/app/components/tiny/formatCategoryDisplay";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  const validCategories = getAllCategories();
  if (!validCategories.includes(category as NewsCategory)) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title:
      category === "411"
        ? `${FormatCategory({
            category,
          })} - Entertainment | News - 91.2 Crooze FM`
        : `${FormatCategory({ category })} | News - 91.2 Crooze FM`,
    description: `Browse all our news articles tagged with ${category}`,
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const validCategories = getAllCategories();
  if (!validCategories.includes(category as NewsCategory)) {
    notFound();
  }

  const articles = getNewsByCategory(category as NewsCategory);
  const categories = getAllCategories();

  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(b.aired.date).getTime() - new Date(a.aired.date).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen overflow-hidden">
      <div className="sm:flex items-center justify-between max-w-6xl mx-auto">
        <NewsHeader
          title={
            category === "411"
              ? `${FormatCategory({ category })} - Entertainment`
              : `${FormatCategory({ category })}`
          }
        />
        <CategoryFilter
          categories={categories}
          currentCategory={category as NewsCategory}
        />
      </div>

      <div className="my-12 flex flex-col lg:flex-row lg:justify-center gap-8 xl:gap-10 max-w-6xl mx-auto">
        <NewsList articles={articles} />
        <div className="lg:mt-6">
          <h3 className="w-fit text-xl text-red font-light mb-6 pb-2.5 relative after:absolute after:bottom-0 after:left-0 after:w-1/2 after:border-b-2 after:border-red/80">
            Don&apos;t Miss a Bulletin
          </h3>
          <NewsArchive news={sortedNews.slice(0, 2)} data={news} />
          <div className="flex items-center justify-center mx-auto mt-10 px-6 py-2">
            <ViewAllBtn
              href="/news/news-archive"
              text="See The Entire Playlist"
            />
          </div>
        </div>
      </div>

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
