/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: 'hsl(259, 100%, 65%)',
        },
        red: {
          400: 'hsl(0, 100%, 67%)',
        },
        gray: {
          100: 'hsl(0, 0%, 94%)',
          200: 'hsl(0, 0%, 86%)',
          500: 'hsl(0, 1%, 44%)',
        },
        black: 'hsl(0, 0%, 0%)',
        white: 'hsl(0, 100%, 100%)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
