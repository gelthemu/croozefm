import { StreamBtn } from "../stream/stream-btn";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 text-center py-1 select-none">
      <h1 className="flex flex-col text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-red relative _912cfm">
        <span> Home to Fans of </span>
        <span> Western Uganda&rsquo;s </span>
        <span>Biggest Radio Station.</span>
      </h1>
      <p className="md:text-lg xl:text-xl font-semibold _912cfm">
        By CFM Fans, for CFM Diehards.
      </p>
      <StreamBtn />
    </div>
  );
}
