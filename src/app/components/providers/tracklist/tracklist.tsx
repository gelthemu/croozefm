"use client";

import Carousel from "@/app/components/tiny/carousel";
import { useTracklistData } from "./tracklist-data";
import TrackCard from "./track-card";

export default function Tracklist() {
  const { tracks, isSuccess } = useTracklistData();
  const currentTrack = tracks[0];
  const recentTracks = tracks.slice(1);

  return (
    <>
      {isSuccess && (
        <>
          <h3 className="font-medium text-lg text-red mb-2 _912cfm">
            Recently Played
          </h3>
          {currentTrack && (
            <div className="w-full mx-auto mb-2 text-left">
              <TrackCard
                track={currentTrack}
                isCurrent={true}
                className="w-full shadow shadow-gray/40 dark:shadow-light/20"
              />
            </div>
          )}

          {recentTracks && (
            <div className="w-full p-0.5 rounded-sm border border-gray/10 dark:border-light/10">
              <div className="relative overflow-hidden rounded-sm">
                <Carousel
                  className="gap-1 snap-x snap-mandatory"
                  btnClass="bg-light/80 dark:bg-dark/80"
                  itemWidth={320}
                >
                  {recentTracks.map((track, index) => (
                    <TrackCard
                      key={index}
                      track={track}
                      index={index}
                      className="w-64 snap-center"
                    />
                  ))}
                </Carousel>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
