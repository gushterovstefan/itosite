/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070d',
          900: '#0b1020',
          800: '#121a33'
        },
        brand: {
          50: '#f3f9ee',
          100: '#e3f1d8',
          200: '#c8e4ae',
          300: '#a6d276',
          400: '#8ac24f',
          500: '#74ad3c',
          600: '#5a8a2f',
          700: '#466a27',
          800: '#395520',
          900: '#2f451d'
        }
      }
    }
  },
  plugins: []
}
