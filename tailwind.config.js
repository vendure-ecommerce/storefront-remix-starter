const colors = require('tailwindcss/colors');

module.exports = {
  // content: ["./app/**/*.{js,ts,jsx,tsx}"],
  // theme: {
  //   extend: {},
  // },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
  mode: 'jit',
  content: ['./app/**/*.{ts,tsx}'],
  important: '#app',

  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.emerald,
      },
      animation: {
        dropIn: 'dropIn 0.2s ease-out',
      },
      keyframes: {
        dropIn: {
          '0%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
};
