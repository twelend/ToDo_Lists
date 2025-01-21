/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': 'var(--blue)',
        'black': 'var(--black)',
        'white': 'var(--white)',
        'text': 'var(--text)',
      },
      transitionProperty: {
        'width': 'width',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}