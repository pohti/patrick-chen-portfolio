/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // <-- this line is critical for React projects
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
