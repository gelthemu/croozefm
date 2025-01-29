export default function manifest() {
  return {
    name: "91.2 Crooze FM",
    short_name: "Crooze FM",
    description: "Home of Western Uganda's Biggest Radio Station.",
    start_url: "/",
    icons: [
      {
        src: "/_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#151515",
    background_color: "#151515",
    display: "standalone",
  };
}
