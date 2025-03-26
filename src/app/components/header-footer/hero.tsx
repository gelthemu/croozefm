import { StreamBtn } from "../stream/stream-btn";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 text-center py-1 select-none">
      <h1 className="flex flex-col text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-red relative _912cfm">
        <span> Home of Western Uganda&rsquo;s </span>
        <span>Biggest Radio Station.</span>
      </h1>
      <p className="md:text-lg xl:text-xl font-semibold _912cfm">
        Great Music. Great Friends.
      </p>
      <StreamBtn />
    </div>
  );
}
