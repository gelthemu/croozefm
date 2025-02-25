import { NextResponse } from 'next/server';
import axios from 'axios';
import redis from '@/lib/redis';

// Define types
interface Track {
  track_artist: string;
  track_title: string;
  track_image: string;
  track_played: number;
}

export async function GET() {
  try {
    // Get the current tracks from the radio API
    const response = await axios.get('https://api.instant.audio/data/playlist/132/91-2-crooze-fm');
    const currentTracks: Track[] = response.data.result;

    // Get existing tracks from Redis
    let storedTracks: Track[] = await redis.get('recently_played_tracks') || [];

    // Add new tracks that aren't already in our list
    const allTrackIds = new Set(storedTracks.map(t => `${t.track_artist}-${t.track_title}`));

    for (const track of currentTracks) {
      const trackId = `${track.track_artist}-${track.track_title}`;
      if (!allTrackIds.has(trackId)) {
        storedTracks.push(track);
        allTrackIds.add(trackId);
      }
    }

    // Sort by played time (newest first)
    storedTracks.sort((a, b) => b.track_played - a.track_played);

    // Only keep tracks from the last 2 hours
    const twoHoursAgo = Math.floor(Date.now() / 1000) - 7200;
    storedTracks = storedTracks.filter(track => track.track_played >= twoHoursAgo);

    // Store updated tracks back to Redis
    await redis.set('recently_played_tracks', storedTracks);

    // Set cache headers
    return NextResponse.json(
      { success: true, tracks: storedTracks },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching recently played tracks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recently played tracks' },
      { status: 500 }
    );
  }
}