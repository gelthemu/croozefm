import React from "react";
import type { PresenterProfile } from "@/types/profile";
import type { Message } from "@/app/context/chat-context";
import MessageTimestamp from "./message-timestamp";
import Mentions from "./mentions-utils";
import { ColorCircle } from "./color-circle";
import { AdminBadge, UserBadge } from "./emoji-picker";
import Image from "next/image";

interface MsgProps {
  message: Message;
  profiles: PresenterProfile[];
}

export default function Msg({ message, profiles }: MsgProps) {
  const color =
    message.username === "ADMIN"
      ? "red"
      : message.code
      ? ColorCircle(message.code)
      : "red";

  const id = message.code.slice(-4);

  return (
    <div className="w-full py-2 text-sm">
      <div className="w-full flex items-start">
        {message.username === "ADMIN" ? (
          <Image
            src="https://geltaverse.com/io/favicon.ico"
            alt="Geltaverse.com"
            width={60}
            height={60}
            className="w-4 h-4 rounded-sm mt-1 mr-1.5 flex-shrink-0 aspect-square _img_"
          />
        ) : (
          <div
            className={`w-4 h-4 aspect-square rounded-sm mt-1 mr-1.5 flex-shrink-0`}
            style={{ backgroundColor: color }}
          ></div>
        )}
        <div className="w-full flex flex-col overflow-hidden">
          <div className="w-full flex items-center overflow-hidden">
            <div
              className={`flex items-center min-w-0 ${
                message.username === "ADMIN" ? "uppercase" : "lowercase"
              }`}
            >
              {message.username === "ADMIN" ? (
                <>
                  <span className="font-bold text-sm" style={{ color: color }}>
                    {message.username}
                  </span>
                  <span>
                    <AdminBadge />
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="font-bold overflow-hidden whitespace-nowrap text-sm text-ellipsis flex-grow"
                    style={{ color: color }}
                  >
                    {message.username}
                  </span>
                  <span className="text-xs opacity-60 flex-shrink-0 ml-1">
                    {`(${id})`}
                  </span>
                  <span className="flex-shrink-0" style={{ color: color }}>
                    <UserBadge />
                  </span>
                </>
              )}
            </div>
            <div className="mx-2 font-medium opacity-30 select-none flex-shrink-0">
              •
            </div>
            <div className="text-xs font-light flex-shrink-0">
              <MessageTimestamp timestamp={message.timestamp} />
            </div>
          </div>
          <div className="text-sm select-text">
            <Mentions text={message.text} profiles={profiles} />
          </div>
        </div>
      </div>
    </div>
  );
}
