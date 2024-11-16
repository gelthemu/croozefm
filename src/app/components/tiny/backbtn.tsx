"use client";

import { MoveLeft } from "lucide-react";

export default function BackBtn() {
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center text-light/50"
    >
      <MoveLeft className="mr-2 h-4 w-4" />
      Back
    </button>
  );
}
