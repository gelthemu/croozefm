import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/types/news";

interface RecentNewsProps {
  articles: NewsArticle[];
}

const RecentNews: React.FC<RecentNewsProps> = ({ articles }) => {
  return (
    <div className="bg-gray-50 p-2 rounded-lg">
      <h3 className="w-fit text-2xl text-red font-light mb-4 pb-2.5 relative after:absolute after:bottom-0 after:left-0 after:w-1/2 after:border-b-2 after:border-red/80">
        Recent News
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/news/article/${article.slug}`}
            className="flex items-center gap-3 p-1 bg-gray/10 dark:bg-light/10 rounded-sm"
          >
            {article.coverImage && (
              <div className="relative rounded-sm overflow-hidden w-[72px] flex-shrink-0">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  width={600}
                  height={400}
                  priority={true}
                  className="w-full h-full object-cover aspect-[1/1] sm:aspect-[1.5/1] grayscale-[0.85] _img_"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-2">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentNews;
