"use client";

import NotFoundPage from "@/app/components/providers/divs/404-error";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Story"
      text="Sorry, we couldn't find the story linked to this url. The story may have been deleted or the URL you provided might be incorrect."
      link={{
        url: "/news",
        text: "Follow all updates here",
      }}
    />
  );
}
