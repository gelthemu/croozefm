"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NewsTag } from "@/types/news";
import { useShuffledArray } from "@/app/components/tiny/fisher-yates-shuffle";

interface TagFilterProps {
  tags: NewsTag[];
  currentTag?: NewsTag | null;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, currentTag = null }) => {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState<NewsTag | null>(currentTag);
  const [isOpen, setIsOpen] = useState(false);
  const seed = new Date().toDateString();
  const allTags = useShuffledArray(tags, seed);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const dropmenu = document.getElementById("dropmenu-absolute");
      const menuButton = document.querySelector(
        "[data-collapse-toggle='dropmenu-absolute']"
      );

      if (
        isOpen &&
        dropmenu &&
        !dropmenu.contains(e.target as Node) &&
        menuButton &&
        !menuButton.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [currentTag, isOpen]);

  useEffect(() => {
    setActiveTag(currentTag);
  }, [currentTag]);

  const handleTagChange = (tag: NewsTag | null) => {
    setActiveTag(tag);
    setIsOpen(false);

    if (tag === null) {
      router.push("/news");
    } else {
      router.push(`/news/${tag}`);
    }
  };

  const formatTagDisplay = (tag: string): string => {
    return tag
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex-shrink-0 px-1 text-sm text-left">
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full sm:w-64 px-4 py-2.5 border-y border-dark/20 dark:border-light/20 flex items-center justify-between font-medium cursor-pointer"
          data-collapse-toggle="dropmenu-absolute"
        >
          <span>{activeTag ? formatTagDisplay(activeTag) : "All Topics"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-500 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div
          className={`absolute z-10 w-full sm:w-64 bg-red rounded-b-sm
                     transition-all duration-300 ease-in-out overflow-hidden
                     ${
                       isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                     } text-sm`}
          id="dropmenu-absolute"
        >
          <div className="px-5 py-4 text-light font-normal">
            <div
              className="py-2.5 hover:px-4 hover:bg-light/15 border-b border-light/30 cursor-pointer transition-all duration-500"
              onClick={() => handleTagChange(null)}
            >
              All
            </div>
            <div className="divide-y divide-light/30">
              {" "}
              {allTags.map((tag) => (
                <div
                  key={tag}
                  className="py-2.5 hover:px-4 hover:bg-light/15 cursor-pointer transition-all duration-500"
                  onClick={() => handleTagChange(tag)}
                >
                  {tag ? formatTagDisplay(tag) : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagFilter;
