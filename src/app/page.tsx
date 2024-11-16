"use client";

import Hero from "./components/header-footer/hero";

export default function Home() {
  return (
    <>
      <main className="w-full max-w-screen-lg mx-auto min-h-screen px-2">
        <Hero />

        <div className="p-4 w-full border text-center">CONTENT</div>
      </main>
    </>
  );
}
