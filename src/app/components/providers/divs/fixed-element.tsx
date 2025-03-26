"use client";

import React from "react";

interface FixedDivProps {
  className?: string;
  children?: React.ReactNode;
}

const FixedDiv: React.FC<FixedDivProps> = ({ className = "", children }) => {
  return (
    <div
      className={`${className} fixed bottom-1.5 left-1.5 right-1.5 md:left-auto md:right-1.5 md:w-[320px] lg:w-[420px] p-2 text-dark dark:text-light bg-light/80 dark:bg-dark/90 backdrop-blur-sm border border-red/80 rounded-lg overflow-hidden z-50`}
      role="dialog"
    >
      {children}
    </div>
  );
};

export default FixedDiv;
