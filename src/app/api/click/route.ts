import { NextRequest, NextResponse } from "next/server";
import { trackAdClick } from "@/app/components/providers/ads/utils/adsTrack";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const adId = searchParams.get("ad_id");
    const redirectUrl = searchParams.get("redirect");

    if (!adId || !redirectUrl) {
      console.error("Missing ad_id or redirect parameter");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const decodedRedirectUrl = decodeURIComponent(redirectUrl);
    new URL(decodedRedirectUrl);

    await trackAdClick(adId);
    console.log(`Redirecting to ${decodedRedirectUrl}`);

    return NextResponse.redirect(new URL(decodedRedirectUrl));
  } catch (error) {
    console.error("Unexpected error in click route:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
