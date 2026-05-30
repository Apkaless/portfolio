import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bunker: "#060708",
        charcoal: "#141211",
        command: "#15191a",
        radar: "#7ddcff",
        amber: "#ff7a18",
        hazard: "#ff3f2e",
        steel: "#b8c5c6"
      },
      boxShadow: {
        "tactical-green": "0 0 34px rgba(125, 220, 255, 0.18)",
        "tactical-amber": "0 0 28px rgba(255, 122, 24, 0.18)",
        "defcon": "0 0 40px rgba(255, 63, 46, 0.3)"
      },
      dropShadow: {
        "glow-cyan": ["0 0 8px rgba(125, 220, 255, 0.6)", "0 0 20px rgba(125, 220, 255, 0.4)"],
        "glow-amber": ["0 0 8px rgba(255, 122, 24, 0.6)", "0 0 20px rgba(255, 122, 24, 0.4)"],
        "glow-hazard": ["0 0 8px rgba(255, 63, 46, 0.8)", "0 0 20px rgba(255, 63, 46, 0.5)"]
      },
      backgroundImage: {
        "tactical-grid":
          "linear-gradient(rgba(125,220,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,24,.055) 1px, transparent 1px)",
        "scanline":
          "linear-gradient(180deg, transparent 0%, rgba(125,220,255,.09) 50%, transparent 100%)"
      },
      keyframes: {
        sweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(18px, -22px, 0) scale(1.04)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.38" },
          "50%": { opacity: "0.82" }
        },
        "crt-flicker": {
          "0%": { opacity: "0.08" },
          "5%": { opacity: "0.15" },
          "10%": { opacity: "0.05" },
          "15%": { opacity: "0.2" },
          "100%": { opacity: "0.1" }
        },
        "hex-dump": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" }
        },
        "defcon-pulse": {
          "0%, 100%": { boxShadow: "inset 0 0 20px rgba(255, 63, 46, 0.2)" },
          "50%": { boxShadow: "inset 0 0 80px rgba(255, 63, 46, 0.6)" }
        }
      },
      animation: {
        sweep: "sweep 12s linear infinite",
        drift: "drift 12s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        "crt-flicker": "crt-flicker 0.15s infinite",
        "hex-dump": "hex-dump 3s linear infinite",
        "defcon-pulse": "defcon-pulse 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
