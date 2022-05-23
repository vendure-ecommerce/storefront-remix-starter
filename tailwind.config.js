const colors = require('tailwindcss/colors');

module.exports = {
    // content: ["./app/**/*.{js,ts,jsx,tsx}"],
    // theme: {
    //   extend: {},
    // },
    plugins: [require('@tailwindcss/forms')],
    mode: 'jit',
    content: ['./app/**/*.{ts,tsx}'],
    important: '#app',

    theme: {
        extend: {
            colors: {
                primary: colors.sky,
                secondary: colors.emerald,
            },
        },
    },
};
