import React from "react";
import { getAllProfiles } from "@/lib/profiles-parser";
import ProfileGrid from "./profile-grid";

export default async function ProfileList() {
  const profiles = await getAllProfiles();

  return <ProfileGrid initialProfiles={profiles} />;
}
