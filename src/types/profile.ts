export interface SocialLinks {
  x?: string;
  fb?: string;
  insta?: string;
}

export interface PresenterProfile {
  id: string;
  name: string;
  showHosted: string;
  imageLink: string;
  isPopular: boolean;
  socialLinks: SocialLinks;
  description: string;
  gallery?: string[] | null;
  code: string;
  mixtapeCode?: string | null;
  keywords?: string | null;
}
