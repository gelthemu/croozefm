"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DownloadContextType {
  isDownloading: boolean;
  isDownloadMode: boolean;
  progress: number;
  error: string | null;
  fileName: string | null;
  currentFile: string | null;
  downloadFile: (url: string, customFileName?: string) => Promise<void>;
}

const DownloadContext = createContext<DownloadContextType | undefined>(
  undefined
);

export const useDownload = () => {
  const context = useContext(DownloadContext);
  if (context === undefined) {
    throw new Error("useDownload must be used within a DownloadProvider");
  }
  return context;
};

interface DownloadProviderProps {
  children: ReactNode;
}

export const DownloadProvider = ({ children }: DownloadProviderProps) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isDownloadMode, setIsDownloadMode] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const downloadFile = async (url: string, customFileName?: string) => {
    if (isDownloading || isDownloadMode) {
      return;
    }

    setIsDownloadMode(true);
    setProgress(0);
    setError(null);
    setCurrentFile(url);

    const MAX_RETRIES = 3;
    let retryCount = 0;
    let success = false;

    while (retryCount < MAX_RETRIES && !success) {
      try {
        if (retryCount > 0) {
          const delay = retryCount * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        let downloadFileName = customFileName;
        if (!downloadFileName) {
          downloadFileName = url.split("/").pop() || "downloaded-file";
        }

        setFileName(downloadFileName);

        const contentLength = response.headers.get("Content-Length");
        const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

        const reader = response.body?.getReader();
        const chunks: Uint8Array[] = [];
        let receivedBytes = 0;

        if (!reader) {
          throw new Error("Unable to read response stream");
        }

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          chunks.push(value);
          receivedBytes += value.length;

          if (totalBytes) {
            const percentage = Math.round((receivedBytes / totalBytes) * 100);
            setProgress(percentage);
            setIsDownloading(true);
          }
        }

        const allChunks = new Uint8Array(receivedBytes);
        let position = 0;
        for (const chunk of chunks) {
          allChunks.set(chunk, position);
          position += chunk.length;
        }

        const blob = new Blob([allChunks], {
          type:
            response.headers.get("Content-Type") || "application/octet-stream",
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = downloadFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        setTimeout(() => {
          setIsDownloading(false);
          setIsDownloadMode(false);
          setProgress(0);
          setFileName(null);
          setCurrentFile(null);
        }, 4000);

        success = true;
      } catch (err) {
        retryCount++;

        if (retryCount >= MAX_RETRIES) {
          setFileName(null);
          setProgress(0);

          setTimeout(() => {
            setIsDownloading(true);
          }, 1000);

          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );

          setTimeout(() => {
            setIsDownloading(false);
            setIsDownloadMode(false);
            setTimeout(() => {
              setError(null);
            }, 1000);
          }, 4000);
        }
      }
    }
  };
  const value = {
    isDownloading,
    isDownloadMode,
    progress,
    error,
    fileName,
    currentFile,
    downloadFile,
  };

  return (
    <DownloadContext.Provider value={value}>
      {children}
    </DownloadContext.Provider>
  );
};
