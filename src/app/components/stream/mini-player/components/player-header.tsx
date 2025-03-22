import { FaChevronDown } from "react-icons/fa";

interface PlayerHeaderProps {
  tagLine?: string;
  isCollapse: boolean;
  toggleCollapse: () => void;
}

export default function PlayerHeader({
  tagLine,
  isCollapse,
  toggleCollapse,
}: PlayerHeaderProps) {
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleCollapse}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleCollapse();
          }
        }}
        aria-label="Close"
        className="mb-2 flex flex-row items-center justify-between focus:outline-none"
      >
        <div className="px-1 text-left text-sm font-medium">
          <span className="font-semibod line-clamp-1">{tagLine}</span>
        </div>{" "}
        <div
          className={`p-1 flex justify-center items-center cursor-pointer ${
            isCollapse ? "" : "rotate-180"
          } focus:outline-none`}
        >
          <FaChevronDown size={12} />
        </div>{" "}
      </div>
    </>
  );
}
