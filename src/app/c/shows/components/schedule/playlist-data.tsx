import { useState, useEffect } from "react";
import { Track } from "@/types/track";

const getTimeAgo = (timestamp: number) => {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

export const usePlaylistData = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchPlaylist = async () => {
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
    fetchPlaylist();

    const interval = setInterval(fetchPlaylist, 5000);

    return () => clearInterval(interval);
  }, []);

  return { tracks, isSuccess, fetchPlaylist };
};

export { getTimeAgo };
