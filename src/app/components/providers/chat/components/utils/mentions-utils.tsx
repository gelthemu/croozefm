import React from "react";
import Link from "next/link";
import { PresenterProfile } from "@/types/profile";
import { HashTag, Hashtags } from "@/data/shows/hashtags";

interface MentionsProps {
  text: string;
  profiles: PresenterProfile[];
}

export default function Mentions({ text, profiles }: MentionsProps) {
  const profileMap = new Map(
    profiles.map((profile) => [
      profile.name.toLowerCase(),
      {
        id: profile.id,
        originalName: profile.name,
      },
    ])
  );

  const profileNames = Array.from(profiles.map((p) => p.name)).sort(
    (a, b) => b.length - a.length
  );

  const escapedNames = profileNames.map((name) =>
    name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  );
  const combinedRegex = new RegExp(
    `(\\b${escapedNames.join("|")}\\b)|(#\\w+)`,
    "gi"
  );

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(match[0]);
    lastIndex = combinedRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  const formattedText = parts.map((part, index) => {
    if (!part) return null;

    if (typeof part === "string" && part.match(/^#\w+$/)) {
      const hashtag = Hashtags.find((ht: HashTag) =>
        ht.tag.some((t) => t.toLowerCase() === part.toLowerCase())
      );

      if (hashtag) {
        const tag = hashtag.tag.find(
          (t) => t.toLowerCase() === part.toLowerCase()
        );

        return (
          <Link
            key={`hashtag-${index}`}
            href={hashtag.url}
            className="text-red rounded-sm bg-gray/5 dark:bg-gray/20 px-1 hover:underline"
          >
            {tag}
          </Link>
        );
      }

      return (
        <span
          key={`hashtag-${index}`}
          className={`text-red rounded-sm bg-gray/5 dark:bg-gray/20 px-1`}
        >
          {part}
        </span>
      );
    }

    const lowerPart = typeof part === "string" ? part.toLowerCase() : "";
    const profileData = profileMap.get(lowerPart);

    if (profileData) {
      return (
        <Link
          key={`${profileData.id}-${index}`}
          href={`/i/${profileData.id}`}
          className="text-[#3eac75] rounded-sm bg-gray/5 dark:bg-gray/20 px-1 hover:underline"
        >
          {profileData.originalName}
        </Link>
      );
    }

    return part;
  });

  return <span>{formattedText}</span>;
}
