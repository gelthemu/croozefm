import { useEffect, useRef, useState } from "react";
import type { PresenterProfile } from "@/types/profile";
import type { Message } from "@/app/context/chat-context";
import { Bell } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Msg from "./utils/message";

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
  profiles: PresenterProfile[];
}

export default function MessageList({
  messages,
  currentUsername,
  profiles,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const prevMessagesLengthRef = useRef(messages.length);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const newMessagesCount = messages.length - prevMessagesLengthRef.current;

    const shouldAutoScroll =
      !isUserScrolling ||
      isAtBottom(container) ||
      (newMessagesCount > 0 &&
        messages[messages.length - 1]?.username === currentUsername);

    if (shouldAutoScroll) {
      container.scrollTop = container.scrollHeight;
      setUnreadCount(0);
    } else if (newMessagesCount > 0) {
      const newUnreadMessages = messages
        .slice(prevMessagesLengthRef.current)
        .filter((msg) => msg.username !== currentUsername);

      setUnreadCount((prev) => prev + newUnreadMessages.length);
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages, isUserScrolling, currentUsername]);

  const isAtBottom = (element: HTMLElement) => {
    const threshold = 30;
    return (
      element.scrollHeight - element.scrollTop - element.clientHeight <
      threshold
    );
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isAtBottom(container)) {
      setIsUserScrolling(true);
    } else {
      setIsUserScrolling(false);
      setUnreadCount(0);
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      setUnreadCount(0);
      setIsUserScrolling(false);
    }
  };

  return (
    <div className="h-full relative">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto overscroll-none scrollbar-hide scroll-smooth px-3 py-1"
        onScroll={handleScroll}
      >
        <div className="h-full relative divide-y divide-gray/10 dark:divide-gray/60">
          {messages.length === 0 ? (
            <div className="relative w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center p-2">
              <p className="text-center text-sm opacity-90">JOIN</p>
              <p className="text-center text-sm opacity-90">
                Create a Username
              </p>
              <p className="text-center text-sm opacity-90">Start Chatting</p>
              <p className="absolute bottom-0 font-light text-sm italic opacity-60 mt-2">
                By CFM Fans, for CFM Diehards
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id}>
                <Msg message={message} profiles={profiles} />
              </div>
            ))
          )}
        </div>
      </div>
      {/* {unreadCount > 0 && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-2 right-4 text-light focus:outline-none"
        >
          <span className="w-8 h-8 bg-gray/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md animate-wiggle">
            <Bell size={16} />
          </span>
          <span className="absolute -top-2 -end-1 translate-x-1/4 text-nowrap px-1 py-0.5 min-w-5 rounded-full text-center text-xs bg-red rounded-full">
            <span className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-red/40 w-full h-full"></span>
            {unreadCount}
          </span>
        </button>
      )} */}
      <div className="absolute bottom-1 right-2 flex flex-row items-center space-x-1.5">
        <div
          role="button"
          tabIndex={0}
          aria-label={`CFM Pulse WhatsApp Channel`}
          onClick={() => {
            window.open(
              "https://whatsapp.com/channel/0029Vb8mMX78aKvKCmxMsj1y",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              window.open(
                "https://whatsapp.com/channel/0029Vb8mMX78aKvKCmxMsj1y",
                "_blank",
                "noopener,noreferrer"
              );
            }
          }}
          className="w-6 h-6 flex items-center justify-center text-light bg-[#25D366] backdrop-blur-md rounded-full"
        >
          <FaWhatsapp size={14} />
        </div>
        {unreadCount > 0 && (
          <button
            onClick={scrollToBottom}
            className="relative text-light focus:outline-none"
          >
            <span className="w-8 h-8 bg-gray/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md animate-wiggle">
              <Bell size={16} />
            </span>
            <span className="absolute -top-2 -end-0 translate-x-1/4 text-nowrap px-1 py-0.5 min-w-5 rounded-full text-center text-xs bg-red rounded-full">
              <span className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-red/40 w-full h-full"></span>
              {unreadCount}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
