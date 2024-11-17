// @/app/shows/[id]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-apex">Show Not Found</h2>
        <p className="text-light/60">
          The show you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <Link
          href="/shows"
          className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          View All Shows
        </Link>
      </div>
    </div>
  );
}