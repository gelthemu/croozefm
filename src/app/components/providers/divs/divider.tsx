import React from "react";

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = "" }) => {
  return (
    <div
      className={`${
        className ? `${className}` : "my-12"
      } w-full h-0 border-t border-dark/20 dark:border-light/20`}
      role="dialog"
    ></div>
  );
};

export default Divider;
