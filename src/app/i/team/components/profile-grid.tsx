"use client";

import React from "react";
import PresenterCard from "./profile/profile-card";
import { useShuffledArray } from "@/app/components/tiny/fisher-yates-shuffle";
import { PresenterProfile } from "@/types/profile";
import { MainPagination } from "@/app/components/providers/divs/main-pagination";

interface ProfileGridProps {
  initialProfiles: PresenterProfile[];
}

export default function ProfileGrid({ initialProfiles }: ProfileGridProps) {
  const seed = new Date().toDateString();
  const allProfiles = useShuffledArray(initialProfiles, seed);

  return (
    <MainPagination
      className="text-left"
      items={allProfiles}
      itemsPerPage={6}
      renderItem={(profile) => (
        <PresenterCard key={profile.id} profile={profile} />
      )}
    />
  );
}
