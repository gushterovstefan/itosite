/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#FFFFFF',
          900: '#CBD5E1',
          800: '#94A3B8',
          dark: '#0F172A'
        },
        navy: {
          950: '#07111F',
          900: '#0B1726',
          800: '#101E31'
        },
        brand: {
          500: '#2563EB',
          600: '#1D4ED8'
        },
        accent: {
          sky: '#38BDF8',
          success: '#22C55E'
        }
      }
    }
  },
  plugins: []
}
