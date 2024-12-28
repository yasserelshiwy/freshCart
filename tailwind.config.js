/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        "primay-50": "#9dde9d",
        "primay-100": "#85d685",
        "primay-200": "#6cce6c",
        "primay-300": "#54c654",
        "primay-400": "#3bbd3b",
        "primay-500": "#23b523",

        "primay-600": "#0aad0a",
        "primay-700": "#099c09",
        "primay-800": "#088a08",
        "primay-900": "#077907",
      },
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: [],
};
