/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      borderRadius: {
        'xl': '2rem', 
    },
  },
},
}
