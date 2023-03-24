/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins:
    [
      require("tailwind-scrollbar-hide"),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
}
