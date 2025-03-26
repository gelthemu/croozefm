import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NewsArticle, NewsCategory } from "@/types/news";

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
      headline: data.headline as string,
      publication_date: data.publication_date as number,
      excerpt: data.excerpt as string,
      category: (data.category as NewsCategory) || null,
      keywords: (data.keywords as string) || null,
      content,
      image_url: (data.image_url as string) || null,
      author: (data.author as string) || null,
      source: (data.source as string) || null,
      isPinned: data.isPinned as boolean,
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

    return news.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      return new Date(b.publication_date) > new Date(a.publication_date)
        ? 1
        : -1;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function getNewsByCategory(category: NewsCategory): NewsArticle[] {
  const allNews = getAllNewsArticles();
  return allNews.filter((news) => news.isPinned || news.category === category);
}

export function getRecentNews(count: number): NewsArticle[] {
  const allNews = getAllNewsArticles();
  return allNews.slice(0, count);
}

export function getAllCategories(): NewsCategory[] {
  const allNews = getAllNewsArticles();
  const categorySet = new Set<NewsCategory>();

  allNews.forEach((news) => {
    if (news.category) {
      categorySet.add(news.category);
    }
  });

  return Array.from(categorySet);
}
