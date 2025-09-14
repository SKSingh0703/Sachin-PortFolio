/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors :{
        "primary" :"#0A192F",
        "secondary" : "#F97316",
        "tertiary" : "#54D688",
        "primary-light" : "#F8FAFC",
        "secondary-light" : "#EA580C",
        "tertiary-light" : "#059669",
      }
    },
    screens: {
      'lg': {'max': '2023px'},
      'sm': {'max': '1000px'},
    },
  },
  plugins: [],
}