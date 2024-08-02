/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: {
          500: '#D4D4D4',
        },
        orange: {
          500: '#F3A126'
        },
        error: {
          500: '#cc0000'
        }
    }
  },

  },
  plugins: [],
}

