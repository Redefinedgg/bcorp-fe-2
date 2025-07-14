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
        background: "var(--background)",
        foreground: "var(--foreground)",
        orange: "#F1830E"
      },
      fontFamily: {
        signate: ["Signate Grotesk", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        dropdownNavBar: {
          '0%': { bottom: '0px' },
          '100%': { bottom: '-200px' },
        }
      },
      animation: {
        dropdownNavBar: 'dropdownNavBar 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
