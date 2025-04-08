"use client";

import { useState, useEffect } from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { useDownload } from "@/app/context/download-context";
import { PiSpinnerBold } from "react-icons/pi";
import { MdCheck } from "react-icons/md";

interface DownloadProps {
  audioUrl: string;
  fileName: string;
  sronly?: boolean;
}

export default function Download({
  audioUrl,
  fileName,
  sronly = false,
}: DownloadProps) {
  const {
    isDownloading,
    isDownloadMode,
    isPaused,
    progress,
    downloadFile,
    currentFile,
  } = useDownload();
  const { isLoading, setIsCollapse, setIsAnimating } = useMiniPlayer();

  const [isThisDownloading, setIsThisDownloading] = useState(false);
  const [isThisComplete, setIsThisComplete] = useState(false);

  useEffect(() => {
    const isActiveDownload = isDownloadMode && currentFile === audioUrl;
    setIsThisDownloading(isActiveDownload);

    if (isActiveDownload && isDownloading && progress >= 98) {
      setIsThisComplete(true);

      setTimeout(() => {
        setIsThisComplete(false);
        setIsThisDownloading(false);
      }, 4000);
    }
  }, [isDownloading, isDownloadMode, progress, currentFile, audioUrl]);

  const handleDownload = () => {
    setIsAnimating(true);
    if (isDownloading) return;
    downloadFile(audioUrl, fileName);
    setIsCollapse(false);
  };

  return (
    <div className="w-fit rounded-sm" title={`Download ${fileName}`}>
      <div
        role="button"
        tabIndex={isThisDownloading || isLoading ? -1 : 0}
        aria-disabled={isThisDownloading || isLoading ? "true" : "false"}
        onClick={() => {
          if (!isLoading && !isThisDownloading && handleDownload) {
            handleDownload();
          }
        }}
        onKeyDown={(e) => {
          if (
            (e.key === "Enter" || e.key === " ") &&
            (!isLoading || !isThisDownloading) &&
            handleDownload
          ) {
            e.preventDefault();
            handleDownload();
          }
        }}
        className={`mixtape-download-btn text-sm text-center font-medium _912cfm px-2 py-1 rounded-sm select-none focus:outline-none ${
          isThisDownloading || isLoading
            ? "cursor-default opacity-80"
            : "cursor-pointer"
        }`}
      >
        <div className="flex justify-center items-center focus:outline-none">
          {isThisDownloading && !isThisComplete ? (
            <>
              <PiSpinnerBold size={20} className="fa-spin" />
              {!sronly && (
                <span className="ml-1 text-sm">
                  {isPaused ? "Download Paused" : "In progress"}
                </span>
              )}
            </>
          ) : isThisComplete ? (
            <>
              <MdCheck size={20} className="text-red" />{" "}
              {!sronly && <span className="ml-1 text-sm">Complete</span>}
            </>
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
              </svg>{" "}
              {!sronly && <span className="ml-1 text-sm">Download</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
