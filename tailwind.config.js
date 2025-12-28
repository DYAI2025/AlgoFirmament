/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './AlgoFirm-index.html',
    './*.js',
    './src/**/*.{js,html}'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#6366f1',
        'bg-dark': '#050505'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
};