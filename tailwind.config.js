/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#f97316',
          500: '#ea580c',
          600: '#c2410c',
        },
      },
    },
  },
  plugins: [],
}
