import { StreamBtn } from "../stream/stream-btn";

export default function Hero() {
  return (
    <div>
      <div className="mb-1.5 flex flex-col items-center justify-center p-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-red relative mb-2 _912cfm flex flex-col">
          <span> Home of Western Uganda&rsquo;s </span>
          <span>Biggest Radio Station.</span>
        </h1>
        <p className="md:text-lg xl:text-xl font-semibold _912cfm">
          Great Music. Great Friends.
        </p>
      </div>
      <div className="flex items-center justify-center p-4 mb-2.5">
        <StreamBtn />
      </div>
    </div>
  );
}
