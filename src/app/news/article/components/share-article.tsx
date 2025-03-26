"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "next-share";

interface ShareArticleProps {
  title: string;
  description?: string;
  baseUrl?: string;
  iconSize?: number;
  round?: boolean;
  className?: string;
  slug?: string;
}

const ShareArticle: React.FC<ShareArticleProps> = ({
  title,
  baseUrl = typeof window !== "undefined" ? window.location.origin : "",
  iconSize = 26,
  round = true,
  className = "",
  slug,
}) => {
  const pathname = usePathname();
  const articleSlug = slug || pathname?.split("/").pop() || "";
  const shareUrl = `${baseUrl}/news/article/${articleSlug}`;

  return (
    <div className={`flex space-x-2 items-center ${className}`}>
      <span className="text-sm font-medium opacity-[0.75] mr-1">Share:</span>

      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={iconSize} round={round} />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={iconSize} round={round} />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={title} separator=" | ">
        <WhatsappIcon size={iconSize} round={round} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareArticle;
