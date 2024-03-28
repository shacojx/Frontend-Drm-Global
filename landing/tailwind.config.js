const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        25: '6.25rem',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        stroke: '#C0C0C0',
        primary: '#5ED4F9',
        secondary: '#8771E9',
        grey: '#6D6F7F',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
