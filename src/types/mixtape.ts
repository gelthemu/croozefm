export interface DJ {
  code: string;
  name: string;
  link?: string;
}

export interface Mixtape {
  id: number;
  title: string;
  url: string;
  azureUrl: string;
  dj: DJ;
}
