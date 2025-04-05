"use client";
import { useDownload } from "@/app/context/download-context";
import { PiSpinnerBold } from "react-icons/pi";
import { MdCheck } from "react-icons/md";

interface DownloadProps {
  audioUrl: string;
  fileName: string;
}

export default function Download({ audioUrl, fileName }: DownloadProps) {
  const { isDownloading, isDownloadMode, progress, downloadFile } =
    useDownload();

  const handleDownload = () => {
    if (isDownloading) return;
    downloadFile(audioUrl, fileName);
  };

  return (
    <div className="w-fit rounded-sm" title={`Download ${fileName} now`}>
      <div
        role="button"
        tabIndex={isDownloadMode ? -1 : 0}
        aria-disabled={isDownloadMode ? "true" : "false"}
        onClick={() => {
          if (!isDownloadMode && handleDownload) {
            handleDownload();
          }
        }}
        onKeyDown={(e) => {
          if (
            (e.key === "Enter" || e.key === " ") &&
            !isDownloadMode &&
            handleDownload
          ) {
            e.preventDefault();
            handleDownload();
          }
        }}
        className={`mixtape-download-btn text-sm text-center font-medium _912cfm px-2 py-1 rounded-sm focus:outline-none ${
          isDownloadMode ? "cursor-default opacity-80" : "cursor-pointer"
        }`}
      >
        <div className="flex justify-center items-center focus:outline-none">
          {isDownloadMode && !isDownloading ? (
            <PiSpinnerBold size={20} className="fa-spin" />
          ) : isDownloading && progress >= 98 && progress <= 100 ? (
            <MdCheck size={20} className="text-red" />
          ) : (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
                className="opacity-95"
              >
                <g>
                  <path d="M11.99 16l-5.7-5.7L7.7 8.88l3.29 3.3V2.59h2v9.59l3.3-3.3 1.41 1.42-5.71 5.7zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
