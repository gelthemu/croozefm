import { StreamBtn } from "@/app/components/stream/stream-btn";

export default function Hero() {
  return (
    <div className="hero flex flex-col items-center justify-center space-y-3 text-center p-1 select-none">
      <h1 className="flex flex-col text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-red relative _912cfm">
        <span>{"Home to Fans of"}</span>
        <span className="flex flex-col sm:flex-row sm:space-x-2 text-3xl sm:text-3xl md:text-4xl xl:text-5xl">
          <span>{"Western Uganda’s"}</span>
          <span>{"Biggest Radio Station"}</span>
        </span>
      </h1>
      <p className="sm:text-xl md:text-2xl font-semibold _912cfm">
        <span>{"By CFM Fans, for CFM Diehards"}</span>
        <span className="text-red">{"..."}</span>
      </p>
      <StreamBtn />
    </div>
  );
}
