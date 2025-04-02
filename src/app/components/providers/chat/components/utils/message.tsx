import React from "react";
import type { PresenterProfile } from "@/types/profile";
import type { Message } from "@/app/context/chat-context";
import MessageTimestamp from "./message-timestamp";
import Mentions from "./mentions-utils";
import { ColorCircle } from "./color-circle";
import { AdminBadge } from "./emoji-picker";
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
    <div className="w-full py-2">
      <div className="flex items-start">
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
            className={`w-4 h-4 aspect-square rounded-full mt-1 mr-1.5 flex-shrink-0`}
            style={{ backgroundColor: color }}
          ></div>
        )}
        <div className="flex flex-col">
          <div className="flex items-center">
            <div
              className={`${
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
                <span className="font-medium" style={{ color: color }}>
                  {message.username}
                </span>
              )}{" "}
              {message.username !== "ADMIN" && (
                <span className="text-xs opacity-60">{`(${id})`}</span>
              )}
            </div>
            <div className="mx-2 font-medium opacity-30 select-none">•</div>
            <div className="text-xs font-light">
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
