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

export type NewsTag =
  | "news"
  | "politics"
  | "411"
  | "sports-updates"
  | "business-news";

export interface NewsArticle {
  slug: string;
  title: string;
  date: number;
  excerpt: string;
  tag: NewsTag | null;
  content: string;
  coverImage: string | null;
  author: string | null;
}
