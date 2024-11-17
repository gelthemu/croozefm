import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Headlines - 91.2 Crooze FM",
  description:
    "Latest News as it happens, broadcasting to you live on 91.2 Crooze FM. From Mbarara and beyond, always remember where you hear it first.",
};

export default function HeadlinesPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="mb-8 flex flex-col items-center justify-center p-4 border-b border-light/20">
        <h1 className="text-3xl font-apex relative mb-4">Headlines</h1>
        <p className="text-light/80 text-center max-w-screen-sm mx-auto">
          From Mbarara and beyond, always remember where you hear it first.
          Latest news as it happens, broadcasting to you live on 91.2 Crooze FM.
        </p>
      </div>
      <div className="flex justify-center max-w-screen-md mx-auto">
        <audio
          controls
          controlsList="nodownload noplaybackrate"
          className="w-full bg-[#3b3b3b] rounded-sm"
        >
          <source
            src="https://croozefm.blob.core.windows.net/audio/cfm-news-2024-11-14_monica-mbabazi.mp3"
            type="audio/mp3"
          />
          91.2 Crooze FM Headlines
        </audio>
      </div>
    </div>
  );
}
