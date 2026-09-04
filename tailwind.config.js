/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          DEFAULT: '#2563EB',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#0B1528',
          dark: '#1E40AF',
        },
        brand: {
          dark: '#080E1A',
          navy: '#0B132B',
          surface: '#0F172A',
          blue: '#1D4ED8',
          electric: '#2563EB',
          cyan: '#0EA5E9',
          light: '#38BDF8',
          card: '#111827',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        secondary: {
          DEFAULT: '#0284C7',
          dark: '#0369A1',
          light: '#38BDF8',
        },
        accent: {
          DEFAULT: '#0EA5E9',
          dark: '#0284C7',
          light: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      }
    },
  },
  plugins: [],
}
