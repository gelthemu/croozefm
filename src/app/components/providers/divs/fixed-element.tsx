"use client";

import React from "react";

interface FixedDivProps {
  className?: string;
  children?: React.ReactNode;
}

const FixedDiv: React.FC<FixedDivProps> = ({ className = "", children }) => {
  return (
    <div
      className={`${className} fixed bottom-1.5 left-1.5 right-1.5 md:left-auto md:right-1.5 md:w-[320px] lg:w-[400px] p-2.5 text-light bg-gray border border-light/10 rounded-md transition-all duration-500 overflow-hidden z-50`}
      role="dialog"
    >
      {children}
    </div>
  );
};

export default FixedDiv;
