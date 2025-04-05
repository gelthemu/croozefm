"use client";
import { useDownload } from "@/app/context/download-context";
import FixedDiv from "@/app/components/providers/divs/fixed-element";

export default function DownloadStatus() {
  const { isDownloading, isDownloadMode, progress, error, fileName } =
    useDownload();

  return (
    <FixedDiv
      color="turquoise"
      className={`${
        isDownloadMode ? "" : "hidden"
      } transition-all duration-[0.6s]`}
    >
      <div className="relative mx-2 my-1 rounded-md select-none">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold _912cfm">
            <span className="text-turquoise">
              {error ? "Download Error" : "Downloading file..."}
            </span>
          </h3>
          {!error && isDownloading && (
            <div className="text-sm">{progress}%</div>
          )}
        </div>

        {(isDownloading || error) && (
          <div className="flex flex-col space-y-3 p-3 text-sm text-light rounded-md border border-gray/10 dark:border-light/10 bg-turquoise backdrop-blur-sm overflow-hidden">
            {!error && fileName && (
              <div className="font-bold">
                <span className="line-clamp-1">{fileName}</span>
              </div>
            )}

            {!error && isDownloading && (
              <div className="w-full h-fit bg-light/40 border border-light/40 rounded-sm">
                <div
                  className="h-[6px] transition-all duration-[0.25s] bg-red"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {error ? (
              <div className="font-medium">
                Error: <span className="text-red opacity-90">{error}</span>
              </div>
            ) : (
              progress && (
                <div className="opacity-90 flex flex-col">
                  <span>
                    Hi, your download is in progress—your file will be in the
                    downloads folder soon.
                  </span>
                  <span>
                    Audio stream will PAUSE during this time!!!
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </FixedDiv>
  );
}
