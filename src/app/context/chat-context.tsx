"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { database } from "@/lib/firebase";
import {
  ref,
  onValue,
  push,
  set,
  serverTimestamp,
  query,
  limitToLast,
} from "firebase/database";

const CHAT_USERNAME = "chat_username";

export interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: number;
}

export interface FirebaseMessage {
  username: string;
  text: string;
  timestamp: number;
}

export interface ChatContextType {
  username: string;
  userId: string;
  messages: Message[];
  isConnected: boolean;
  isChatVisible: boolean;
  isUsernameFormVisible: boolean;
  isWelcomeBackMode: boolean;

  setUsername: (username: string) => void;
  sendMessage: (text: string) => void;
  toggleChatVisibility: () => void;
  toggleUsernameForm: () => void;
  leaveChat: () => void;
  startChat: () => void;
}

const INITIAL_STATE: Omit<
  ChatContextType,
  | "setUsername"
  | "sendMessage"
  | "toggleChatVisibility"
  | "toggleUsernameForm"
  | "leaveChat"
  | "startChat"
> = {
  username: "",
  userId: "",
  messages: [],
  isConnected: false,
  isChatVisible: false,
  isUsernameFormVisible: false,
  isWelcomeBackMode: false,
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState({
    ...INITIAL_STATE,
  });

  useEffect(() => {
    const savedUserInfo = Cookies.get(CHAT_USERNAME);
    if (savedUserInfo) {
      const [savedUsername, savedUserId] = savedUserInfo
        .split("|")
        .map((part) => part.split(":")[1]);

      setState((prevState) => ({
        ...prevState,
        username: savedUsername,
        userId: savedUserId,
        isWelcomeBackMode: true,
        isConnected: true,
      }));
    }
  }, []);

  useEffect(() => {
    const messagesRef = query(ref(database, "messages"), limitToLast(20));

    const unsubscribe = onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        setState((prevState) => ({
          ...prevState,
          messages: data
            ? Object.entries(data as Record<string, FirebaseMessage>)
                .map(([id, message]) => ({
                  id,
                  ...message,
                }))
                .sort((a, b) => a.timestamp - b.timestamp)
            : prevState.messages,
          isConnected: true,
        }));
      },
      (error) => {
        console.error("Firebase error:", error);
        setState((prevState) => ({ ...prevState, isConnected: false }));
      }
    );

    return () => unsubscribe();
  }, []);

  const setUsername = (inputUsername: string) => {
    if (!inputUsername.trim()) {
      alert("Please enter a username");
      return;
    }

    const newUserId = uuidv4().replace(/-/g, "").toLowerCase();

    Cookies.set(CHAT_USERNAME, `name:${inputUsername}|id:${newUserId}`, {
      expires: 30,
    });

    setState((prevState) => ({
      ...prevState,
      username: inputUsername,
      userId: newUserId,
      isUsernameFormVisible: false,
      isWelcomeBackMode: false,
      isConnected: true,
    }));
  };

  const sendMessage = (text: string) => {
    const { username, userId } = state;

    if (!text.trim() || !username) return;

    const messagesRef = ref(database, "messages");
    const newMessage = {
      username: userId ? `${username} (${userId.slice(-4)})` : username,
      text: text.trim(),
      timestamp: serverTimestamp(),
    };

    const newMessageRef = push(messagesRef);
    set(newMessageRef, newMessage);
  };

  const toggleChatVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      isChatVisible: !prevState.isChatVisible,
    }));
  };

  const toggleUsernameForm = () => {
    setState((prevState) => ({
      ...prevState,
      isUsernameFormVisible: !prevState.isUsernameFormVisible,
      isWelcomeBackMode: false,
    }));
  };

  const leaveChat = () => {
    Cookies.remove(CHAT_USERNAME);

    toggleChatVisibility();

    setState((prevState) => ({
      ...INITIAL_STATE,
      messages: prevState.messages,
    }));
  };

  const startChat = () => {
    setState((prevState) => ({
      ...prevState,
      isWelcomeBackMode: false,
    }));
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        setUsername,
        sendMessage,
        toggleChatVisibility,
        toggleUsernameForm,
        leaveChat,
        startChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
