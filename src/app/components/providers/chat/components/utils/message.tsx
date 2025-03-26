import React from "react";
import type { Message } from "@/app/context/chat-context";
import MessageTimestamp from "./message-timestamp";

interface MsgProps {
  message: Message;
  currentUsername: string;
}

export default function Msg({ message, currentUsername }: MsgProps) {
  const isCurrentUser = message.username === currentUsername;

  return (
    <div className={`w-full rounded-md p-2`}>
      <div className="inline">
        {isCurrentUser ? (
          <>
            <span className="text-sm font-semibold lowercase">
              {message.username}
            </span>
            <span className="mx-2 font-medium opacity-30">{"•"}</span>
            <span className="text-sm font-light opacity-60">(You)</span>
          </>
        ) : (
          <span className="text-sm font-semibold lowercase">
            {message.username}
          </span>
        )}
        <span className="mx-2 font-medium opacity-30">{"•"}</span>
        <span className="text-xs font-light">
          <MessageTimestamp timestamp={message.timestamp} />
        </span>
        <span className="mx-2 font-medium opacity-10">{"•"}</span>
        <span className="text-sm inline">{message.text}</span>
      </div>
    </div>
  );
}
