"use client";

import React from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { ArrowDownRight } from "lucide-react";
import { usePathname } from "next/navigation";

const STREAM_URL =
  "https://stream-157.zeno.fm/vyxwdk08apxtv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJ2eXh3ZGswOGFweHR2IiwiaG9zdCI6InN0cmVhbS0xNTcuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6InAtVHYyX3dxVHBTSHAxR3VHTm5WSmciLCJpYXQiOjE3Mzk5NzY1NTMsImV4cCI6MTczOTk3NjYxM30.MgiXns9wBFr75T9qfkPBT_Ag8knz34-JaiRTWscFask";

interface StreamButtonProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const StreamButton: React.FC<StreamButtonProps> = ({
  text,
  className = "",
  style = {},
  onClick,
}) => {
  const { isMiniPlayerOpen } = useMiniPlayer();

  return (
    <button
      className={`text-light text-sm font-semibold flex items-center space-x-1 transition-all duration-500 rounded-sm ${className} _912cfm`}
      style={style}
      onClick={onClick}
      disabled={isMiniPlayerOpen}
    >
      <span>{text}</span> <ArrowDownRight className="w-4 h-4" />
    </button>
  );
};

const StreamBtn = () => {
  const { isMiniPlayerOpen, setIsMiniPlayerOpen, setCurrentSource } =
    useMiniPlayer();

  return (
    <StreamButton
      text="Start Streaming, Now"
      className={`px-4 py-2  ${
        isMiniPlayerOpen ? "bg-gray/80 dark:bg-gray/100" : "bg-red"
      }`}
      onClick={() => {
        setCurrentSource(STREAM_URL);
        setIsMiniPlayerOpen(true);
      }}
    />
  );
};

const NavStreamBtn = ({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();
  const { isMiniPlayerOpen, setIsMiniPlayerOpen, setCurrentSource } =
    useMiniPlayer();

  return (
    <StreamButton
      text="Live Radio"
      className={`px-2.5 py-1.5  ${
        isMiniPlayerOpen || pathname === "/"
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      } border border-light/40`}
      style={{
        backgroundImage:
          "linear-gradient(to right,rgba(40, 40, 40, 0.15) 0%,rgb(139, 18, 18) 50%, rgba(40, 40, 40, 0.15) 100%)",
      }}
      onClick={() => {
        setIsOpen(false);
        setCurrentSource(STREAM_URL);
        setIsMiniPlayerOpen(true);
      }}
    />
  );
};

export { StreamBtn, NavStreamBtn };
