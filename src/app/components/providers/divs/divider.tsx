import React from "react";

interface DividerProps {
  className?: string;
  opacity?: string;
}

const Divider: React.FC<DividerProps> = ({ className = "", opacity = "" }) => {
  return (
    <div
      className={`${className ? `${className}` : "my-12"} ${
        opacity ? `${opacity}` : ""
      } w-full h-0 border-t border-dark/20 dark:border-light/20 select-none`}
    ></div>
  );
};

export default Divider;
