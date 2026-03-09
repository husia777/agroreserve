/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Основная зелёная палитра
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16A34A',  // primary
          700: '#15803D',  // primary-dark
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
          DEFAULT: '#16A34A',
          dark: '#15803D',
        },
        // Статусы заказов
        status: {
          new: '#3B82F6',        // blue-500
          confirmed: '#8B5CF6',  // violet-500
          picking: '#F59E0B',    // amber-500
          picked: '#10B981',     // emerald-500
          transit: '#06B6D4',    // cyan-500
          delivered: '#16A34A',  // green-600
          cancelled: '#EF4444',  // red-500
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
