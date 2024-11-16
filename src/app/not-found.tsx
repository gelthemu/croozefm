"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-xs text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red">404</h1>
          <p className="text-xl font-semibold">Page Not Found</p>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center text-sm">
          <Link
            href="/"
            className="w-full p-3 bg-gray hover:bg-dark border border-light/60 rounded-md"
          >
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full p-3 border border-light/60 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
