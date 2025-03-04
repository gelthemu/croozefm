const FormatCategory = ({ category }: { category: string }): string => {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export { FormatCategory };
