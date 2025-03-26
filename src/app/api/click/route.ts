// src\app\api\click\route.ts
import { NextRequest, NextResponse } from "next/server";
import { trackAdClick } from "@/app/components/providers/ads/utils/firebase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const adId = searchParams.get("ad_id");
  const redirectUrl = searchParams.get("redirect");

  console.log("Click Route Params:", {
    adId,
    redirectUrl,
    fullUrl: request.url,
  });

  // Validate parameters
  if (!adId || !redirectUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Track ad click
  trackAdClick(adId);

  // Redirect to the ad's destination
  return NextResponse.redirect(new URL(redirectUrl));
}
