import React, { useState, useEffect, useRef } from "react";

interface Item {
  name: string;
  link: string;
}

interface MentionHashtagFormatterProps {
  text: string;
  popularPresenters: Item[];
  hashtags: Item[];
  onSelect: (selectedText: string) => void;
  mentionClassName?: string;
  hashtagClassName?: string;
}

const MentionHashtagFormatter: React.FC<MentionHashtagFormatterProps> = ({
  text,
  popularPresenters,
  hashtags,
  onSelect,
  mentionClassName = "text-blue-500 font-medium",
  hashtagClassName = "text-blue-500 font-medium",
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Item[]>([]);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Handle suggestion display
  useEffect(() => {
    const words = text.split(/\s+/);
    const lastWord = words[words.length - 1];

    if (lastWord?.startsWith("@") && lastWord.length > 1) {
      const query = lastWord.slice(1).toLowerCase();
      const filtered = popularPresenters.filter((p) =>
        p.name.toLowerCase().includes(query)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else if (lastWord?.startsWith("#") && lastWord.length > 1) {
      const query = lastWord.slice(1).toLowerCase();
      const filtered = hashtags.filter((h) =>
        h.name.toLowerCase().includes(query)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [text, popularPresenters, hashtags]);

  // Format text for display with highlighting
  const formatForDisplay = () => {
    const parts = text.split(/(?=@\w+)|(?=#\w+)/g);

    return parts.map((part, index) => {
      if (part.match(/@\w+/)) {
        return (
          <span key={index} className={mentionClassName}>
            {part}
          </span>
        );
      } else if (part.match(/#\w+/)) {
        return (
          <span key={index} className={hashtagClassName}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleSuggestionClick = (item: Item) => {
    const words = text.split(/\s+/);
    words[words.length - 1] =
      item.name.startsWith("@") || item.name.startsWith("#")
        ? item.name
        : text.slice(-1) === "@"
        ? `@${item.name}`
        : `#${item.name}`;
    const newText = words.join(" ") + " ";
    onSelect(newText);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <span>{formatForDisplay()}</span>
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionRef}
          className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto"
          style={{ bottom: "100%", left: 0 }}
        >
          {suggestions.map((item) => (
            <div
              key={item.name}
              onClick={() => handleSuggestionClick(item)}
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Export the formatter function for sending
export const formatMessageForSending = (
  text: string,
  popularPresenters: Item[],
  hashtags: Item[]
) => {
  return text
    .replace(/(@\w+)/g, (match) => {
      const presenter = popularPresenters.find((p) =>
        p.name.toLowerCase().includes(match.slice(1).toLowerCase())
      );
      return presenter ? `<a href="${presenter.link}">${match}</a>` : match;
    })
    .replace(/(#\w+)/g, (match) => {
      const hashtag = hashtags.find((h) =>
        h.name.toLowerCase().includes(match.slice(1).toLowerCase())
      );
      return hashtag ? `<a href="${hashtag.link}">${match}</a>` : match;
    });
};

export default MentionHashtagFormatter;
