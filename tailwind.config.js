// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Include Vite's entry file
    './src/**/*.{js,jsx,ts,tsx}', // Include all your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
