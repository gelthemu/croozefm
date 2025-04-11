import { Metadata } from "next";
import { getNewsArticle } from "@/lib/news-parser";
import { formatEpochToTimezone } from "@/app/components/tiny/format-date";
import { RESOURCES } from "@/data/endpoints";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);

  if (!article) {
    return { title: "Story Not Found" };
  }

  return {
    title: `${article.headline}`,
    description: article.excerpt,
    keywords: `cfm pulse, ${article.keywords}, western uganda, news, crooze fm news, crooze fm 411, crooze fm headlines, sports updates, politics`,
    openGraph: {
      title: `${article.headline}`,
      description: article.excerpt,
      type: "article",
      publishedTime: formatEpochToTimezone(article.publication_date),
      url: `https://cfm.geltaverse.com/news/article/${article.slug}`,
      images: article.image_url
        ? [
            {
              url: article.image_url,
              alt: `${article.headline} - CFM Pulse`,
              width: 1200,
              height: 630,
            },
          ]
        : article.isPinned
        ? [
            {
              url: `${RESOURCES}/cfm-weekly-mixtape.png`,
              alt: "Crooze FM brings you the CFM Weekly Mixtape every Wednesday",
              width: 1200,
              height: 630,
            },
          ]
        : [
            {
              url: `${RESOURCES}/default-opengraph.png`,
              alt: "Home to Fans of Western Uganda's Biggest Radio Station",
              width: 1200,
              height: 630,
            },
          ],
    },
    twitter: {
      title: `${article.headline}`,
      description: article.excerpt,
      card: "summary_large_image",
      site: "@geltaverse",
      creator: "@geltaverse",
      images: article.image_url
        ? [
            {
              url: article.image_url,
              alt: `${article.headline} - CFM Pulse`,
            },
          ]
        : article.isPinned
        ? [
            {
              url: `${RESOURCES}/cfm-weekly-mixtape.png`,
              alt: "Crooze FM brings you the CFM Weekly Mixtape every Wednesday",
              width: 1200,
              height: 630,
            },
          ]
        : [
            {
              url: `${RESOURCES}/default-opengraph.png`,
              alt: "Home to Fans of Western Uganda's Biggest Radio Station",
            },
          ],
    },
    other: {
      "article:published_time": formatEpochToTimezone(article.publication_date),
      "article:modified_time": formatEpochToTimezone(article.publication_date),
    },
  };
}
