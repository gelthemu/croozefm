import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#F5F5F5",
        red: "#B71C1C",
        gray: "#303030",
        dark: "#151515",
      },
      fontFamily: {
        sans: [
          "var(--fonts-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "profile-image":
          "url('https://croozefm.blob.core.windows.net/images/profile-bg-image.png')",
      },
    },
  },
  plugins: [],
};

export default config;
