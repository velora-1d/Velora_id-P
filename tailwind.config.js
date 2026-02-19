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
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        accent: {
          DEFAULT: '#06B6D4', // Cyan-500
          dark: '#0891B2',    // Cyan-600
          light: '#22D3EE',   // Cyan-400
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
