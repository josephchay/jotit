/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(220, 15%, 95%)',
          100: 'hsl(220, 14%, 86%)',
          200: 'hsl(220, 13%, 80%)',
          300: 'hsl(220, 12%, 70%)',
          400: 'hsl(220, 11%, 60%)',
          500: 'hsl(220, 10%, 45%)',
          600: 'hsl(220, 10%, 36%)',
          700: 'hsl(220, 10%, 24%)',
          800: 'hsl(220, 10%, 16%)',
          900: 'hsl(220, 10%, 6%)',
        },
      },
    },
  },
  plugins: [],
}

