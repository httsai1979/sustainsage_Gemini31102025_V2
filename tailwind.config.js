// tailwind.config.js
// [ ! ] 這是修復後的 V1.0 最終版本

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  // [ ! ] 確保 plugins 陣列看起來像這樣
  plugins: [
    require('@tailwindcss/typography'),
  ],
};