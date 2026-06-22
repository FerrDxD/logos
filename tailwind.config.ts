import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        surfaceHover: "var(--surface-hover)",
        border: "var(--border)",
        accent: "var(--accent)",
        accentHover: "var(--accent-hover)",
        accentForeground: "var(--accent-foreground)",
        primary: "var(--primary)",
        primaryHover: "var(--primary-hover)",
        alert: "var(--alert)",
        muted: "var(--muted)",
        mutedForeground: "var(--muted-foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
