import { NextRequest, NextResponse } from "next/server";
import { trackUnitClick } from "@/app/components/providers/units/utils/unitsTrack";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unitId = searchParams.get("unit_id");
    const redirectUrl = searchParams.get("redirect");

    if (!unitId || !redirectUrl) {
      console.error("Missing unit_id or redirect parameter");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const decodedRedirectUrl = decodeURIComponent(redirectUrl);
    new URL(decodedRedirectUrl);

    await trackUnitClick(unitId);
    console.log(`Redirecting to ${decodedRedirectUrl}`);

    return NextResponse.redirect(new URL(decodedRedirectUrl));
  } catch (error) {
    console.error("Unexpected error in click route:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
