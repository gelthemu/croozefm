import React from "react";
import ShareArticle from "../../components/share-article";
import { SmUnit, MdUnit } from "@/app/components/providers/units/units";

interface ArticleFooterProps {
  title: string;
  slug: string;
}

export function ArticleFooter({ title, slug }: ArticleFooterProps) {
  return (
    <>
      <div className="mb-10 mx-6 pt-8 border-t border-dashed border-dark/40 dark:border-light/40">
        <ShareArticle title={title} slug={slug} />
      </div>
      <div>
      <SmUnit />
      <MdUnit />
      </div>
    </>
  );
}
