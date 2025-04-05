"use client";

import React from "react";

interface ViewerBoardProps {
  count: number;
}

const TestBtn = ({ count }: ViewerBoardProps) => {
  return (
    <div className="mixtape-view-counter flex items-center px-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
      >
        <g>
          <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
        </g>
      </svg>
      <span className="view-count ml-1 text-sm">{count}</span>
    </div>
  );
};

export default TestBtn;
