import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NewsArticle, NewsTag } from "@/types/news";

const newsDirectory = path.join(process.cwd(), "src", "data", "articles");

export function getAllNewsSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(newsDirectory);
    return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function getNewsArticle(slug: string): NewsArticle | null {
  const fullPath = path.join(newsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const newsArticle: NewsArticle = {
      slug,
      title: data.title as string,
      date: data.date as number,
      excerpt: data.excerpt as string,
      tag: (data.tag as NewsTag) || null,
      content,
      coverImage: (data.coverImage as string) || null,
      author: (data.author as string) || null,
    };

    return newsArticle;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getAllNewsArticles(): NewsArticle[] {
  try {
    const slugs = getAllNewsSlugs();
    const news = slugs
      .map((slug) => getNewsArticle(slug))
      .filter((article): article is NewsArticle => article !== null);

    return news.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  } catch (error) {
    console.error(error);
    return [];
  }
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
