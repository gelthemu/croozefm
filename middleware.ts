import { NextResponse } from "next/server";

export function middleware() {
  // This middleware doesn't need to modify the request,
  // but ensures environment variables are loaded properly
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
