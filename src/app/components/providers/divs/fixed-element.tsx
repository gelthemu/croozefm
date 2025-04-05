"use client";

import React from "react";

interface FixedDivProps {
  className?: string;
  children?: React.ReactNode;
  color?: string;
}

const FixedDiv: React.FC<FixedDivProps> = ({
  className = "",
  children,
  color = "",
}) => {
  return (
    <div
      className={`${className} fixed bottom-1.5 left-1.5 right-1.5 sm:left-auto sm:right-1.5 sm:w-[320px] lg:w-[420px] p-2 text-dark dark:text-light bg-light/80 dark:bg-dark/90 backdrop-blur-sm border ${
        color === "turquoise" ? "border-turquoise" : "border-red/80"
      } rounded-sm overflow-hidden z-50`}
      role="dialog"
    >
      {children}
    </div>
  );
};

export default FixedDiv;
