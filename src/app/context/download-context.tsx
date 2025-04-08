"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";
import Cookies from "js-cookie";

interface DownloadContextType {
  isDownloading: boolean;
  isDownloadMode: boolean;
  isPaused: boolean;
  progress: number;
  error: string | null;
  fileName: string | null;
  currentFile: string | null;
  downloadFile: (url: string, customFileName?: string) => Promise<void>;
  pauseDownload: () => void;
  resumeDownload: () => void;
  cancelDownload: () => void;
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

interface DownloadState {
  url: string;
  customFileName?: string;
  resumePosition: number;
  totalBytes: number;
  chunks: Uint8Array[];
  controller: AbortController;
}

export const DownloadProvider = ({ children }: DownloadProviderProps) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isDownloadMode, setIsDownloadMode] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const downloadStateRef = useRef<DownloadState | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  const cleanupDownload = () => {
    if (downloadStateRef.current?.controller) {
      downloadStateRef.current.controller.abort("cancelled");
    }
    downloadStateRef.current = null;
    isCancelledRef.current = false;
  };

  const cancelDownload = () => {
    if (!isDownloading && !isPaused) return;

    isCancelledRef.current = true;
    cleanupDownload();
    setIsDownloading(false);
    setIsDownloadMode(false);
    setIsPaused(false);
    setProgress(0);
    setFileName(null);
    setCurrentFile(null);
    setError(null);
  };

  const pauseDownload = () => {
    if (isDownloading && !isPaused && downloadStateRef.current) {
      downloadStateRef.current.controller.abort("paused");
      setIsPaused(true);
    }
  };

  const resumeDownload = async () => {
    if (!isPaused || !downloadStateRef.current || isCancelledRef.current)
      return;

    setIsPaused(false);
    setIsDownloading(true);
    setError(null);

    const { url, customFileName, resumePosition, chunks, totalBytes } =
      downloadStateRef.current;
    const controller = new AbortController();
    downloadStateRef.current.controller = controller;

    try {
      await continueDownload(
        url,
        customFileName,
        resumePosition,
        chunks,
        totalBytes,
        controller
      );
    } catch (err: unknown) {
      if (!isCancelledRef.current) {
        handleDownloadError(err);
      }
    }
  };

  const checkAndSetDownloadLimit = (url: string): boolean => {
    const cfmpulse_key = `DC_${encodeURIComponent(url)}`;

    // Check cookies
    const cookieCount = Cookies.get(cfmpulse_key);
    const cookieDownloadCount = cookieCount ? parseInt(cookieCount, 10) : 0;

    // Check localStorage
    const storedData = localStorage.getItem(cfmpulse_key);
    let localStorageData = storedData
      ? JSON.parse(storedData)
      : { count: 0, timestamp: null };

    const now = Date.now();
    const expiry_session = 12 * 60 * 60 * 1000;

    // Reset localStorage count if 24 hours have passed
    if (
      localStorageData.timestamp &&
      now - localStorageData.timestamp > expiry_session
    ) {
      localStorageData = { count: 0, timestamp: null };
    }

    // Use the higher count between cookies and localStorage to enforce the limit
    const effectiveCount = Math.max(
      cookieDownloadCount,
      localStorageData.count
    );

    if (effectiveCount >= 2) {
      return false; // Limit exceeded
    }

    // Increment the count
    const newCount = effectiveCount + 1;

    // Update cookies (expires in 24 hours, matching localStorage)
    const expiry_cookies = 12 / (24 * 60); // 24 hours
    Cookies.set(cfmpulse_key, newCount.toString(), {
      expires: expiry_cookies,
      path: "/",
    });

    // Update localStorage with count and timestamp
    localStorageData.count = newCount;
    localStorageData.timestamp = localStorageData.timestamp || now;
    localStorage.setItem(cfmpulse_key, JSON.stringify(localStorageData));

    return true; // Download allowed
  };

  const continueDownload = async (
    url: string,
    customFileName?: string,
    startPosition: number = 0,
    existingChunks: Uint8Array[] = [],
    knownTotalBytes: number = 0,
    controller: AbortController = new AbortController()
  ): Promise<boolean> => {
    const signal = controller.signal;

    try {
      const headers: HeadersInit = {};
      if (startPosition > 0) {
        headers.Range = `bytes=${startPosition}-`;
      }

      console.log("FETCH");

      const response = await fetch(url, { headers, signal });
      if (!response.ok && response.status !== 206) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const downloadFileName =
        customFileName || url.split("/").pop() || "downloaded-file";
      setFileName(downloadFileName);

      const contentLength = response.headers.get("Content-Length");
      const contentRange = response.headers.get("Content-Range");

      let totalBytes = knownTotalBytes;
      if (totalBytes === 0 && contentRange) {
        const match = contentRange.match(/bytes \d+-\d+\/(\d+)/);
        if (match && match[1]) {
          totalBytes = parseInt(match[1], 10);
        }
      } else if (totalBytes === 0 && contentLength) {
        totalBytes = startPosition + parseInt(contentLength, 10);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Unable to read response stream");

      const chunks = [...existingChunks];
      let receivedBytes = startPosition;

      downloadStateRef.current = {
        url,
        customFileName,
        resumePosition: receivedBytes,
        totalBytes,
        chunks,
        controller,
      };

      while (true) {
        if (signal.aborted) {
          if (signal.reason === "paused") {
            downloadStateRef.current.resumePosition = receivedBytes;
            return false;
          }
          return false;
        }

        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedBytes += value.length;

        if (totalBytes > 0) {
          const percentage = Math.round((receivedBytes / totalBytes) * 100);
          console.log(percentage);
          setProgress(percentage);
        }

        if (downloadStateRef.current) {
          downloadStateRef.current.resumePosition = receivedBytes;
          downloadStateRef.current.chunks = chunks;
        }
      }

      const blob = new Blob(chunks, {
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
      cleanupDownload();
      setIsDownloading(false);
      setIsDownloadMode(false);
      setProgress(0);
      setFileName(null);
      setCurrentFile(null);
    }, 4000);

      return true;
    } catch (err) {
      if (signal.aborted) {
        return false;
      }
      throw err;
    }
  };

  const handleDownloadError = (err: unknown) => {
    cleanupDownload();
    setIsPaused(false);
    setProgress(0);
    setFileName(null);
    setCurrentFile(null);

    setError(err instanceof Error ? err.message : "An unknown error occurred");

    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloadMode(false);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }, 4000);
  };

  const downloadFile = async (url: string, customFileName?: string) => {
    const DOWNLOAD_LIMIT_EXCEEDED_ERROR = `You have exceeded download limit for file: ${customFileName}. Try again later...`;

    if (isDownloading || isDownloadMode) return;

    if (!checkAndSetDownloadLimit(url)) {
      setIsDownloadMode(true);
      setIsDownloading(true);
      setError(DOWNLOAD_LIMIT_EXCEEDED_ERROR);
      setTimeout(() => {
        setError(null);
        setIsDownloadMode(false);
        setIsDownloading(false);
      }, 5000);
      return;
    }

    setIsDownloadMode(true);
    setIsDownloading(true);
    setProgress(0);
    setError(null);
    setCurrentFile(url);
    setIsPaused(false);
    isCancelledRef.current = false;

    const controller = new AbortController();
    try {
      await continueDownload(url, customFileName, 0, [], 0, controller);
    } catch (err: unknown) {
      if (!isCancelledRef.current) {
        setTimeout(() => {
          handleDownloadError(err);
        }, 2000);
      }
    }
  };

  const value = {
    isDownloading,
    isDownloadMode,
    isPaused,
    progress,
    error,
    fileName,
    currentFile,
    downloadFile,
    pauseDownload,
    resumeDownload,
    cancelDownload,
  };

  return (
    <DownloadContext.Provider value={value}>
      {children}
    </DownloadContext.Provider>
  );
};
