import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        13: "52px",
      },
      height: {
        13: "52px",
      },
      width: {
        13: "52px",
      },
      colors: {
        primary: {
          DEFAULT: "#253BFF",
        },
        "arctic-blue": {
          600: "#253BFF",
        },
        "blue-gray": {
          50: "#F9FAFB",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          800: "#1D2939",
          900: "#101828",
        },
        "lime-green": {
          400: "#9FF443",
        },
      },
    },
  },
  plugins: [],
};
export default config;
