import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsHeader from "../components/news-header";
import CategoryFilter from "../components/category-filter";
import NewsList from "../components/news-list";
import { getAllCategories, getNewsByCategory } from "@/lib/news-parser";
import { NewsCategory } from "@/types/news";
import XNewsButton from "../news-archive/components/news-btn";
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
      description:
        "Welcome to Home of Western Uganda's Biggest Radio Station. 91.2 Crooze FM. Great Music, Great Friends. Stream Live Radio. Hit Music. Current News Daily",
    };
  }

  return {
    title:
      category === "411"
        ? `${FormatCategory({
            category,
          })} - Entertainment / Crooze FM`
        : `${FormatCategory({ category })} | News - 91.2 Crooze FM`,
    description: `Browse all our news articles tagged with ${category}`,
    keywords:
      "Crooze FM news, Crooze FM categories, Crooze FM updates, Crooze FM breaking news, Crooze FM local news, Crooze FM entertainment news, Crooze FM sports news, Crooze FM weather updates, Crooze FM traffic reports, Crooze FM community news, Crooze FM radio news, Crooze FM latest stories, Crooze FM news archive, Crooze FM headlines, Crooze FM daily news",
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

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen overflow-hidden">
      <div className="w-full sm:w-[95%] sm:mx-auto max-w-[720px] text-left">
        <div className="flex flex-col">
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

        <div className="my-10 flex flex-col">
          <NewsList articles={articles} />
        </div>
      </div>

      <div className="text-center  pt-10 flex flex-col items-center justify-center border-t border-dark/10 dark:border-light/10">
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
