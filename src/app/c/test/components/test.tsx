"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { IoMdSend } from "react-icons/io";
import { useChat } from "@/app/context/chat-context";
import { useSuggestionForm } from "@/app/context/suggestion-form-context";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const TestBtn = () => {
  const { toggleChatVisibility, users } = useChat();

  return (
    <div className={`w-full`}>
      <div className="w-full flex justify-center bg-transparent rounded-sm">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            toggleChatVisibility();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleChatVisibility();
            }
          }}
          className={`btn-xs bg-red text-sm text-light font-medium _912cfm px-3 py-1 rounded-sm focus:outline-none`}
        >
          <span className="">Show Chat</span>{" "}
          {users.length > 0 && (
            <span className="text-sm opacity-80">({users.length})</span>
          )}
        </div>
      </div>
    </div>
  );
};

const SuggestionBtn = () => {
  const { setShowForm } = useSuggestionForm();

  return (
    <div className={`w-full`}>
      <div className="w-full flex justify-center bg-transparent rounded-sm">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setShowForm(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowForm(true);
            }
          }}
          className={`btn-xs bg-red text-sm text-light font-medium _912cfm px-3 py-1 rounded-sm focus:outline-none`}
        >
          <span className="">Show FORM</span>{" "}
        </div>
      </div>
    </div>
  );
};

const AutoExpandingInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    const trimmedMessage = message.trim();

    if (trimmedMessage) {
      console.log("Sending message:", trimmedMessage);
      setMessage("");
    }
  };

  const isMessageEmpty = !message.trim();

  return (
    <div className="w-full p-3 text-sm bg-gray/10 dark:bg-light/5">
      <form
        onSubmit={handleSubmit}
        className="flex items-end space-x-1 p-2 bg-gray/5 dark:bg-light/5 rounded-sm"
      >
        <div className="flex items-center justify-center rounded-full aspect-square cursor-pointer px-1 py-2 focus:outline-none">
          {" "}
          <MdOutlineEmojiEmotions size={22} />
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
            className="w-full p-2 text-sm bg-transparent rounded-sm resize-none focus:outline-none max-h-[80px] overflow-y-auto"
            rows={1}
            maxLength={200}
            style={{ height: "auto" }}
          />
        </div>
        <button
          type="submit"
          className="px-2 py-3 rounded-full focus:outline-none"
          disabled={isMessageEmpty}
        >
          <span>
            <IoMdSend size={18} />
          </span>
        </button>
      </form>
    </div>
  );
};
export { TestBtn, SuggestionBtn, AutoExpandingInput };
