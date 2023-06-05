const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    // app content
    `./**/*.{js,ts,jsx,tsx}`,
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // include packages if not transpiling
    // "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
      },
      keyframes: {
        drop: {
          '0%': { top: '0%'},
          '100%': { top: '95%'}
        },
        shrink: {
          '0%, 80%': {transform: 'scale(1)'},
          '100%': {transform: 'scale(0)'}
        }
      }
    },
  },
  plugins: [],
};

