"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function WindowUrl() {
  const pathname = usePathname();
  const baseURL = "https://cfm.geltaverse.com";
  return `${baseURL}${pathname === "/" ? "" : pathname}`;
}

export function CanonicalUrl() {
  const canonicalUrl = WindowUrl();

  useEffect(() => {
    let link = document.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
  }, [canonicalUrl]);

  return null;
}
