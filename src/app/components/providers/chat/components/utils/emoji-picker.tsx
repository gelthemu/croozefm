import React from "react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const emojis = ["❤️", "🥳", "👏🏼", "🎶", "📻", "🔥"];

  return (
    <div className="bg-light dark:bg-dark rounded-md shadow shadow-gray/40 dark:shadow-light/20 p-2">
      <div className="flex flex-wrap spaace-x-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className="h-8 w-8 flex items-center justify-center text-lg hover:bg-gray/20 rounded cursor-pointer transition-colors focus:outline-none"
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
