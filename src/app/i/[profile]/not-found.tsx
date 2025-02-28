import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col justify-center items-center mx-auto min-h-screen">
      <div className="p-2 text-dark dark:text-light text-center">
        <h1 className="text-xl pb-2.5 text-red">Profile Not Found</h1>
        <p className="text-sm mb-2.5 max-w-md mx-auto">
          Sorry, we couldn't find the profile you're looking for. The presenter
          may have retired or the profile URL might be incorrect.
        </p>
        <Link href="/i/team" className="px-2.5 py-1 underline text-red">
          Browse All Profiles
        </Link>
      </div>
    </div>
  );
}
