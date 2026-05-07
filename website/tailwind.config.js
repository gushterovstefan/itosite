/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#F8FAFC',
          900: '#CBD5E1',
          800: '#94A3B8'
        },
        navy: {
          950: '#07111F',
          900: '#0B1728',
          800: '#101E33'
        },
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554'
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
