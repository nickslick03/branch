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
          '0%': { top: '0%', transform: 'translateX(-50%)'},
          '80%': {transform: 'translateX(-50%) scale(1)'},
          '100%': { top: '75%', transform: 'translateX(-50%) scale(0.2)' }
        }
      }
    },
  },
  plugins: [],
};

