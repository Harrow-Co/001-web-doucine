/** @type {import('tailwindcss').Config} */
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0EADCD',
          50: '#E6F9FC',
          100: '#CCF3F9',
          200: '#99E7F3',
          300: '#66DBED',
          400: '#33CFE7',
          500: '#0EADCD',
          600: '#0B8BA3',
          700: '#08687A',
          800: '#054651',
          900: '#032329'
        },
        secondary: {
          DEFAULT: '#FFBB18',
          50: '#FFEED9',
          100: '#FFE7C5',
          200: '#FFDB9D',
          300: '#FFCF75',
          400: '#FFC54D',
          500: '#FFBB18',
          600: '#E5A700',
          700: '#B28300',
          800: '#805E00',
          900: '#4D3900'
        },
        danger: {
          DEFAULT: '#A64258',
          50: '#F4DEE2',
          100: '#ECBEC7',
          200: '#DC8C9C',
          300: '#CC5970',
          400: '#BC2745',
          500: '#A64258',
          600: '#85344B',
          700: '#64273E',
          800: '#431A31',
          900: '#220D24'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
      borderWidth: {
        '3': '3px',
      }
    }
  },
  plugins: [
    forms,
    typography,
  ],
} 