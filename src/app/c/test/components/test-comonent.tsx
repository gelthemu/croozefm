"use client";

import React from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { useChat } from "@/app/context/chat-context";

const TestBtn = () => {
  const { isLoading } = useMiniPlayer();
  const { toggleChatVisibility, users } = useChat();

  return (
    <div className={`w-full my-10`}>
      <div className="w-full flex justify-center bg-transparent rounded-sm">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            toggleChatVisibility();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleChatVisibility();
            }
          }}
          className={`btn-xs bg-red text-sm text-light font-medium _912cfm px-3 py-1 rounded-sm focus:outline-none ${
            isLoading
              ? "opacity-0 -translate-x-full"
              : "opacity-100 translate-x-0"
          } transition-all duration-[0.4s]`}
        >
          <span className="">Show Chat</span>{" "}
          {users.length > 0 && (
            <span className="text-sm opacity-80">({users.length})</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestBtn;
