import React from "react";
import { NewsArticle } from "@/types/news";
import JsonLd from "@/app/components/providers/feed/json-ld";
import { formatEpochToTimezone } from "@/app/components/tiny/format-date";
import { RESOURCES, MEDIA } from "@/data/endpoints";

export default function ArticleJsonLd({ article }: { article: NewsArticle }) {
  const authorObj = {
    "@type": "Person",
    name: article.author ? article.author : "Gelthem Mucunguzi",
  };
  const date = formatEpochToTimezone(article.publication_date);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    url: `https://cfm.geltaverse.com/news/article/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "CFM Pulse",
      url: "https://cfm.geltaverse.com/",
      logo: {
        "@type": "ImageObject",
        url: `${RESOURCES}/default.png`,
      },
      sameAs: ["https://x.com/cfmpulse", "https://instagram.com/cfmpulse"],
    },
    author: authorObj,
    name: "CFM Pulse",
    logo: {
      "@type": "ImageObject",
      url: `${MEDIA}/cfm-pulse-official-logo.png`,
    },
    datePublished: date,
    dateModified: date,
    description: article.excerpt,
    headline: article.headline,
    image: {
      "@type": "ImageObject",
      width: 1800,
      height: 945,
      url: article.image_url,
    },
    thumbnailUrl: article.image_url,
    mainEntityOfPage: {
      "@type": "Article",
      "@id": `https://cfm.geltaverse.com/news/article/${article.slug}`,
    },
    articleBody: article.excerpt,
    keywords: article.keywords,
    articleSection: article ? "Bookmarks" : "",
    identifier: `https://cfm.geltaverse.com/news/article/${article.slug}`,
    contentRating: "Rated for 18+",
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: "Gelthem Mucunguzi",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://cfm.geltaverse.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
    </>
  );
}
