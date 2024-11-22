import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignOutBtn } from "./components/signout-btn";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/user/login");
  }

  return (
    <div className="p-6 min-h-screen container mx-auto py-12">
      <h1 className="text-3xl text-center text-red/80 font-semibold mb-4">
        Hi,{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red via-light to-red">
          {session.user?.username.charAt(0).toUpperCase() +
            session.user?.username.slice(1)}
        </span>
        !
      </h1>
      <p className="w-full max-w-screen-sm mx-auto text-center text-light/80">
        Thank you for being a part of 91.2 Crooze FM. This site is currently in
        maintenance mode. Please check back later for updates.
      </p>
      <div className="w-full flex items-center my-8">
        <Image
          src="/assets/dashboard_default.png"
          alt="Dashboard"
          width={2400}
          height={1260}
          priority={true}
          className="w-full aspect-[2400/1260] object-cover _img_"
        />
      </div>
      <div className="flex flex-col space-y-4 border border-light/20 p-4 rounded-md">
        <div className="flex items-center text-light/70">
          <p className="text-sm w-full max-w-screen-md">
            <span className="font-semibold">PS:</span> In the future, if you
            ever want to delete your data from our database, please send us an
            email at{" "}
            <Link
              href="mailto:croozefm@geltaverse.com"
              className="text-red/60 font-semibold"
              target="_blank"
            >
              croozefm@geltaverse.com
            </Link>{" "}
            and we will take care of it. Thank you.
          </p>
        </div>
        <SignOutBtn />
      </div>
    </div>
  );
}
