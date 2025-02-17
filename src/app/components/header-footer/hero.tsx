import StreamBtn from "../stream/stream-btn";

export default function Hero() {
  return (
    <div>
      <div className="mb-2 flex flex-col items-center justify-center p-0">
        <h1 className="text-3xl text-red relative mb-4 _912cfm">
          91.2 Crooze FM
        </h1>
        <p>Western Uganda&rsquo;s Biggest Radio Station.</p>
        <p>Great Music. Great Friends.</p>
      </div>
      <div className="flex items-center justify-center p-4">
        <StreamBtn />
      </div>
    </div>
  );
}
