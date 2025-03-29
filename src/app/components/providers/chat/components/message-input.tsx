import { useState, useRef, useEffect } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import {EmojiPicker} from "./utils/emoji-picker";
import { ColorCircle } from "./utils/color-circle";

interface MessageInputProps {
  code: string;
  username: string;
  onSendMessage: (message: string) => void;
  isConnected: boolean;
  onLeaveChat: () => void;
  isCollapse: boolean;
  setIsCollapse: (value: boolean) => void;
}

export default function MessageInput({
  code,
  username,
  onSendMessage,
  isConnected,
  onLeaveChat,
  isCollapse,
  setIsCollapse,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiBtnRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const color = code ? ColorCircle(code) : "red";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !isConnected) return;

    onSendMessage(message);
    setMessage("");
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiBtnRef.current &&
        !emojiBtnRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full text-sm">
      <div className="p-3 bg-gray/10 dark:bg-light/5">
        <div className="mb-1 flex items-center justify-between space-x-2">
          <div className="font-semibold capitalize" style={{ color: color }}>
            {username}
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              onLeaveChat();
              if (isCollapse) {
                setIsCollapse(false);
              } else {
                setIsCollapse(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onLeaveChat();
                if (isCollapse) {
                  setIsCollapse(false);
                } else {
                  setIsCollapse(true);
                }
              }
            }}
            className="text-sm text-red font-medium cursor-pointer px-2 py-1 focus:outline-none"
          >
            {"Leave Chat"}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
          <div className="w-full flex flex-col relative">
            <div className="flex space-x-1">
              <div className="flex-1 flex flex-col">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mb-0.5 w-full bg-transparent border-b-2 border-gray/50 dark:border-light/50 rounded-sm focus:outline-none p-1"
                  placeholder="Say something..."
                  maxLength={200}
                />
                <div className="text-xs self-end opacity-50">
                  {message.length}/200
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                ref={emojiBtnRef}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setShowEmojiPicker(!showEmojiPicker);
                }}
                className="flex items-center justify-center rounded-full aspect-square cursor-pointer p-1 focus:outline-none"
                title="Insert emoji"
              >
                <MdOutlineEmojiEmotions size={22} />
              </div>{" "}
            </div>

            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-full right-0 mb-1 z-10"
              >
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
          <div className="self-end">
            <button
              aria-label="Send message"
              type="submit"
              disabled={!message.trim() || !isConnected}
              className="w-fit flex items-center space-x-1 text-red disabled:text-gray dark:disabled:text-light/40 font-semibold _912cfm p-2 rounded-md focus:outline-none"
            >
              <span>Send</span>
              <span>
                <IoMdSend size={18} />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
