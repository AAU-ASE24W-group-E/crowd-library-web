module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  // darkMode: ['variant', '&:not(.light *)'], // force darkmode until we have a proper selector
  theme: {
    extend: {
      colors: {
        'dark-mode': '#050505',
        'dark-mode-inside': '#1f2937',
        'dark-mode-inside-hover': '#2a3748',
        'title-dark-mode-text': '#c7c7c7',
        'dark-mode-text': '#909090',
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
