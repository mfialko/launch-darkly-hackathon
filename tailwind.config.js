/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path according to your project structure
    ],
    theme: {
      extend: {
        fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
          },
    
      },
    },
    plugins: [],
  }