import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { markdownComponents } from "../../components/markdown-components";
import ViewTracker from "../../components/view-counter/view-tracker";

interface ArticleContentProps {
  excerpt: string;
  firstHalf: string;
  secondHalf: string;
  slug: string;
}

export function ArticleContent({
  excerpt,
  firstHalf,
  secondHalf,
  slug,
}: ArticleContentProps) {
  return (
    <>
      <div className="mb-6 py-4 italic font-light opacity-[0.85] border-y border-gray/10 dark:border-light/10">
        {excerpt}
      </div>
      <div className="prose prose-lg max-w-none">
        <Markdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
          {firstHalf}
        </Markdown>
        <ViewTracker slug={slug} />
        <Markdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
          {secondHalf}
        </Markdown>
      </div>
    </>
  );
}
