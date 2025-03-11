import { NewsCategory } from "@/types/news";

export interface Show {
  id: string;
  name: string;
  summary?: string;
  isPop?: boolean;
  isFt?: boolean;
  host?: {
    name: string;
    link?: string;
  }[];
  recs?: {
    id: number;
    url: string;
    category?: NewsCategory | null;
    name?: string | null;
    cover?: string | null;
  }[];
  time: {
    start: number;
    end: number;
  };
}
