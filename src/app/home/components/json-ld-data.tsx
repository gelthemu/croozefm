"use client";

import React from "react";
import { WindowUrl } from "./canonical-url";
import JsonLd from "@/app/components/providers/feed/json-ld";
import { RESOURCES, MEDIA } from "@/data/endpoints";

interface PageJsonLdProps {
  description?: string;
  keywords?: string;
  name?: string;
}

export default function PageJsonLd({
  description = "CFM Pulse is the largest Crooze FM Fan Base. Home to Fans of Western Uganda's Biggest Radio Station.",
  keywords = "cfm pulse, crooze fm, western uganda, 91.2 crooze fm, crooze fm online",
  name = "CFM Pulse",
}: PageJsonLdProps) {
  const url = WindowUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: url,
    publisher: {
      "@type": "Organization",
      name: "CFM Pulse",
      url: "https://cfm.geltaverse.com/",
      logo: {
        "@type": "ImageObject",
        url: `${RESOURCES}/default.png`,
      },
      sameAs: ["https://x.com/cfmpulse", "https://instagram.com/cfmpulse"],
    },
    author: {
      "@type": "Person",
      name: "Gelthem Mucunguzi",
      url: "https://geltaverse.com/",
    },
    name: name,
    logo: {
      "@type": "ImageObject",
      url: `${MEDIA}/cfm-pulse-official-logo.png`,
    },
    dateCreated: "2009-04-23T20:40:42.000Z",
    description: description,
    thumbnailUrl: `${MEDIA}/cfm-pulse-official-logo.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: keywords,
    identifier: url,
    contentRating: "Rated for 18+",
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: "Gelthem Mucunguzi",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://geltaverse.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={jsonLd} />;
}
