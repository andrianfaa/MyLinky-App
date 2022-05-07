/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", "Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: ({ colors }) => ({
        ...colors,
        dark: {
          1: "#1B1B1B",
          2: "#3D3D3D",
          3: "#525252",
          4: "#808080",
        },
        light: {
          1: "#ffffff",
          2: "#F3F4F7",
          3: "#E2E4E9",
          4: "#C7CAD1",
        },
        success: "#06D6A0",
        warning: "#FFC233",
        error: "#EF476F",
        info: "#00B4D8",
        primary: {
          DEFAULT: "#25ced1",
          dark: "#1b9cac",
        },
      }),
    },
  },
  plugins: [],
};
