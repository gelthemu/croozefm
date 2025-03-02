import React from "react";

interface NewsHeaderProps {
  title: string;
  className?: string;
}

export default function NewsHeader({ title, className }: NewsHeaderProps) {
  return (
    <div className="mb-8 sm:mb-0">
      <h1 className={`${className} text-3xl relative _912cfm line-clamp-1`}>
        {title}
      </h1>
    </div>
  );
}
