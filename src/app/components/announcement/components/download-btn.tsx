"use client";

import React from "react";
import { toast } from "react-toastify";
import { StreamButton } from "../../stream/stream-btn";
import useDownloader from "react-use-downloader";

export default function MixtapeDownloadBtn() {
  const { download } = useDownloader({
    mode: "no-cors",
    credentials: "include",
    headers: {
      Authorization: "Bearer TOKEN",
    },
  });

  const handleDownload = async () => {
    try {
      const fileUrl =
        "https://croozefm.blob.core.windows.net/audio/weekend-love.mp3";

      const proxyUrl = await toast.promise(
        fetch(`/api/download?url=${encodeURIComponent(fileUrl)}`, {
          credentials: "include", // Include cookies for authentication
        }),
        {
          pending: "Downloading...",
          error: "Error downloading",
          success: {
            render() {
              return "Your download will start shortly!";
            },
            autoClose: 4000,
          },
        }
      );

      const filename =
        "Crooze-FM-Weekly-Mixtapes-DJ-Emma-Vol-1-19th-Feb-2025_01.mp3";

      const response = await proxyUrl;
      const audioUrl = await response.url;
      download(audioUrl, filename);
    } catch (error) {
      console.error(error);
      toast.error("Download failed. Please try again.");
    }
  };

  return (

     <StreamButton
     text={"Download Mixtape"}
     className="px-4 py-2 bg-[#3eac75] dark:bg-[#3eac75]/60"
     onClick={handleDownload}
     isDownload={true}
   />
  );
}
