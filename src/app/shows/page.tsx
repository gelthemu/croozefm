import { shows } from "@/data/shows";
import { ShowCard } from "./components/showcard";

export const metadata = {
  title: "Shows",
  description: "Discover our shows on 91.2 Crooze FM.",
};

export default function ShowsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8 flex flex-col items-center justify-center p-4 border-b border-light/20">
        <h1 className="text-3xl font-apex relative mb-4">Shows</h1>
        <p className="text-light/60 text-sm">
          [Click to view in detail. Some shows have ad-free recordings you may
          listen to.]
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}
