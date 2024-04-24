/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar': '#020a01',
        'active-link': '#3e3f3f',
        'no-active': '#a8a8a8',
      }
    },
    screens: {
      "xs": "375px",
      "xm": "460px",
      "sm": "640px",
      "md": "768px",
      "lg": "911px",
      "xl": "1024px",
      "2xl": "1280px",
      "3xl": "1536px"
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

