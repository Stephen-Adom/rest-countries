/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        baseDark1: "#1e2024",
        baseDark2: "#23272b",
      },
    },
  },
  plugins: [],
};
