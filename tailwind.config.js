/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,pug}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ['halloween', 'fantasy'],
  }
}

