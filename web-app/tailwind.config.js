/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#094B72',
        'primary_25': '#094B7240',
        'primary_light': '#BAE0E2',
        'violet': '#5D50C6',
        'orange': '#FF5722',
        'danger': '#DA1004',
        'success': '#07A461',
        'ink': '#22313F',
        'black': '#0C0C20',
        'disable': '#3B3F48D9',
        'surface': '#CCCCCC',
        'white': '#F6FAF9',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        rootRootPadding: '16px', // Padding for a page at root
      },
      fontSize: {
        d1: ['4.5rem', {
          lineHeight: '5.75rem',
          fontWeight: '700',
        }],
        h1: ['3.5rem', {
          lineHeight: '4.5rem',
          fontWeight: '700',
        }],
        h2: ['3rem', {
          lineHeight: '4.5rem',
          fontWeight: '700',
        }],
        h3: ['2rem', {
          lineHeight: '2.5rem',
          fontWeight: '700',
        }],
        h4: ['1.5rem', {
          lineHeight: '2rem',
          fontWeight: '700',
        }],
        cXl: ['1.25rem', {
          lineHeight: '1.185rem',
          fontWeight: '400',
        }],
        cLg: ['1.125rem', {
          lineHeight: '1.75rem',
          fontWeight: '400',
        }],
        cBase: ['1rem', {
          lineHeight: '1.5rem',
          fontWeight: '400',
        }],
        cSm: ['0.875rem', {
          lineHeight: '1.125rem',
          fontWeight: '400',
        }],
      },
      boxShadow: {
        form: '0px 0px 35px 0px #0000001A',
        // max: '0px 4px 8px 0px #00000026',
        // mid: '0px 4px 8px 0px #0000001A',
        // min: '0px 2px 4px 0px #0000001A',
      },
    }
  },
  plugins: [],
}

