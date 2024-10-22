/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      pure: "#FFFFFF",
      white: "#F1F2F4",
      cream: "#E8EAED",
      black: "#090302",
      red: "#ED1C24",
      blu: "#4392F1",
    },
    animation: {
      "pulse-fast": "pulse 900ms ease-in-out infinite",
    },
  },
  plugins: [],
};
