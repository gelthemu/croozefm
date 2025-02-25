'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Track {
  track_artist: string;
  track_title: string;
  track_image: string;
  track_played: number;
}

export default function RecentlyPlayedPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/song-history');
      if (!response.ok) {
        throw new Error('Failed to fetch tracks');
      }
      const data = await response.json();
      setTracks(data.tracks);
      setLoading(false);
    } catch (err) {
      setError('Error fetching recently played tracks');
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTracks();

    // Refresh data every minute
    const intervalId = setInterval(fetchTracks, 60000);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchTracks}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Recently Played on 91.2 Crooze FM</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <div className="font-semibold">Last updated: {new Date().toLocaleTimeString()}</div>
          <div className="text-sm text-gray-500">Refreshes every minute</div>
        </div>
        <ul className="divide-y divide-gray-200">
          {tracks.map((track, index) => (
            <li key={`${track.track_artist}-${track.track_title}-${index}`} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16 relative bg-gray-200 rounded">
                  {track.track_image ? (
                    <Image
                      src={track.track_image}
                      alt={track.track_title}
                      fill
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-medium text-gray-900">{track.track_title}</h2>
                  <p className="text-sm text-gray-500">{track.track_artist}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Played at: {formatTime(track.track_played)}
                  </p>
                </div>
              </div>
            </li>
          ))}
          {tracks.length === 0 && (
            <li className="p-8 text-center text-gray-500">
              No recently played tracks found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}