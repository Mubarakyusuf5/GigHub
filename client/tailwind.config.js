/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui'],
        roboto: ['Roboto', 'ui-sans-serif', 'system-ui'],
        Opensans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
        montserrat: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        heroPattern: "url('/images/pattern30.png')",
        // 'footer-texture': "url('/img/footer-texture.pg')",
      },
    },
  },
  plugins: [],
}