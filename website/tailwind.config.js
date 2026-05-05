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
          50: '#f1fbe9',
          100: '#def7cb',
          200: '#bdeb95',
          300: '#86d94d',
          400: '#55c927',
          500: '#43B516',
          600: '#389912',
          700: '#2f7d11',
          800: '#286312',
          900: '#224f12'
        }
      }
    }
  },
  plugins: []
}
