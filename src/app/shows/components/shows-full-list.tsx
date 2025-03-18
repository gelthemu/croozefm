"use client";

import { shows } from "@/data/shows/shows";
import { ShowCard } from "./show/showcard";
import { MainPagination } from "@/app/components/providers/divs/main-pagination";

export default function ShowsFullList() {
  const ftShows = shows.filter((show) => show.isFt);

  return (
    <MainPagination
      items={ftShows}
      itemsPerPage={12}
      renderItem={(show) => (
        <ShowCard key={show.id} show={show} srOnly={true} />
      )}
    />
  );
}
