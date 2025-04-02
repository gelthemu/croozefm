import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "geltaverse.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cfm.geltaverse.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "croozefm.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cfmpulse-fxavapfdeybedqdt.z01.azurefd.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "transaudio.geltaverse.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "coverart.instant.audio",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "croozefm.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "instagram.fnbo1-1.fna.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent.fnbo1-1.fna.fbcdn.net",
        pathname: "/**",
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
      {
        protocol: "https",
        hostname: "livesport-ott-images.ssl.cdn.cra.cz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ntv.co.ug",
        pathname: "/resource/**",
      },
      {
        protocol: "https",
        hostname: "www.monitor.co.ug",
        pathname: "/resource/**",
      },
      {
        protocol: "https",
        hostname: "static.clubs.nfl.com",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "e0.365dm.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.reuters.com",
        pathname: "/resizer/**",
      },
      {
        protocol: "https",
        hostname: "www.arnoldpalmerinvitational.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nbssport.co.ug",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "newvision-media.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a57.foxnews.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a57.foxsports.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "golf.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.theeastafrican.co.ke",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
