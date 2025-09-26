/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // This is the line that fixes it
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}