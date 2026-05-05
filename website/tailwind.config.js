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
          50: '#eff8ff',
          100: '#dff1ff',
          200: '#b8e5ff',
          300: '#78d4ff',
          400: '#22c3f6',
          500: '#009fe3',
          600: '#007fbd',
          700: '#006596',
          800: '#07557c',
          900: '#0b4767'
        },
        navy: {
          950: '#06111f',
          900: '#081a2e',
          850: '#0b223b',
          800: '#0d2b48',
          700: '#11395e'
        }
      }
    }
  },
  plugins: []
}
