module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'ouroboros': 'ouroboros, serif',
        'plex': 'plex, sans-serif',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
