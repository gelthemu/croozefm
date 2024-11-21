import React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      {...props}
      className="block py-2.5 pl-2 w-full text-sm text-light/60 font-medium bg-transparent border-0 border-b border-light/60 appearance-none focus:outline-none focus:ring-0 focus:border-red peer"
      placeholder=" "
    />
  );
};

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  ...props
}) => {
  return (
    <label
      {...props}
      className="absolute text-sm text-light/50 duration-300 transform -translate-y-6 scale-85 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    >
      {children}
    </label>
  );
};
