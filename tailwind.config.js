const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="light"]'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      colors: {
        transparent: 'transparent',
        black: '#1D1C1F',
        primary: 'rgb(61, 135, 245)',
        'primary-text': '#525154',
        'primary-light': 'rgb(243, 255, 242)',

        brown: '#713B12',
        grey: '#667085',
        darkGrey: '#344054',
        white: '#fff',

        'primary-brown': '#A15C07',
        'primary-bg': '#E3F6F5',
        'grey-bg': '#F9FAFB',
        yellow: '#FAC515',
        blue: '#272343',
        danger: '#B42318',
        info: 'rgb(156 163 175)',
        success: '#039855',
        'dashboard-bg': 'aliceblue',
        'border-color': '#dadada',
        'border-danger': '#FDA29B',
        modal: '#0009',
        'text-blue': 'blue'
      }
    }
  },
  plugins: []
};
