import React from "react";
import Link from "next/link";
import { H2Title } from "@/app/components/providers/divs/page-heading";
import Image from "next/image";
import { getRecentNews } from "@/lib/news-parser";
import { FormatSimpleDate } from "@/app/components/tiny/format-date";
import ViewAllBtn from "@/app/components/tiny/viewallbtn";
import SubmitArticle from "./submit-article";

const RecentNews: React.FC = () => {
  const articles = getRecentNews(10)
    .filter((article) => article.image_url)
    .slice(0, 7);

  return (
    <div className="text-left">
      <div className="-mb-0.5 font-light text-sm opacity-80 dark:opacity-60">
        <span className="uppercase">NEWS PIECES, FROM THE WEB</span>
      </div>
      <div className="mb-8">
        <H2Title title={"Read Something Today..."} />
      </div>
      <div className="space-y-3">
        {articles.length > 0 && (
          <div className="group relative overflow-hidden rounded-sm bg-gradient-to-br from-gray/10 to-gray/5 dark:from-light/10 dark:to-light/5">
            <div className="flex flex-col md:flex-row items-center p-2">
              {articles[0].image_url ? (
                <div className="relative w-full md:w-1/2 h-[280px] rounded-sm overflow-hidden">
                  <Image
                    src={articles[0].image_url}
                    alt={articles[0].headline}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale-[0.5] _img_"
                  />
                </div>
              ) : null}
              <div className="flex-1 px-2 pt-4 pb-2 md:px-4">
                <span className="inline-block px-2 py-1 mb-3 md:mb-4 text-xs text-light font-semibold bg-red rounded-sm select-none">
                  Latest Index
                </span>
                <Link href={`/news/article/${articles[0].slug}`}>
                  <h3 className="text-lg font-bold group-hover:underline decoration-red/60 transition-all duration-500">
                    {articles[0].headline}
                  </h3>
                </Link>
                <p className="text-sm opacity-80 mt-3 md:mt-4">
                  <FormatSimpleDate epoch={articles[0].publication_date} />
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {articles.slice(1).map((article) => (
            <div
              key={article.slug}
              className="group p-1.5 bg-gray/10 dark:bg-light/5 rounded-sm overflow-hidden"
            >
              <Link
                href={`/news/article/${article.slug}`}
                className="flex flex-row justify-center"
              >
                {article.image_url ? (
                  <div className="mr-2.5 flex-shrink-0 relative overflow-hidden w-[120px] overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center bg-transparent bg-blend-multiply"
                      style={{
                        aspectRatio: "1.5 / 1",
                        backgroundImage: `url("https://placehold.co/600x400/transparent/png?text=CFM+Pulse")`,
                      }}
                    >
                      <Image
                        src={article.image_url}
                        alt=""
                        width={600}
                        height={400}
                        className="w-full object-cover rounded-sm aspect-[1.5/1] grayscale-[0.5] _img_"
                      />{" "}
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-col justify-between">
                  <h3 className="text-sm font-semibold mb-2 line-clamp-3 group-hover:underline decoration-red/60 transition-all duration-500">
                    {article.headline}
                  </h3>
                  <p className="text-xs opacity-60">
                    <FormatSimpleDate epoch={article.publication_date} />
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end mx-auto mt-6">
        <ViewAllBtn href="/news" text="Follow The News" />
      </div>

      <div>
        <SubmitArticle />
      </div>
    </div>
  );
};

export default RecentNews;
