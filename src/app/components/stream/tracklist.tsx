"use client";

import Image from "next/image";
import { MdLibraryMusic } from "react-icons/md";
import Carousel from "../tiny/carousel";
import {
  usePlaylistData,
  getTimeAgo,
} from "@/app/c/shows/components/schedule/playlist-data";

export default function Tracklist() {
  const { tracks, isSuccess } = usePlaylistData();
  const currentTrack = tracks[0];
  const recentTracks = tracks.slice(1);

  return (
    <>
      {isSuccess && (
        <div className="w-full mt-6 md:mt-0">
          <h2 className="text-lg mb-2.5 _912cfm">Tracklist</h2>

          {currentTrack && (
            <div className="w-full mx-auto mb-2.5 text-left">
              <div className="bg-gray/10 dark:bg-gray/40 rounded-sm p-2.5 shadow shadow-gray/40 dark:shadow-light/20 flex items-end">
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
                <div className="flex-grow pl-2.5 pr-1.5">
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
            <div className="w-full p-0.5 rounded-sm border border-gray/10 dark:border-light/10">
              <div className="relative overflow-hidden">
                <Carousel
                  className="gap-2 snap-x snap-mandatory"
                  btnClass="bg-light/80 dark:bg-dark/80"
                  itemWidth={10}
                >
                  {recentTracks.map((track, index) => (
                    <div
                      key={index}
                      className="w-64 snap-center bg-gray/10 dark:bg-gray/40 rounded-sm p-1.5 flex-shrink-0 flex items-end transition-transform duration-300"
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
                      <div className="flex-grow text-sm ml-2 mr-1">
                        <h4 className="font-medium line-clamp-1">
                          {track.track_title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <p className="line-clamp-1 opacity-80">
                            {track.track_artist}
                          </p>
                          <p className="ml-1 text-xs flex-shrink-0 opacity-50">
                            {getTimeAgo(track.track_played)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
