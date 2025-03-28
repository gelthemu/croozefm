import React from "react";
import type { PresenterProfile } from "@/types/profile";
import type { Message } from "@/app/context/chat-context";
import MessageTimestamp from "./message-timestamp";
import Mentions from "./mentions-utils";

interface MsgProps {
  message: Message;
  profiles: PresenterProfile[];
}

export default function Msg({ message, profiles }: MsgProps) {
  const color = message.code ? `#${message.code.slice(-6)}` : "red";
  const id = message.code.slice(-4);

  return (
    <div className="w-full p-2 select-text">
      <div className="flex items-start">
        <div
          className={`inline w-4 h-4 aspect-square rounded-full mt-1 mr-1.5`}
          style={{ backgroundColor: color }}
        ></div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="lowercase">
              <span className="font-semibold" style={{ color: color }}>
                {message.username}
              </span>{" "}
              <span className="text-xs opacity-60">{`(${id})`}</span>
            </div>
            <div className="mx-2 font-medium opacity-30">•</div>
            <div className="text-xs font-light">
              <MessageTimestamp timestamp={message.timestamp} />
            </div>
          </div>
          <div className="text-sm">
            <Mentions text={message.text} profiles={profiles} />
          </div>
        </div>
      </div>
    </div>
  );
}
