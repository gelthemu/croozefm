"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { StreamButton } from "../../stream/stream-btn";
import useDownloader from "react-use-downloader";

export default function MixtapeDownloadBtn() {
  const [isDownloading, setIsDownloading] = useState(false);
  const isActive = isDownloading;

  const { download } = useDownloader({
    mode: "no-cors",
    credentials: "include",
    headers: {
      Authorization: "Bearer TOKEN",
    },
  });

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

      const PROXY_URL = await toast.promise(
        fetch(`/api/download?url=${encodeURIComponent(MIXTAPE_URL)}`, {
          credentials: "include",
        }),
        {
          pending: "Downloading...",
          error: "Download failed!!!",
          success: {
            render() {
              return "Download completed!";
            },
            autoClose: 5000,
          },
        }
      );

      const response = await PROXY_URL;
      const AUDIO_URL = await response.url;
      download(AUDIO_URL, MIXTAPE_NAME);
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
