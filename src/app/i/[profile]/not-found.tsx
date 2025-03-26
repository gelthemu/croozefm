"use client";

import NotFoundPage from "@/app/components/providers/divs/404-error";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Profile"
      text="Sorry, we couldn't find the profile you're looking for. The presenter may have retired or the profile URL might be incorrect."
      link={{
        url: "/i/team",
        text: "Browse All Profiles",
      }}
    />
  );
}
