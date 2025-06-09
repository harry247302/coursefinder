/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-color': '#9C2949',
        'gradient-start': '#9C2949',
        'gradient-end': '#FF69B4',
        'text-color':'#3A3742',
        'blue-main':'#264790',
        'gold-main':'#DB7E19',
        'pink-custom':'#ec37fc'
      },
    },
   
  },
  plugins: [],
  compilerOptions: {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

