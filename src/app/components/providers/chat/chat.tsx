import React from "react";
import { profiles } from "@/lib/profiles-parser";
import ChatUI from "./components/chat-ui";

export default function Chat() {
  return <ChatUI profiles={profiles} />;
}
