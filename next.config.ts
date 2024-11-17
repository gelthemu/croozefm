import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "croozefm.blob.core.windows.net",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
