"use client";

import React, { useEffect } from "react";
import type { PresenterProfile } from "@/types/profile";
import { useChat } from "@/app/context/chat-context";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import FixedDiv from "../../divs/fixed-element";
import UsernameForm from "./username-form";
import ChatHeader from "./chat-header";
import MessageList from "./message-list";
import MessageInput from "./message-input";

interface ChatUIProps {
  profiles: PresenterProfile[];
}

export default function ChatUI({ profiles }: ChatUIProps) {
  const {
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
  const { isCollapse, setIsCollapse, setIsAnimating } = useMiniPlayer();

  const showUsernameForm = !username && isUsernameFormVisible && isChatVisible;
  const showChatContent = username && !isUsernameFormVisible && isChatVisible;
  const showWelcomeBack = username && isWelcomeBackMode && isChatVisible;

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (isChatVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatVisible, toggleChatVisibility]);

  const hideChat = () => {
    toggleChatVisibility();

    if (isCollapse) {
      setIsCollapse(false);
      setIsAnimating(true);
    } else {
      setIsCollapse(true);
    }
  };

  return (
    <FixedDiv
      className={`${
        isChatVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      } transition-all duration-[0.6s]`}
    >
      <div className="h-full w-full flex flex-col rounded-md overflow-hidden">
        <div className="relative mx-2 my-1 select-none">
          <ChatHeader hideChat={hideChat} users={users} />{" "}
          {isChatVisible && (
            <div className="flex flex-col h-full rounded-b-md border border-gray/10 dark:border-light/10 bg-light/5 dark:bg-dark/10 backdrop-blur-sm overflow-hidden">
              <div className="h-[240px] flex flex-col">
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
                    username={username}
                    onSendMessage={sendMessage}
                    isConnected={isConnected}
                    onLeaveChat={leaveChat}
                    isCollapse={isCollapse}
                    setIsCollapse={setIsCollapse}
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
                        className="bg-[#3eac75] text-light font-medium _912cfm px-3 py-1 rounded-md focus:outline-none"
                      >
                        {`Hi, ${username.split(" ")[0]}! Start Chatting..`}
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
                        className="bg-red text-light font-medium _912cfm px-3 py-1 rounded-md focus:outline-none"
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
      </div>
    </FixedDiv>
  );
}
