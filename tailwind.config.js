module.exports = {
  content: [
    "./*.php",
    "./templates/**/*.php",
    "./pages/**/*.php",
    "./ui-script.js",
    "./generation-script.js"
  ],
  theme: {
    extend: {
      colors: {
        // Here is your new color palette
        'primary': '#62D487',
        'primary-hover': '#3CB371',
        'text-main': '#232323', // Renamed 'text-color' to avoid conflicts
        'text-secondary': '#6D7680',
        'background': '#F8FAF9',
        'surface': '#FFFFFF',
        'border': '#E2EFE7',
      }
    },
  },
  plugins: [],
}