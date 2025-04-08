export interface DJ {
  code: string;
  name: string;
  link?: string;
}

export interface Mixtape {
  id: number;
  title: string;
  url: string;
  d_url: string;
  dj: DJ;
}
