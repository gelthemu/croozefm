import React from "react";

interface NewsHeaderProps {
  title: string;
}

export default function NewsHeader({ title }: NewsHeaderProps) {
  return (
    <div className="mb-8 sm:mb-0">
      <h1 className="text-3xl text-left relative _912cfm line-clamp-1">
        {title}
      </h1>
    </div>
  );
}
