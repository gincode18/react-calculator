/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "body-bg": "var(--body-bg)",
        "txt-color": "var(--txt-color)",
        "txt-white": "var(--txt-white)",
        "calc-res-color": "var(--calc-res-color)",
        "calc-btn-color": "var(--calc-btn-color)",
        "calc-bg": "var(--calc-bg)",
        
      },
    },
  },
  plugins: [],
}