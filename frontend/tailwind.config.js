/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#2563eb',
          secondary: '#8b5cf6',
        },
      },
    },
    plugins: [],
  }
  