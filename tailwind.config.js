/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        'dark' : '#0D1321',
        'linen' : '#FFEDDF',
        'olive': '#C5D86D'
      }
    },
  },
  plugins: [],
}