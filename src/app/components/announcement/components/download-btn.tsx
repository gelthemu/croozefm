"use client";

import React from "react";
import { toast } from "react-toastify";
import { StreamButton } from "../../stream/stream-btn";
import useDownloader from "react-use-downloader";

const MIXTAPE_URL =
  "https://croozefm.com/wp-content/uploads/2025/02/Crooze-FM-Weekly-Mixtapes-DJ-Emma-Vol-1-19th-Feb-2025_01.mp3";

const getFilenameFromUrl = (url: string) => {
  const match = url.match(/\/([^\/]+)\.mp3$/);
  return match ? match[1].toLowerCase() : "cfm-weekly-mixtapes-download";
};

const DownloadMixtapeBtn = () => {
  const { download } = useDownloader();

  const handleClick = async () => {
    try {
      const filename = `${getFilenameFromUrl(MIXTAPE_URL)}.mp3`;

      const proxyUrl = await toast.promise(
        fetch(`/api/download?url=${encodeURIComponent(MIXTAPE_URL)}`, {
          credentials: "include",
        }),
        {
          pending: "Downloading. Please wait...",
          error: "Error downloading",
          success: {
            render() {
              return "Your download will start shortly!";
            },
            autoClose: 4000,
          },
        }
      );

      if (!proxyUrl.ok) {
        toast.error("Download failed. Please try again.", {
          autoClose: 5000,
        });
        return;
      }

      const response = proxyUrl;
      const audioUrl = response.url;
      download(audioUrl, filename);
    } catch (error) {
      console.error(error);
      toast.error("Download failed. Please try again.");
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
