"use client";

import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StreamButton } from "../../stream/stream-btn";

const MIXTAPE_URL =
  "https://croozefm.com/wp-content/uploads/2025/02/Crooze-FM-Weekly-Mixtapes-DJ-Emma-Vol-1-19th-Feb-2025_01.mp3";

const getFilenameFromUrl = (url: string) => {
  const match = url.match(/\/([^\/]+)\.mp3$/);
  return match ? match[1].toLowerCase() : "cfm-weekly-mixtapes-download";
};

const DownloadMixtapeBtn = () => {
  const handleClick = async () => {
    try {
      const downloadPromise = async () => {
        const response = await axios.get(
          `/api/download?url=${encodeURIComponent(MIXTAPE_URL)}`,
          {
            responseType: "blob",
          }
        );

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        const filename = `${getFilenameFromUrl(MIXTAPE_URL)}.mp3`;
        link.setAttribute("download", filename);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return response;
      };

      await toast.promise(downloadPromise(), {
        pending: `Downloading. Please wait...`,
        success: {
          render() {
            return "Downloaded successfully...";
          },
          autoClose: 5000,
        },
        error: {
          render() {
            return "Failed to download.";
          },
          autoClose: 5000,
        },
      });
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <StreamButton
      text="Download Mixtape"
      className="text-sm px-4 py-2 bg-[#3eac75] dark:bg-[#3eac75]/60"
      isDownload={true}
      onClick={handleClick}
    />
  );
};

export { DownloadMixtapeBtn };
