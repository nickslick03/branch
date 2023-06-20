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
      animation: {
        floatOut: '2s steps(10) float',
        floatIn: '.5s steps(5) reverse float'
      },
      backgroundPosition: {
        bottomAndCenter: 'center 150%, center',
      },
      colors: {
        brandblue: colors.blue[500],
      },
      fontFamily: {
        retro: ['retro'],
      },
      keyframes: {
        float: {
          'from': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          'to': {
            opacity: '0',
            transform: 'translateY(-100px)'
          }
        }
      },
      transitionTimingFunction: {
        fiveSteps: 'steps(5)',
      }
    },
  },
  plugins: [],
};

