export interface Mixtape {
  id: number;
  title: string;
  image?: string;
  url: string;
  dj?: {
    name: string;
    link?: string;
  }[];
}
