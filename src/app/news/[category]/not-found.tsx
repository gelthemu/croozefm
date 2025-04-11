"use client";

import NotFoundPage from "@/app/components/providers/divs/404-error";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Content"
      text="Sorry, we couldn't find the content you're looking for. The category may have been retired or the URL you provided might be incorrect."
    />
  );
}
