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
        light: "#ffffff",
        red: "#ff0000",
        gray: "#252525",
        dark: "#151515",
      },
      fontFamily: {
        apex: ["Apex Regular", "var(--font-oswald)"],
        oswald: ["var(--font-oswald)"],
        montserrat: ["var(--font-montserrat)"],
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, #151515 0%, #282828 50%, #151515 100%)",
        "custom-gradient-reverse":
          "linear-gradient(to bottom right, #282828 0%, #101010 100%)",
        "custom-gradient-btn":
          "linear-gradient(to right, #282828 0%, #4d0000 50%, #282828 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
