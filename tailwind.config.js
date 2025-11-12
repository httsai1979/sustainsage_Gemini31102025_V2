// tailwind.config.js
// [ ! ] 這是修復後的 V1.0 最終版本

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A6C56',
        'primary-dark': '#3A5543',
        'text-primary': '#1D1D1F',
        'text-secondary': '#6E6E73',
        link: '#0070C9',
        sage: '#4A6C56',
        background: '#F5F5F7',
        text: '#1D1D1F',
      },
    },
  },
  // [ ! ] 確保 plugins 陣列看起來像這樣
  plugins: [
    require('@tailwindcss/typography'),
  ],
};