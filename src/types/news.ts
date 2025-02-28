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
