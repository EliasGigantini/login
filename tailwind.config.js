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
      shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
    },
    keyframes: {
      shake: {
        "10%, 90%": {
          transform: "translate3d(-1px, 0, 0)",
        },
        "20%, 80%": {
          transform: "translate3d(2px, 0, 0)",
        },
        "30%, 50%, 70%": {
          transform: "translate3d(-4px, 0, 0)",
        },
        "40%, 60%": {
          transform: "translate3d(4px, 0, 0)",
        },
      },
    },
    variants: {
      extend: {
        visibility: ["group-hover"],
      },
    },
  },
  plugins: [],
};
