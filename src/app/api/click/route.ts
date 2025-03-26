import { NextRequest, NextResponse } from "next/server";
import { trackAdClick } from "@/app/components/providers/ads/utils/firebase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const adId = searchParams.get("ad_id");
    const redirectUrl = searchParams.get("redirect");

    console.log("Click Route Debugging:", {
      method: "GET",
      adId,
      redirectUrl,
      fullUrl: request.url,
      environment: process.env.NODE_ENV,
    });

    // Validate parameters with more detailed logging
    if (!adId) {
      console.error("Missing ad_id parameter");
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!redirectUrl) {
      console.error("Missing redirect parameter");
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Decode the redirect URL
    const decodedRedirectUrl = decodeURIComponent(redirectUrl);

    // Validate URL
    try {
      new URL(decodedRedirectUrl);
    } catch (urlError) {
      console.error("Invalid redirect URL", urlError);
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Track ad click
    await trackAdClick(adId);

    // Redirect to the ad's destination
    return NextResponse.redirect(new URL(decodedRedirectUrl));
  } catch (error) {
    console.error("Unexpected error in click route:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}