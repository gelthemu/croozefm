"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Track } from "@/types/track";
import { MdLibraryMusic } from "react-icons/md";

const getTimeAgo = (timestamp: number) => {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

const usePlaylistData = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaylist = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.instant.audio/data/playlist/132/91-2-crooze-fm"
      );

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.result && data.result.length > 0) {
        setTracks(data.result);
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();

    const interval = setInterval(fetchPlaylist, 90000);

    return () => clearInterval(interval);
  }, []);

  return { tracks, isLoading, fetchPlaylist };
};

export default function RecentlyPlayed() {
  const { tracks, isLoading } = usePlaylistData();
  const currentTrack = tracks.length > 0 ? tracks[0] : null;
  const recentTracks = tracks.slice(1);

  return (
    <>
      {!isLoading && (
        <div className="w-full mt-4 md:mt-0">
          <h2 className="text-lg mb-2.5 _912cfm">Recently Played</h2>

          {currentTrack && (
            <div className="w-full mx-auto mb-2.5 text-left">
              <div className="bg-gray/0 rounded-sm p-2.5 shadow shadow-gray/40 dark:shadow-light/20 flex items-end">
                <div className="flex-shrink-0 w-20 h-20 relative profile-image aspect-square rounded-sm overflow-hidden">
                  {currentTrack.track_image ? (
                    <Image
                      src={currentTrack.track_image}
                      alt={`${currentTrack.track_title} cover`}
                      width={2560}
                      height={2560}
                      className="w-full h-full object-cover rounded-sm aspect-square _img_"
                    />
                  ) : (
                    <div className="bg-dark/20 w-20 h-20 flex items-center justify-center">
                      <span className="text-light">
                        <MdLibraryMusic />
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-grow px-2.5">
                  <h4 className="font-semibold line-clamp-1">
                    {currentTrack.track_title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm line-clamp-1 opacity-80">
                      {currentTrack.track_artist}
                    </p>
                    <p className="text-xs flex-shrink-0 opacity-50">
                      {getTimeAgo(currentTrack.track_played)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {recentTracks && (
            <div className="flex items-start gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
              {recentTracks.map((track, index) => (
                <div
                  key={index}
                  className="w-64 snap-center bg-gray/10 dark:bg-gray/40 rounded-sm p-1.5 flex-shrink-0 flex items-end"
                >
                  <div className="flex-shrink-0 w-16 h-16 relative profile-image aspect-square rounded-sm overflow-hidden">
                    {track.track_image ? (
                      <Image
                        src={track.track_image}
                        alt={`${track.track_title} cover`}
                        width={2560}
                        height={2560}
                        className="w-full h-full object-cover rounded-sm aspect-square _img_"
                      />
                    ) : (
                      <div className="bg-dark/40 w-16 h-16 flex items-center justify-center">
                        <Image
                          src="/cfm-logo-2.png"
                          alt="CroozeFM Logo"
                          width={4096}
                          height={1652}
                          className="w-12 aspect-[4096/1652] _img_"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col text-sm ml-2">
                    <h4 className="font-medium line-clamp-1">
                      {track.track_title}
                    </h4>
                    <p className="text-xs line-clamp-1 opacity-80">
                      {track.track_artist}
                    </p>
                    <p className="text-xs flex-shrink-0 opacity-50">
                      {getTimeAgo(track.track_played)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
