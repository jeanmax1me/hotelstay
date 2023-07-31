/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
    'arima':  ['Arima', 'cursive', 'sans-serif'],
    'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: "#4cd89c",
        softpink: "#D36891",
        softgreen: "rgb(33, 149, 112)",
        maxgray: "rgb(24, 26, 27)",
        softgray: "#2a2e30",
        softblue: "#66FCF1",
        weirdblue: "#134743",
      }
    },
  },
  plugins: [],
}