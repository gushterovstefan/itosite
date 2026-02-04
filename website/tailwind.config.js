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
          50: '#f2fbe9',
          100: '#e0f7c7',
          200: '#c2ef93',
          300: '#9ae35a',
          400: '#7bd72e',
          500: '#63c61f',
          600: '#4ea314',
          700: '#3e7f12',
          800: '#336414',
          900: '#2b5213'
        }
      }
    }
  },
  plugins: []
}
