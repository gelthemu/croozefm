import { useState, useEffect } from "react";
import { Track } from "@/types/track";

const getTimeAgo = (timestamp: number) => {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);

  if (seconds < 60) {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
  }

  const hours = Math.floor(seconds / 3600);
  if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }

  const days = Math.floor(seconds / 86400);
  return days === 1 ? "1 day ago" : `${days} days ago`;
};

export const useTracklistData = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchTracklist = async () => {
    try {
      const response = await fetch(
        "https://api.instant.audio/data/playlist/132/91-2-crooze-fm"
      );

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.result && data.result.length > 0) {
        setTracks(data.result);
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        return;
      }
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    fetchTracklist();

    const interval = setInterval(fetchTracklist, 5000);

    return () => clearInterval(interval);
  }, []);

  return { tracks, isSuccess, fetchTracklist };
};

export { getTimeAgo };
