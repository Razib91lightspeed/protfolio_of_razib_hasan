/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ffbd39',
          dark: '#e5a81f'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: []
};