"use client";
import { useEffect } from "react";
import { useMiniPlayer } from "@/app/context/mini-player-context";

export default function MediaSessionHandler() {
  const { isMiniPlayerOpen, tagLine, snapShot, audioRef, currentSource } =
    useMiniPlayer();

  useEffect(() => {
    if (
      !isMiniPlayerOpen ||
      !currentSource ||
      !audioRef.current ||
      !("mediaSession" in navigator)
    ) {
      return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: tagLine,
      artist: "CFM Pulse",
      album: "CFM Pulse",
      artwork: [
        {
          src: "https://assets.geltaverse.com/media/cfm-pulse-official-logo-dark.png",
          sizes: "512x512",
          type: "image/jpg",
        },
      ],
    });

    navigator.mediaSession.setActionHandler("play", () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    });

    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (audioRef.current && details.seekTime) {
        audioRef.current.currentTime = details.seekTime;
      }
    });

    const updatePlaybackState = () => {
      if (!audioRef.current) return;

      navigator.mediaSession.playbackState = audioRef.current.paused
        ? "paused"
        : "playing";
    };

    const updatePositionState = () => {
      if (!audioRef.current || !audioRef.current.duration) return;

      navigator.mediaSession.setPositionState({
        duration: audioRef.current.duration,
        playbackRate: audioRef.current.playbackRate,
        position: audioRef.current.currentTime,
      });
    };

    const audio = audioRef.current;
    audio.addEventListener("play", updatePlaybackState);
    audio.addEventListener("pause", updatePlaybackState);
    audio.addEventListener("timeupdate", updatePositionState);

    return () => {
      if (audio) {
        audio.removeEventListener("play", updatePlaybackState);
        audio.removeEventListener("pause", updatePlaybackState);
        audio.removeEventListener("timeupdate", updatePositionState);
      }
    };
  }, [isMiniPlayerOpen, tagLine, snapShot, audioRef, currentSource]);

  return null;
}
