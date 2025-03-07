import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Home of Western Uganda's Biggest Radio Station",
  description:
    "Home of Western Uganda's Biggest Radio Station. Great Music, Great Friends.",
};

export default function NotFound() {
  return (
    <div className="w-full flex flex-col justify-center items-center mx-auto min-h-screen">
      <div className="p-2 text-dark dark:text-light text-center">
        <h1 className="text-3xl pb-4 text-red">Page Not Found</h1>
        <p className="text-sm">
          The page you&apos;re trying to find is not available.
        </p>
      </div>
    </div>
  );
}
