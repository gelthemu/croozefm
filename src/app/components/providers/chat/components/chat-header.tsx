import { X } from "lucide-react";

interface ChatHeaderProps {
  hideChat: () => void;
  users: string[];
}

export default function ChatHeader({ hideChat, users }: ChatHeaderProps) {
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={hideChat}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && hideChat()}
        aria-label="Hide Chat"
        className="mb-2 flex items-center justify-between cursor-pointer focus:outline-none"
      >
        <div className="flex items-center">
          <h3 className="font-semibold _912cfm">
            <span className="text-red">Live Chat</span>{" "}
            <span className="text-sm opacity-60">({users.length})</span>
          </h3>
        </div>
        <div className="flex items-center">
          <div className="w-6 aspect-square flex items-center justify-center">
            {<X size={18} />}
          </div>
        </div>
      </div>
    </>
  );
}
