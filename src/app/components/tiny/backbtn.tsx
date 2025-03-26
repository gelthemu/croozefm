"use client";

import { MoveLeft } from "lucide-react";

export default function BackBtn() {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center px-1 py-2.5 text-sm text-gray/80 dark:text-light/60 font-medium"
      aria-label="Go Back"
    >
      <MoveLeft className="mr-2 h-4 w-4" />
      Back
    </button>
  );
}
