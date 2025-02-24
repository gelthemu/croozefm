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
  }[];
}
