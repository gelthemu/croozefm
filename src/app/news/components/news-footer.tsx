import React from "react";
import XNewsButton from "../news-archive/components/news-btn";

interface ArchiveProps {
  view?: boolean;
}

export default async function NewsFooter({ view = true }: ArchiveProps) {
  return (
    <>
      <div className="w-full sm:w-[95%] sm:mx-auto max-w-[740px] text-left">
        <p className="mb-4">
          At 91.2 Crooze FM, we don’t just break stories – we tell real stories
          that matter to you. Tune in hourly to stay ahead with the latest
          developments, in-depth insights, and the pulse of what’s happening in
          your world. Your soundtrack to informed listening starts here!
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
