import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { EmojiPicker } from "./utils/emoji-picker";
import { ColorCircle } from "./utils/color-circle";

interface MessageInputProps {
  code: string;
  username: string;
  onSendMessage: (message: string) => void;
  isConnected: boolean;
  onLeaveChat: () => void;
}

export default function MessageInput({
  code,
  username,
  onSendMessage,
  isConnected,
  onLeaveChat,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiBtnRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const color = code ? ColorCircle(code) : "red";

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [message]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
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
            aria-label="Leave Chat"
            onClick={() => {
              onLeaveChat();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onLeaveChat();
              }
            }}
            className="text-sm text-red font-medium cursor-pointer px-2 py-1 focus:outline-none"
          >
            {"Leave Chat"}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative flex items-end space-x-1 p-2 bg-gray/5 dark:bg-light/5 rounded-sm"
        >
          <div
            role="button"
            tabIndex={0}
            ref={emojiBtnRef}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setShowEmojiPicker(!showEmojiPicker);
            }}
            className="flex items-center justify-center rounded-full aspect-square cursor-pointer p-2 focus:outline-none opacity-80"
            title="Insert emoji"
          >
            <MdOutlineEmojiEmotions size={20} />
          </div>

          <div className="overflow-hidden flex-1">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                if (input.value.length > 200) {
                  input.value = input.value.slice(0, 200);
                }
              }}
              required
              placeholder="Say something..."
              className="w-full p-1 text-sm bg-transparent rounded-sm resize-none focus:outline-none max-h-[60px] overflow-y-auto"
              rows={1}
              maxLength={200}
              style={{ height: "auto" }}
            />
          </div>
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-full right-0 w-full mb-1 z-10"
            >
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </div>
          )}
          <div>
            <button
              aria-label="Send message"
              type="submit"
              disabled={!message.trim() || !isConnected}
              className="p-2 rounded-full text-red disabled:text-gray dark:disabled:text-light/40 focus:outline-none"
            >
              <span>
                <IoMdSend size={20} />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
