import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#1A2B4C", // Deep Navy
        foreground: "#E5E7E9", // Platinum Silver
        primary: {
          DEFAULT: "#2C405E", // Circuit Blue
          foreground: "#E5E7E9", // Platinum Silver
        },
        secondary: {
          DEFAULT: "#8A9199", // Tech Gray
          foreground: "#E5E7E9", // Platinum Silver
        },
        accent: {
          DEFAULT: "#4A90E2", // Electric Blue
          foreground: "#E5E7E9", // Platinum Silver
        },
        muted: {
          DEFAULT: "#C0C5CA", // Accent Silver
          foreground: "#8A9199", // Tech Gray
        },
        card: {
          DEFAULT: "#F5F7F9", // Surface Light
          foreground: "#1A2B4C", // Deep Navy
        },
        success: "#2E7D6F", // Success Green
        warning: "#E6B348", // Alert Amber
        darkSlate: "#0F1824", // Dark Slate
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1A2B4C 0%, #0F1824 100%)',
        'gradient-light': 'linear-gradient(135deg, #E5E7E9 0%, #C0C5CA 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;