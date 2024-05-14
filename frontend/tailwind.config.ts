import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontSize: {
        head_two: "clamp(1rem, 5vw, 2rem)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({
      nocompatible: false,
    }),
  ],
};
export default config;
