"use client";
import { useDownload } from "@/app/context/download-context";
import FixedDiv from "@/app/components/providers/divs/fixed-element";
import Image from "next/image";
import { SNAPSHOTS } from "@/data/endpoints";

export default function DownloadStatus() {
  const {
    isDownloading,
    isDownloadMode,
    progress,
    error,
    pauseDownload,
    resumeDownload,
    cancelDownload,
    isPaused,
    fileName,
  } = useDownload();

  return (
    <FixedDiv
      color="turquoise"
      className={`${
        isDownloadMode
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      } transition-all duration-[0.6s]`}
    >
      <div className="relative mx-2 my-1 rounded-md select-none">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold _912cfm">
            <span className="text-turquoise">
              {error ? "Download Error" : "Downloading file..."}
            </span>
          </h3>
          {!error && isDownloading && progress > 0 && progress < 90 && (
            <div className="flex-shrink-0 flex space-x-2 text-sm opacity-80">
              <button
                onClick={() => (isPaused ? resumeDownload() : pauseDownload())}
                title={isPaused ? "Resume" : "Pause"}
                className="rounded-sm bg-gray/5 dark:bg-gray/60 px-1"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={cancelDownload}
                className="text-red"
                title="Cancel"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {(isDownloading || error) && (
          <>
            {error ? (
              <div>
                <span className="text-red opacity-90">{error}</span>
              </div>
            ) : progress > 0 ? (
              <div className="opacity-90 flex flex-col mb-3">
                <span>
                  Hi, your file will be in the downloads folder soon. Audio is
                  PAUSED!
                </span>
              </div>
            ) : null}
            {!error && fileName && (
              <div className="flex flex-col space-y-3 p-3 text-sm text-light rounded-sm border border-gray/10 dark:border-light/10 bg-turquoise backdrop-blur-sm overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="font-bold">
                    <span className="line-clamp-1">{fileName}</span>
                  </div>
                  <div className="text-sm flex-shrink-0 flex pl-2">
                    {progress}%
                  </div>
                </div>
                <div className="w-full h-fit bg-light/40 border border-light/40 rounded-sm">
                  <div
                    className="h-[8px] transition-all duration-[0.25s] bg-red"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            <div className="relative w-full aspect-[371/100] mt-3">
              <div
                className="w-full h-full bg-cover bg-center bg-transparent bg-blend-multiply"
                style={{
                  aspectRatio: "371 / 100",
                  backgroundImage: `url("https://placehold.co/371x100/transparent/png?text=CFM+Pulse")`,
                }}
              >
                <Image
                  src={`${SNAPSHOTS}/snap-shot-cfm-weekly-mixtape.png`}
                  alt={"CFM Pulse"}
                  width={2968}
                  height={800}
                  priority={true}
                  className={`w-full object-cover aspect-[371/100] _img_`}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </FixedDiv>
  );
}
