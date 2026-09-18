/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        pitch: {
          dark: "#080C14",
          card: "#0F172A",
          elevated: "#151F33",
          border: "#1E293B",
          muted: "#334155",
        },
        pulse: {
          green: "#00E676",
          emerald: "#10B981",
          blue: "#00B0FF",
          cyan: "#06B6D4",
          red: "#FF3D71",
          amber: "#FFB300",
          purple: "#A855F7",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(0, 230, 118, 0.4)" },
          "50%": { boxShadow: "0 0 25px rgba(0, 230, 118, 0.8)" },
        }
      },
      animation: {
        "pulse-slow": "pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "glow": "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
