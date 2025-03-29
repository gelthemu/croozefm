import { X } from "lucide-react";

interface ChatHeaderProps {
  hideChat: () => void;
  users: string[];
}

export default function ChatHeader({ hideChat, users }: ChatHeaderProps) {
  return (
    <>
      <div className="group mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="font-semibold _912cfm">
            <span className="text-red">Live Chat</span>{" "}
            {users.length > 0 && (
              <span className="text-sm opacity-80">({users.length})</span>
            )}
          </h3>
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={hideChat}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && hideChat()}
          aria-label="Hide Chat"
          className="flex items-center justify-center cursor-pointer focus:outline-nones"
        >
          <div className="w-6 aspect-square flex items-center justify-center group-hover:rotate-180 transition duration-300">
            {<X size={18} />}
          </div>
        </div>
      </div>
    </>
  );
}
