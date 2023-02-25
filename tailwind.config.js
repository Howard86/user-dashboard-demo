/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    './src/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      fontSize: {
        h2: ['2.75rem', { fontWeight: 700, lineHeight: '3.75rem' }],
      },
      colors: {
        role: '#7F85A2',
        background: '#F7F7F7',
        'darker-background': '#A4A8BB',
      },
      spacing: {
        6.5: '1.625rem',
        7.5: '1.875rem',
        15: '3.75rem',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        brand: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#3E6BEC',
          secondary: '#DBA97C',
          accent: '#FFFFFF',
          success: '#52D8B0',
        },
      },
    ],
  },
};
