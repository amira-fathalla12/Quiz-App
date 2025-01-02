/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0D1321",
        linen: "#FFEDDF",
        olive: "#C5D86D",
      },
      fontFamily: { sans: ["Nunito", "serif"] },
      screens: {
        custom: {
          raw: "(min-width: 1024px) and (max-width: 1366px) and (min-height: 1366px)",
        },
      },
    },
  },
  plugins: [],
};
