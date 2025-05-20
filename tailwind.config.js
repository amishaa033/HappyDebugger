/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      animation: {
        'gradient': 'gradient 3s ease infinite',
      },keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '10%': { transform: 'translateX(0%)' },
          '90%': { transform: 'translateX(-0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      scale: {
        '150': '1.5',
      },
    },
  },
  plugins: [],
}
