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
        primary: {
          DEFAULT: "#0D9488", // Teal cerah
          light: "#2DD4BF",
          dark: "#0F766E",
        },
        secondary: {
          DEFAULT: "#F97316", // Oranye sebagai aksen
          light: "#FB923C",
          dark: "#EA580C",
        },
        background: "#F8FAFC", // off-white
        surface: "#FFFFFF", // Warna untuk card
        text_primary: "#1E293B", // Teks gelap
        text_secondary: "#64748B", // Teks abu-abu
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
export default config;
