module.exports = {
  theme: {
    fontFamily: {
      mono: ['IBM Plex Mono', 'monospace', 'ui-monospace', 'SFMono-Regular'],
    },
  },

  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  presets: [require('./utils/tailwind-preset')],
  plugins: [require('@tailwindcss/forms')],
};
