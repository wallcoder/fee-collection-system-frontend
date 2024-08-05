/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      screens:{
        'smartphone': '320px',
        'smartphone-md': '375px',

        'smartphone-lg': '425px',
        'smartphone-landscape': '480px',
        'smartphone-xl': '600px',
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '992px'
      },
      colors: {
        'college-blue': '#016DBC',
        'admin-pink': '#FFC6D3',
        'admin-light-pink': '#fff3f9',
        'college-white': "#FFFFFF",
        'hover-blue': "#0d7ecf",
        'college-black': "#000000",
        'college-grey': "rgb(202, 202, 202)"
  
      },
      boxShadow: {
        'right': '0px 0 3px rgba(0, 0, 0, 0.1)'
      }
      
    },
  },
  plugins: [],
}

