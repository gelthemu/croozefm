export interface Anchor {
  name: string;
  link?: string;
  img: string;
}

export interface News {
  id: number;
  aired: {
    date: string;
    time: string;
  };
  headline: string;
  anchor: Anchor;
  audio: string;
}

export type NewsCategory =
  | "news"
  | "politics"
  | "411"
  | "sports-updates"
  | "business-news"
  | "news-archive";

export interface NewsArticle {
  slug: string;
  headline: string;
  publication_date: number;
  excerpt: string;
  category: NewsCategory | null;
  keywords?: string | null;
  content: string;
  image_url: string | null;
  author: string | null;
  source: string | null;
  isPinned?: boolean;
}
