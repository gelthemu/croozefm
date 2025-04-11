"use client";

import NotFoundPage from "@/app/components/providers/divs/404-error";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Show"
      text="Sorry, we couldn't find the show you're looking for. The show may have been retired or the show's URL might be incorrect."
    />
  );
}
