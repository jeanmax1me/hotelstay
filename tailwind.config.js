/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4cd89c",
        softpink: "#D36891",
        softgreen: "rgb(33, 149, 112)",
      }
    },
  },
  plugins: [],
}