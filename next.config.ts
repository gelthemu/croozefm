import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "croozefm.blob.core.windows.net",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "coverart.instant.audio",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "dims.apnews.com",
        pathname: "/dims4/**",
      },
      {
        protocol: "https",
        hostname: "i.insider.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
