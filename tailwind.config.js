/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:    '#0D1B2A',
        charcoal:'#1B263B',
        arctic:  '#F4F6F9',
        teal:    '#00B4D8',
        'teal-deep': '#0096C7',
        'teal-light': '#48CAE4',
        slate:   '#5B6B7E',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
