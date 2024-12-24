/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/*.ejs",            // Matches all HTML files in the root directory
    "./public/**/*.js",    // Matches all JS files inside the 'public' folder and its subfolders
  ],
  safelist: [
    'placeholder-red-400', // Safelist this class
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        'xl':'1246px',

      },
    },
  },
  plugins: [],
};
