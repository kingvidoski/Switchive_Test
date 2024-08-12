/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './Screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './navigator/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pumpkin: '#FF7415',
        deep_black: '#000',
        black_1: '#0D0E10',
        black_3: '#2F2F2F',
        dot_grey: '#17191D',
        grey_1: '#5e5e5e',
        blue_1: '#3B5998',
        border_grey: '#909090',
        grey_2: '#707070',
        red: '#C8171D',
      },
      fontFamily: {
        ROBOTO_300: 'Roboto-Light',
        ROBOTO_400: 'Roboto-Regular',
        ROBOTO_500: 'Roboto-Medium',
        ROBOTO_700: 'Roboto-Bold',
      },
    },
  },
  plugins: [],
};
