import { NextRequest, NextResponse } from "next/server";
import { trackAdClick } from "@/app/components/providers/ads/utils/adsTrack";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const adId = searchParams.get("ad_id");
    const redirectUrl = searchParams.get("redirect");

    if (!adId) {
      console.error("Missing ad_id parameter");
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!redirectUrl) {
      console.error("Missing redirect parameter");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const decodedRedirectUrl = decodeURIComponent(redirectUrl);

    try {
      new URL(decodedRedirectUrl);
    } catch (urlError) {
      console.error("Invalid redirect URL", urlError);
      return NextResponse.redirect(new URL("/", request.url));
    }

    trackAdClick(adId);

    return NextResponse.redirect(new URL(decodedRedirectUrl));
  } catch (error) {
    console.error("Unexpected error in click route:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
