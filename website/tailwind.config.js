/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#F8FAFC',
          900: '#CBD5E1',
          800: '#94A3B8',
          dark: '#0F172A'
        },
        navy: {
          950: '#07111F',
          900: '#0B1B2B',
          800: '#101E2F'
        },
        brand: {
          500: '#2F80ED',
          600: '#2F80ED'
        },
        accent: {
          sky: '#38BDF8',
          success: '#38BDF8'
        }
      }
    }
  },
  plugins: []
}
