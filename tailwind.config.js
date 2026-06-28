/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#f4f6f8",
          dark: "#0b0f14",
        },
        accent: {
          DEFAULT: "#0d9488",
          soft: "#ecfdf5",
          muted: "#99f6e4",
        },
      },
      boxShadow: {
        panel: "0 1px 3px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.04)",
        "panel-dark": "0 1px 3px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-vazirmatn)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
