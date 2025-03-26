import React from "react";

interface PageHeadingProps {
  heading: string;
  text?: string;
  className?: string;
}

interface H2TitleProps {
  title: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({
  heading,
  text,
  className = "",
}) => {
  return (
    <div
      className={`${className} w-full text-center flex flex-col items-center justify-center p-1`}
    >
      <h1 className="text-3xl relative mb-4 _912cfm">{heading}</h1>
      <p className="w-full max-w-2xl mx-auto">{text}</p>
    </div>
  );
};

const H2Title: React.FC<H2TitleProps> = ({ title }) => {
  return (
    <h2 className="w-fit text-2xl text-red _912cfm mb-4 pb-2 relative after:absolute after:bottom-0 after:left-0 after:w-[15px] after:border-b-[3px] after:border-red">
      {title}
    </h2>
  );
};

export { PageHeading, H2Title };
