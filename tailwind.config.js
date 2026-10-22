/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        hospital: {
          950: "#020617",
          900: "#0f172a",
          850: "#172033",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
        },
        medical: {
          primary: "#0284c7",
          secondary: "#0d9488",
          accent: "#06b6d4",
          light: "#f0fdfa",
        },
        monitor: {
          bg: "#05090e",
          ecg: "#22c55e",
          spo2: "#38bdf8",
          nibp: "#f59e0b",
          resp: "#eab308",
          temp: "#f97316",
          grid: "rgba(34, 197, 94, 0.15)",
          alert: "#ef4444",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar": "radar 2s linear infinite",
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
