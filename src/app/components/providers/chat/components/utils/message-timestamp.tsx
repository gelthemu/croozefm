"use client";

import { useEffect, useState } from "react";
import { formatTimestamp } from "./format-timestamp";

interface MessageProps {
  timestamp: number;
}

const MessageTimestamp: React.FC<MessageProps> = ({ timestamp }) => {
  const [formattedTime, setFormattedTime] = useState<string>(
    formatTimestamp(timestamp)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(formatTimestamp(timestamp));
    }, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span className="text-xs font-light opacity-60">{formattedTime}</span>;
};

export default MessageTimestamp;
