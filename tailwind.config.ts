import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:        "#0D1B2A",
        "navy-mid":  "#0F2236",
        "navy-light":"#1A3A5C",
        "brand-blue":"#1A7FFF",
        "brand-bright":"#00BFFF",
        "brand-gold": "#FFB800",
      },
      fontFamily: {
        poppins:    ["var(--font-poppins)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(135deg, #1A7FFF, #00BFFF)",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        pulse:   "pulse 2s infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
