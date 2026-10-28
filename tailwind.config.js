/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,json}",
  ],
  safelist: [
    'from-amber-100', 'via-orange-50', 'to-amber-200',
    'from-emerald-50', 'via-teal-50', 'to-cyan-100',
    'from-sky-200', 'via-sky-100', 'to-emerald-100',
    'from-indigo-100', 'via-purple-50', 'to-pink-100',
    'from-teal-50', 'via-sky-50', 'to-amber-50',
    'from-sky-100', 'via-indigo-50', 'to-amber-100',
    'from-purple-100', 'to-pink-100',
  ],
  theme: {
    extend: {
      colors: {
        toddler: {
          yellow: '#FFD166',
          coral: '#EF476F',
          teal: '#06D6A0',
          blue: '#118AB2',
          navy: '#073B4C',
          purple: '#8338EC',
          orange: '#FB5607',
          mint: '#E0FBFC'
        }
      },
      fontFamily: {
        sans: ['Nunito', 'Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        toddler: ['Nunito', 'Quicksand', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)' },
          '70%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.6s ease-in-out infinite',
        pop: 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }
    },
  },
  plugins: [],
}
