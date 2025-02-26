"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMiniPlayer } from "@/app/context/mini-player-context";
import { StreamButton } from "./stream-btn";
import { Download, Check } from "lucide-react";

export default function MixtapeDownloadBtn() {
  const DOWNLOAD_MIXTAPE_URL =
    "https://croozefm.com/wp-content/uploads/2025/02/Crooze-FM-Weekly-Mixtapes-DJ-Emma-Vol-1-19th-Feb-2025_01.mp3";

  const {
    isMiniPlayerOpen,
    setIsMiniPlayerOpen,
    currentSource,
    setCurrentSource,
    setIsStreaming,
    setTagLine,
  } = useMiniPlayer();
  const [isDownloading, setIsDownloading] = useState(false);
  const isActive = isMiniPlayerOpen && currentSource === DOWNLOAD_MIXTAPE_URL;

  const getFilename = (url: string) => {
    const match = url.match(/\/([^\/]+)\.mp3$/);
    return match ? `${match[1].toLowerCase()}.mp3` : "cfm-weekly-mixtape.mp3";
  };

  const MIXTAPE_NAME = getFilename(DOWNLOAD_MIXTAPE_URL);

  const handleDownload = async () => {
    if (isDownloading) return;

    if (isActive) {
      setIsMiniPlayerOpen(false);
    } else {
      setCurrentSource(DOWNLOAD_MIXTAPE_URL);
      setIsStreaming(false);
      setIsMiniPlayerOpen(true);
    }

    try {
      setIsDownloading(true);

      setTagLine(`Downloading: ${MIXTAPE_NAME}`);
      const response = await fetch(DOWNLOAD_MIXTAPE_URL);
      // const response = await fetch(
      //   `/api/download?url=${encodeURIComponent(DOWNLOAD_MIXTAPE_URL)}`,
      //   {
      //     credentials: "include",
      //   }
      // );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = DOWNLOAD_MIXTAPE_URL;
      a.download = MIXTAPE_NAME;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      toast.error("Download failed... sorry!!!", { autoClose: 2000 });
      setTagLine(`NP: ${MIXTAPE_NAME}`);
    } finally {
      setIsDownloading(false);
      setTagLine(`NP: ${MIXTAPE_NAME}`);
    }
  };

  return (
    <StreamButton
      className="text-[#3eac75] px-3 py-1 bg-transparent border border-[#3eac75] dark:border-[#3eac75]/80"
      onClick={handleDownload}
      isActive={isDownloading || isActive}
    >
      <>
        <span>
          {isDownloading
            ? "Downloading..."
            : isActive
            ? "Downloaded"
            : "Download Mixtape"}
        </span>{" "}
        {isDownloading ? (
          <Download className="w-4 h-4 fa-bounce" />
        ) : isActive ? (
          <Check className="w-4 h-4" />
        ) : (
          <Download className="w-4 h-4" />
        )}
      </>
    </StreamButton>
  );
}
