"use client";

import React from "react";

export default function XNewsButton() {
  const handleClick = () => {
    window.open(
      "https://x.com/hashtag/CroozeFMNews?src=hashtag_click&f=live",
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="bg-custom-gradient-btn text-light text-sm font-medium px-4 py-2 rounded-md"
    >
      Click here to view the Latest Crooze FM News on X
    </button>
  );
}
