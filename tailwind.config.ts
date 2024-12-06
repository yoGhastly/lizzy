import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/scroll-shadow.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "muted-gray": "#919191",
        base: "#A1A1A1",
        novi: {
          primary: "#F5DD92",
          "50": "#fffbeb",
          "100": "#fef3c7",
          "300": "#fbd24e",
          "400": "#EBB134",
          "500": "#E4921C",
          "600": "#CA6F15",
          "700": "#A84F15",
          "950": "#421A08",
        },
      },
    },
  },
  plugins: [require("daisyui"), nextui()],
  daisyui: {
    themes: [
      {
        novi: {
          primary: "#570df8",
          "primary-focus": "#4506cb",
          "primary-content": "#ffffff",
          secondary: "#f000b8",
          "secondary-focus": "#bd0091",
          "secondary-content": "#ffffff",
          accent: "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",
          neutral: "#EBB134",
          "neutral-focus": "#F5DD92",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#d1d5db",
          "base-content": "#a1a1a1",
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
    ],
    darkTheme: false,
    base: false,
  },
};
export default config;
