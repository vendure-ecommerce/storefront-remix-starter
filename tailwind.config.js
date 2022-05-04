
module.exports = {
  // content: ["./app/**/*.{js,ts,jsx,tsx}"],
  // theme: {
  //   extend: {},
  // },
  plugins: [require('@tailwindcss/forms')],
  mode: "jit",
  content: ["./app/**/*.{ts,tsx}"],
  important: "#app",

  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#FE7C22",
        secondary: "#115E5C",
      },
    },
  },
};
