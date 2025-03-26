import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsHeader from "../components/news-header";
import CategoryFilter from "../components/category-filter";
import NewsList from "../components/news-list";
import { getAllCategories, getNewsByCategory } from "@/lib/news-parser";
import { NewsCategory } from "@/types/news";
import { FormatCategory } from "@/app/components/tiny/formatCategoryDisplay";
import Divider from "@/app/components/providers/divs/divider";
import NewsFooter from "../components/news-footer";
import { BannerAd, RectangleAd } from "@/app/components/providers/ads/ads";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  const validCategories = getAllCategories();
  if (!validCategories.includes(category as NewsCategory)) {
    return {
      title: "Content Not Found",
    };
  }

  return {
    title:
      category === "411" ? "Entertainment" : `${FormatCategory({ category })}`,
    description: `Browse all our news articles under the ${category} category`,
    keywords: `${category}, Crooze FM news, 91.2 Crooze Fm, Western Uganda, News, Crooze Fm news, Crooze Fm updates, Crooze Fm latest news, Crooze Fm 411, Crooze Fm Archive, Crooze Fm local news, Crooze Fm headlines, Crooze Fm media`,
    alternates: {
      canonical: `https://croozefm.geltaverse.com/news/${category}`,
    },
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
    <>
      <div className="w-full sm:w-[95%] sm:mx-auto max-w-[740px] text-left">
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
      <Divider />
      <NewsFooter />
      <div className="pt-6">
        <RectangleAd />
        <BannerAd />
      </div>
    </>
  );
}
