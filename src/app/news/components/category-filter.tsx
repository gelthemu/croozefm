"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NewsCategory } from "@/types/news";
import { useShuffledArray } from "@/app/components/tiny/fisher-yates-shuffle";
import { FormatCategory } from "@/app/components/tiny/formatCategoryDisplay";
import { ArchiveIcon } from "lucide-react";

interface CategoryFilterProps {
  categories: NewsCategory[];
  currentCategory?: NewsCategory | null;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  currentCategory = null,
}) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<NewsCategory | null>(
    currentCategory
  );
  const [isOpen, setIsOpen] = useState(false);
  const seed = new Date().toDateString();
  const allCategories = useShuffledArray(categories, seed);

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
  }, [currentCategory, isOpen]);

  useEffect(() => {
    setActiveCategory(currentCategory);
  }, [currentCategory]);

  const handleCategoryChange = (category: NewsCategory | null) => {
    setActiveCategory(category);
    setIsOpen(false);

    if (category === null) {
      router.push("/news");
    } else if (category === "news-archive") {
      router.push("/news/news-archive");
    } else {
      router.push(`/news/${category}`);
    }
  };

  return (
    <div className="px-1 text-sm text-left">
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full md:w-96 px-4 py-2.5 border-b flex items-center justify-between font-semibold cursor-pointer"
          data-collapse-toggle="dropmenu-absolute"
        >
          <span>
            {activeCategory ? (
              <FormatCategory category={activeCategory} />
            ) : (
              "All Topics"
            )}
          </span>
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
          className={`absolute z-10 w-full md:w-96 bg-red/80 backdrop-blur-md rounded-b-sm
                     transition-all duration-300 ease-in-out overflow-hidden
                     ${
                       isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                     } text-sm`}
          id="dropmenu-absolute"
        >
          <div className="px-5 py-4 text-light font-normal">
            <div
              className="py-2.5 hover:px-4 hover:bg-light/15 border-b border-light/30 cursor-pointer transition-all duration-500"
              onClick={() => handleCategoryChange(null)}
            >
              <span>All</span>
            </div>
            <div className="divide-y divide-light/30">
              {" "}
              {allCategories.map((category) => (
                <div
                  key={category}
                  className="py-2.5 hover:px-4 hover:bg-light/15 cursor-pointer transition-all duration-500"
                  onClick={() => handleCategoryChange(category)}
                >
                  <span>
                    {category ? <FormatCategory category={category} /> : ""}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="py-2.5 hover:px-4 hover:bg-light/15 border-t border-light/30 cursor-pointer transition-all duration-500"
              onClick={() => handleCategoryChange("news-archive")}
            >
              <span className="flex items-center justify-between">
                <span>News Archive</span>
                <ArchiveIcon size={16} className="opacity-[0.8]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
