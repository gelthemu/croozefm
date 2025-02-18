import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["croozefm.com", "pbs.twimg.com"],
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
        hostname: "croozefm.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
