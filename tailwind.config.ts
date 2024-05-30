import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
          "400": "#EBB134",
          "500": "#E4921C",
          "600": "#CA6F15",
          "700": "#A84F15",
          "950": "#421A08",
        },
      },
    },
  },
  plugins: [],
};
export default config;
