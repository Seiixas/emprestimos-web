/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          'primary': '#8F99A6',
        },
        border: {
          500: '#D4D4D4',
        },
        orange: {
          500: '#F3A126'
        },
        error: {
          500: '#cc0000'
        },
        background: {
          500: '#f6f6f6'
        },
        green: {
          500: '#21AE1E'
        },
        gray: {
          500: '#737373'
        },
    }
  },

  },
  plugins: [],
}

