import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });

    const path = request.nextUrl.pathname;

    // Public paths - add any paths that don't require authentication
    const isPublicPath = path === "/user/login";

    // Check if the current path is a protected path
    const isProtectedPath =
        path.startsWith("/user/dashboard") || // Protect dashboard routes
        path.startsWith("/c/gallery") || // Protect gallery routes
        path.startsWith("/api/download"); // Protect download route

    // If trying to access a protected path without a token, redirect to login
    if (isProtectedPath && !token) {
        // Store the attempted URL to redirect back after login
        const redirectUrl = new URL("/user/login", request.url);
        redirectUrl.searchParams.set("url", encodeURIComponent(path));
        redirectUrl.searchParams.set("message", "login");
        return NextResponse.redirect(redirectUrl);
    }

    // If authenticated user tries to access login page, redirect to dashboard
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }

    return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
    matcher: [
        "/user/dashboard", // Protect dashboard route
        "/user/dashboard/:path*", // Protect all dashboard routes
        "/c/gallery/:path*", // Protect all gallery routes
        "/user/login",
        "/api/download",
    ],
};
