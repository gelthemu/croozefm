import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { markdownComponents } from "../../components/markdown-components";
import ViewTracker from "../../components/view-counter/view-tracker";

interface ArticleContentProps {
  firstHalf: string;
  secondHalf: string;
  slug: string;
}

export function ArticleContent({
  firstHalf,
  secondHalf,
  slug,
}: ArticleContentProps) {
  return (
    <>
      <div className="prose prose-lg max-w-none border-t border-gray/10 dark:border-light/10 pt-6">
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
