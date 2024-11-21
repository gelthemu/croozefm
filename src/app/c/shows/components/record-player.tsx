"use client";

import React, { useEffect, useState, useRef } from "react";
import { Play, Pause, Download } from "lucide-react";
import { toast } from "react-toastify";
import type { Show } from "@/types/shows";
import AudioManager from "@/app/components/tiny/audiomanager";
import { FormatDate } from "@/app/components/tiny/format-date";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useDownloader from "react-use-downloader";
interface RecordPlayerProps {
  show: Show;
}

const RecordPlayer = ({ show }: RecordPlayerProps) => {
  const { download } = useDownloader();
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState<number[]>([]);
  const [isDownloading, setIsDownloading] = useState<boolean[]>([]);
  const audioManager = useRef(AudioManager.getInstance());
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const length = show.recordings?.length || 0;
    setProgress(new Array(length).fill(0));
    setIsDownloading(new Array(length).fill(false));
  }, [show.recordings]);

  useEffect(() => {
    if (!show.recordings) return;

    const currentAudioRefs = audioRefs.current;

    const handleTimeUpdate = (index: number) => {
      const audio = currentAudioRefs[index];
      if (!audio) return;

      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = progressPercent;
        return newProgress;
      });
    };

    const handleEnded = (index: number) => {
      setPlayingIndex(null);
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = 0;
        return newProgress;
      });
    };

    show.recordings.forEach((_, index) => {
      const audio = currentAudioRefs[index];
      if (!audio) return;

      audio.addEventListener("timeupdate", () => handleTimeUpdate(index));
      audio.addEventListener("ended", () => handleEnded(index));
    });

    const unsubscribe = audioManager.current.addListener((currentAudio) => {
      const index = audioRefs.current.findIndex(
        (audio) => audio === currentAudio
      );
      setPlayingIndex(index === -1 ? null : index);
    });

    return () => {
      show.recordings?.forEach((_, index) => {
        const audio = currentAudioRefs[index];
        if (!audio) return;

        audio.removeEventListener("timeupdate", () => handleTimeUpdate(index));
        audio.removeEventListener("ended", () => handleEnded(index));
      });
      unsubscribe();
    };
  }, [show.recordings]);

  const handlePlay = (index: number) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      audioManager.current.pause();
    } else {
      audioManager.current.play(audio);
    }
  };

  const handleDownload = async (
    recording: NonNullable<Show["recordings"]>[number],
    index: number
  ) => {
    try {
      // if not logged in, redirect to login
      if (!session) {
        router.push("/user/login");
        toast.error("You must be logged in", {
          autoClose: 5000,
        });
        return;
      }

      setIsDownloading((prev) => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });

      const formatName = show.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      const filename = `croozefm-${formatName}-${recording.id}.mp3`;

      const proxyUrl = await toast.promise(
        fetch(`/api/download?url=${encodeURIComponent(recording.audio)}`, {
          credentials: "include", // Include cookies for authentication
        }),
        {
          pending: "Downloading...",
          error: "Error downloading",
          success: {
            render() {
              return "Your download will start shortly!";
            },
            autoClose: 4000,
          },
        }
      );

      if (!proxyUrl.ok) {
        if (proxyUrl.status === 401) {
          router.push(`/user/login?url=${encodeURIComponent(recording.audio)}`);
          toast.error("You must be logged in", {
            autoClose: 5000,
          });
          return;
        }
        toast.error("Download failed. Please try again.", {
          autoClose: 5000,
        });
        return;
      }

      const response = await proxyUrl;
      const audioUrl = await response.url;
      download(audioUrl, filename);
    } catch (error) {
      console.error(error);
      toast.error("Download failed. Please try again.");
    } finally {
      setIsDownloading((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }
  };

  if (!show.recordings?.length) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-red">No recordings available</p>
      </div>
    );
  }

  return (
    <div className="py-10 border-y border-light/10">
      <div className="w-full md:w-5/6 mx-auto">
        <h2 className="text-xl text-red/80 font-light mb-4 border-l-2 border-red/40 pl-4">
          Recordings Available
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {show.recordings.map((recording, index) => (
            <div
              key={recording.id}
              className={`overflow-hidden rounded-md ${
                playingIndex === index
                  ? "border-2 border-red/40"
                  : "border-2 border-light/10"
              } bg-custom-gradient-reverse transition-all duration-200 shadow-sm`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between pb-2 text-light/50">
                  <span className="text-sm font-medium">
                    <FormatDate date={recording.id} />
                  </span>
                </div>

                <div className="bg-dark/40 p-2 rounded-sm text-red/80 flex items-center justify-between relative border border-light/10">
                  <button
                    onClick={() => handlePlay(index)}
                    className="p-2 hover:bg-light/5 transition-all duration-200 rounded-sm"
                    disabled={isDownloading[index]}
                  >
                    {playingIndex === index ? (
                      <>
                        <span className="sr-only">Pause</span>
                        <Pause className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span className="sr-only">Play</span>
                        <Play className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDownload(recording, index)}
                    disabled={isDownloading[index]}
                    className="p-2 hover:bg-light/5 transition-all duration-200 rounded-sm"
                  >
                    <span className="sr-only">Download</span>
                    <Download className="h-4 w-4" />
                  </button>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 w-full bg-red/40 transition-all duration-200 rounded-full"
                    style={{
                      width: `${progress[index]}%`,
                      opacity: progress[index] > 0 ? 1 : 0,
                    }}
                  />
                </div>

                <audio
                  ref={(el) => {
                    if (el) audioRefs.current[index] = el;
                  }}
                  src={recording.audio}
                  preload="metadata"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordPlayer;
