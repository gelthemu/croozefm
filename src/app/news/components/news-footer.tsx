import React from "react";
import XNewsButton from "../article/components/news-btn";

interface ArchiveProps {
  view?: boolean;
}

export default async function NewsFooter({ view = true }: ArchiveProps) {
  return (
    <>
      <div className="w-full sm:w-[95%] text-left">
        <p className="mb-4">
          We sweep the web to deliver real stories that matter to you. Check in
          anytime for the latest finds, and user submissions. Got a story?
          Submit it, anytime... your scoop!
        </p>
        <div className="mb-4">
          <XNewsButton view={view} />
        </div>
        <p className="font-medium text-sm italic mb-4 _912cfm">
          &quot;Always remember where you heard it first.&quot;
        </p>
      </div>
    </>
  );
}
