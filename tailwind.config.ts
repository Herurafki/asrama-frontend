import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
