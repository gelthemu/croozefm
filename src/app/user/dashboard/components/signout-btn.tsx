"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOutBtn() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut({
          redirect: false,
        });
        router.push("/user/login");
      }}
      className="w-fit text-sm font-semibold bg-red/50 rounded-md px-3 py-2"
    >
      Sign Out
    </button>
  );
}
