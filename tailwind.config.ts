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
        "brand-red": "#DC2626",
        "brand-rose": "#E11D48",
        "bg-dark": "#0D0D0D",
        "bg-card-dark": "#1A1A1A",
        "text-primary": "#F5F5F5",
        "text-secondary": "#B0B0B0",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
