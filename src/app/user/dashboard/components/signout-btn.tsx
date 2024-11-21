"use client";

import { signOut } from "next-auth/react";

export function SignOutBtn() {
  return (
    <button
      onClick={() => signOut({
          redirect: true,
          callbackUrl: "/user/login",
        })
      }
      className="w-fit text-sm font-semibold bg-red/50 rounded-md px-3 py-2"
    >
      Sign Out
    </button>
  );
}
