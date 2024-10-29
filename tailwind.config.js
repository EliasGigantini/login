/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        "dash-expo": "cubic-bezier(0.47, 0.47, 0.53, 0.99)",
      },
    },
    colors: {
      pure: "#FFFFFF",
      white: "#F1F2F4",
      cream: "#E8EEF2",
      black: "#37393A",
      red: "#FF7673",
      blu: "#747BFF",
    },
    animation: {
      "pulse-fast": "pulse 900ms ease-in-out infinite",
    },
    variants: {
      extend: {
        visibility: ["group-hover"],
      },
    },
  },
  plugins: [],
};
