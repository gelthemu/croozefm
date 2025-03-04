export type ShowCategory =
  | "news"
  | "politics"
  | "411"
  | "sports-updates"
  | "business-news";

export interface Show {
  id: string;
  title: string;
  image: string;
  description: string;
  hosts?: {
    name: string;
    link?: string;
  }[];
  isFeatured?: boolean;
  recordings?: {
    id: string;
    date: string;
    audio: string;
    category?: ShowCategory | null;
  }[];
}
