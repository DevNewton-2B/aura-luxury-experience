/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          white: '#FFFFFF',
          ivory: '#FFFFF0',
          cream: '#FFFDD0',
          beige: '#F5F5DC',
          blush: '#FEC5E5',
          nude: '#E3BC9A',
          rosegold: '#B76E79',
          lavender: '#E6E6FA'
        }
      }
    },
  },
  plugins: [],
}