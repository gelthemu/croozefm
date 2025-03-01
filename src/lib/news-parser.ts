import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NewsArticle, NewsTag } from "@/types/news";

const newsDirectory = path.join(process.cwd(), "src", "data", "news");

export function getAllNewsSlugs(): string[] {
  const fileNames = fs.readdirSync(newsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getNewsArticle(slug: string): NewsArticle {
  const fullPath = path.join(newsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const newsArticle: NewsArticle = {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tag: (data.tag as NewsTag) || null,
    content,
    coverImage: (data.coverImage as string) || null,
    author: data.author as string,
  };

  return newsArticle;
}

export function getAllNewsArticles(): NewsArticle[] {
  const slugs = getAllNewsSlugs();
  const news = slugs.map((slug) => getNewsArticle(slug));
  return news.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}

export function getNewsByTag(tag: NewsTag): NewsArticle[] {
  const allNews = getAllNewsArticles();
  return allNews.filter((news) => news.tag === tag);
}

export function getRecentNews(count: number): NewsArticle[] {
  const allNews = getAllNewsArticles();
  return allNews.slice(0, count);
}

export function getAllTags(): NewsTag[] {
  const allNews = getAllNewsArticles();
  const tagsSet = new Set<NewsTag>();

  allNews.forEach((news) => {
    if (news.tag) {
      tagsSet.add(news.tag);
    }
  });

  return Array.from(tagsSet);
}
