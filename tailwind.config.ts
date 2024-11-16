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
          "linear-gradient(to right, #151515 0%, #252525 50%, #151515 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
