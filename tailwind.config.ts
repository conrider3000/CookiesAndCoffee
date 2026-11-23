import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: "#fbbf24",
          blue: "#60a5fa",
          dark: "#18181b",
          border: "#27272a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
