import { getAllNewsSlugs } from "@/lib/news-parser";

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}
