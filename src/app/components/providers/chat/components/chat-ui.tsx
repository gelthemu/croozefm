"use client";

import React from "react";
import type { PresenterProfile } from "@/types/profile";
import { useChat } from "@/app/context/chat-context";
import { useDownload } from "@/app/context/download-context";
import FixedDiv from "../../divs/fixed-element";
import UsernameForm from "./username-form";
import ChatHeader from "./chat-header";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import { ColorCircle } from "./utils/color-circle";

interface ChatUIProps {
  profiles: PresenterProfile[];
}

export default function ChatUI({ profiles }: ChatUIProps) {
  const {
    userId,
    username,
    messages,
    isConnected,
    isChatVisible,
    isUsernameFormVisible,
    isWelcomeBackMode,
    setUsername,
    sendMessage,
    toggleChatVisibility,
    toggleUsernameForm,
    leaveChat,
    startChat,
    users,
  } = useChat();
  const { progress } = useDownload();

  const showUsernameForm = !username && isUsernameFormVisible && isChatVisible;
  const showChatContent = username && !isUsernameFormVisible && isChatVisible;
  const showWelcomeBack = username && isWelcomeBackMode && isChatVisible;

  const hideChat = () => {
    toggleChatVisibility();
  };

  const color = userId ? ColorCircle(userId) : "#3eac75";

  return (
    <FixedDiv
      className={`${
        isChatVisible && progress === 0
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      } transition-all duration-[0.6s] overscroll-none`}
    >
      <div className="relative mx-2 my-1 select-none">
        <ChatHeader hideChat={hideChat} users={users} />{" "}
        {isChatVisible && (
          <div className="flex flex-col h-full rounded-sm border border-gray/10 dark:border-light/10 bg-light/5 dark:bg-dark/10 backdrop-blur-sm overflow-hidden">
            <div className="h-[320px] md:h-[280px] flex flex-col">
              <MessageList
                messages={messages}
                currentUsername={username}
                profiles={profiles}
              />
            </div>
            {showUsernameForm && (
              <div className="flex-shrink-0">
                <UsernameForm onSubmit={setUsername} />
              </div>
            )}
            {showChatContent && !isWelcomeBackMode && (
              <div className="flex-shrink-0">
                <MessageInput
                  code={userId}
                  username={username}
                  onSendMessage={sendMessage}
                  isConnected={isConnected}
                  onLeaveChat={leaveChat}
                />
              </div>
            )}
            {showWelcomeBack && (
              <div className="w-full text-sm mt-auto">
                <div className="p-3 bg-gray/10 dark:bg-light/5">
                  <div className="w-full flex justify-end">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={startChat}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") && startChat()
                      }
                      className="text-light font-medium _912cfm px-3 py-1 rounded-sm focus:outline-none"
                      style={{ backgroundColor: color }}
                    >
                      {`Hi, ${
                        username.split(" ")[0].charAt(0).toUpperCase() +
                        username.split(" ")[0].slice(1).toLowerCase()
                      }! Start Chatting..`}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!username && !isUsernameFormVisible && !isWelcomeBackMode && (
              <div className="w-full text-sm mt-auto">
                <div className="p-3 bg-gray/10 dark:bg-light/5">
                  <div className="w-full flex justify-end">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={toggleUsernameForm}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        toggleUsernameForm()
                      }
                      className="bg-red text-light font-medium _912cfm px-3 py-1 rounded-sm focus:outline-none"
                    >
                      {`Join Chat`}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </FixedDiv>
  );
}
