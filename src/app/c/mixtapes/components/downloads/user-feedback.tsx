"use client";

import React from "react";
import { useChat } from "@/app/context/chat-context";
import { useDownload } from "@/app/context/download-context";

interface ViewerBoardProps {
  count: number;
}

const ViewerBoard = ({ count }: ViewerBoardProps) => {
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

const LiveChatBtn = () => {
  const { isChatVisible, toggleChatVisibility, users } = useChat();
  const { progress } = useDownload();

  return (
    <>
      <div className="my-8">
        <div
          role="button"
          tabIndex={isChatVisible ? -1 : 0}
          aria-disabled={isChatVisible ? "true" : "false"}
          onClick={() => {
            if (!isChatVisible && progress === 0 && toggleChatVisibility) {
              toggleChatVisibility();
            }
          }}
          onKeyDown={(e) => {
            if (
              (e.key === "Enter" || e.key === " ") &&
              !isChatVisible &&
              progress === 0 &&
              toggleChatVisibility
            ) {
              e.preventDefault();
              toggleChatVisibility();
            }
          }}
          className={`w-fit mb-4 bg-red text-sm text-light font-medium _912cfm px-3 py-2 rounded-sm focus:outline-none select-none ${
            isChatVisible && progress === 0
              ? "cursor-default opacity-80"
              : "cursor-pointer"
          } ml-1`}
        >
          <span className="">Leave a comment</span>{" "}
        </div>
        <span>
          Jump into the chat and see what other {users.length} croozers are
          saying... Feedback is appreciated.
        </span>
      </div>
    </>
  );
};

export { ViewerBoard, LiveChatBtn };
