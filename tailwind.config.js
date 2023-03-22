/** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: "class",
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
//   variants: {
//     width: ["responsive", "hover", "focus"],
//   },
// };

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#33AEB8",
        secondary: "#0CBCBE",
        bottomm: "#E86E17",
        bottomHover: "#E86112",
        "gray-ultra-light": "#f8f8f8",
        "gray-ultra-dark": "#333",
        "gray-medium": "#7b7b7b",
        danger: "#7b7b7b",
      },
    },
  },
  plugins: [],
  variants: {
    width: ["responsive", "hover", "focus"],
  },
};