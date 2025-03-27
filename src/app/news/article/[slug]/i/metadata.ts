import { Metadata } from "next";
import { getNewsArticle } from "@/lib/news-parser";

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
    keywords: `91.2 Crooze Fm, Western Uganda, ${article.keywords}, News, Crooze Fm news, Crooze Fm updates, Crooze Fm latest news, Crooze Fm 411, Crooze Fm Archive, Crooze Fm local news, Crooze Fm headlines, Crooze Fm media`,
    openGraph: {
      title: `${article.headline}`,
      description: article.excerpt,
      type: "website",
      url: `https://croozefm.geltaverse.com/news/article/${article.slug}`,
      images: article.image_url
        ? [
            {
              url: article.image_url,
              alt: `${article.headline} - Crooze FM News, Western Uganda`,
              width: 1200,
              height: 630,
            },
          ]
        : article.isPinned
        ? [
            {
              url: "https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png",
              alt: "Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday.",
              width: 1200,
              height: 630,
            },
          ]
        : [
            {
              url: "https://croozefm.blob.core.windows.net/images/news.png",
              alt: "Crooze FM News, Western Uganda. Home of Western Uganda's Biggest Radio Station.",
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
              alt: `${article.headline} - Crooze FM News, Western Uganda`,
            },
          ]
        : article.isPinned
        ? [
            {
              url: "https://croozefm.blob.core.windows.net/images/cfm-weekly-mixtape.png",
              alt: "Western Uganda's Biggest Radio Station brings you the Crooze FM Weekly Mixtape every Wednesday.",
              width: 1200,
              height: 630,
            },
          ]
        : [
            {
              url: "https://croozefm.blob.core.windows.net/images/default.png",
              alt: "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
            },
          ],
    },
    alternates: {
      canonical: `https://croozefm.geltaverse.com/news/article/${article.slug}`,
    },
  };
}
