import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        emerald: {
          950: "#022c22",
          900: "#064e3b",
          800: "#065f46",
          700: "#047857",
          600: "#059669",
          500: "#10b981",
        },
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        ivory: {
          50:  "#fefefe",
          100: "#fdf8f0",
          200: "#faf3e3",
          300: "#f5ead0",
        },
        sand: {
          100: "#f5f0e8",
          200: "#ede4d3",
          300: "#d9cbb8",
          400: "#c4b49d",
        },
        navy: {
          900: "#0a1628",
          800: "#0f2044",
          700: "#1a3260",
          600: "#1e3a8a",
        },
        // Semantic aliases
        brand: {
          primary:    "#059669",   // emerald-600
          secondary:  "#d97706",   // gold-600
          background: "#fdf8f0",   // ivory-100
          surface:    "#ffffff",
          text:       "#0a1628",   // navy-900
          muted:      "#6b7280",
        },
      },
      fontFamily: {
        sans:    ["Inter", "sans-serif"],
        urdu:    ["Noto Nastaliq Urdu", "serif"],
        arabic:  ["Noto Naskh Arabic", "serif"],
        display: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        "hero-pattern":     "url('/images/hero-bg.webp')",
        "emerald-gradient": "linear-gradient(135deg, #022c22 0%, #065f46 50%, #047857 100%)",
        "gold-gradient":    "linear-gradient(135deg, #78350f 0%, #b45309 50%, #d97706 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in":    "fadeIn 0.6s ease-out",
        "slide-up":   "slideUp 0.5s ease-out",
        "shimmer":    "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
