"use client";
import { useState } from "react";

const AUDIO_URL =
  "https://cfmpulse-fxavapfdeybedqdt.z01.azurefd.net/mixtapes/cfm-weekly-mixtape-dj-emma-vol-1-2025-02-19_01.mp3";

export default function Download() {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);
    setError(null);

    try {
      const response = await fetch(AUDIO_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.statusText}`);
      }

      // Get total file size from Content-Length header
      const contentLength = response.headers.get("Content-Length");
      const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

      // Create a new ReadableStream to track progress
      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];
      let receivedBytes = 0;

      if (!reader) {
        throw new Error("Unable to read response stream");
      }

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedBytes += value.length;

        if (totalBytes) {
          // Calculate and update progress percentage
          const percentage = Math.round((receivedBytes / totalBytes) * 100);
          setProgress(percentage);
        }
      }

      // Combine all chunks into a single Uint8Array
      const allChunks = new Uint8Array(receivedBytes);
      let position = 0;
      for (const chunk of chunks) {
        allChunks.set(chunk, position);
        position += chunk.length;
      }

      // Convert to blob and download
      const blob = new Blob([allChunks], {
        type: response.headers.get("Content-Type") || "audio/mpeg",
      });
      const fileName = "cfm-weekly-mixtape-dj-emma-vol-1-2025-02-19_01.mp3";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full my-10">
      <div className="w-full flex flex-col items-center bg-transparent rounded-sm">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            handleDownload();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleDownload();
            }
          }}
          className="btn-xs bg-red text-sm text-light text-center font-medium _912cfm px-3 py-1 rounded-sm focus:outline-none"
        >
          {isDownloading ? `Downloading... ${progress}%` : "Download AUDIO"}
        </div>

        {isDownloading && (
          <div className="w-full max-w-xs mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {error && <p className="text-red mt-4">Error: {error}</p>}
        <p className="mt-4">File: DJ Emma Vol 1</p>
      </div>
    </div>
  );
}
