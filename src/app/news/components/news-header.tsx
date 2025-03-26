import React from "react";

interface NewsHeaderProps {
  title: string;
  className?: string;
}

export default function NewsHeader({ title, className }: NewsHeaderProps) {
  return (
    <div className="mb-8">
      <h1
        className={`w-fit ${className} text-3xl _912cfm line-clamp-1 pb-4 relative after:absolute after:bottom-0 after:left-0 after:w-[30px] after:border-b-[3px] after:border-red`}
      >
        {title}
      </h1>
    </div>
  );
}
