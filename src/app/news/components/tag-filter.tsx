import React from "react";
import Link from "next/link";
import { NewsTag } from "@/types/news";

interface TagFilterProps {
  tags: NewsTag[];
  currentTag?: NewsTag;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, currentTag }) => {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      <Link
        href="/news"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentTag
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        All
      </Link>

      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/news/${tag}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentTag === tag
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default TagFilter;
