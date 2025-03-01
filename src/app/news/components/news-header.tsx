import React from "react";

interface NewsHeaderProps {
  title: string;
  subtitle?: string;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="py-8 mb-6 border-b border-gray-200">
      <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="mt-2 text-xl text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default NewsHeader;
