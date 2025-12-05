/** @type {import('tailwindcss').Config} */
export default {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        redhat: ['Red Hat Display', 'sans-serif'],
        raleway: [ 'Raleway', 'sans-serif'],
        cormorate: ["Cormorant Garamond", "serif"]
      },
      screens: {
        'custom': '450px',
        'custom2': '885px'
      },
    },
  },
  plugins: [],
}

