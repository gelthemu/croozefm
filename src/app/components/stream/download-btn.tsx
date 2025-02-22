"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { StreamButton } from "./stream-btn";

export default function MixtapeDownloadBtn() {
  const [isDownloading, setIsDownloading] = useState(false);
  const isActive = isDownloading;

  const getFilename = (url: string) => {
    const match = url.match(/\/([^\/]+)\.mp3$/);
    return match ? `${match[1].toLowerCase()}.mp3` : "cfm-weekly-mixtape.mp3";
  };

  const handleDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);

      const MIXTAPE_URL =
        "https://croozefm.com/wp-content/uploads/2025/02/Crooze-FM-Weekly-Mixtapes-DJ-Emma-Vol-1-19th-Feb-2025_01.mp3";

      const MIXTAPE_NAME = getFilename(MIXTAPE_URL);

      const response = await fetch(
        `/api/download?url=${encodeURIComponent(MIXTAPE_URL)}`,
        {
          credentials: "include",
        }
      );

      console.log("yesss!!!");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Create a blob from the response
      const blob = await response.blob();
      console.log("yesss!!! BLOBBBB");
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      console.log("yesss!!! AAAAAAAAAAA");
      a.download = MIXTAPE_NAME;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Download completed!");
    } catch (error) {
      console.error(error);
      toast.error("Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <StreamButton
      text={isDownloading ? "Downloading..." : "Download Mixtape"}
      className={`px-4 py-2 ${
        isActive
          ? "bg-gray/80 dark:bg-gray/100"
          : "bg-[#3eac75] dark:bg-[#3eac75]/60"
      } `}
      onClick={handleDownload}
      isDownload={true}
      isActive={isActive}
    />
  );
}
