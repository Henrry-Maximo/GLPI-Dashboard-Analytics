/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(18rem, 20rem) 1fr',
        card: 'max-content 1fr min-content',
        main: '2fr 1fr',
      },
      colors: {
        purple: '#a34532',
      },
    },
  },
  plugins: [],
}
