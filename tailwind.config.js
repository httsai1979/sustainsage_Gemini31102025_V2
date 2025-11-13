// tailwind.config.js
// [ ! ] 這是修復後的 V1.0 最終版本

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{json,md}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A6C56',
        sage: '#4A6C56',
        ink: '#1D1D1F',
        paper: '#F5F5F7',
        line: '#E6E6EA',
        'primary-dark': '#3A5543',
        'text-primary': '#1D1D1F',
        'text-secondary': '#6E6E73',
        link: '#0070C9',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)',
        soft: '0 2px 10px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      maxWidth: {
        wrap: '1200px',
      },
      spacing: {
        section: '5rem',
      },
    },
  },
  // [ ! ] 確保 plugins 陣列看起來像這樣
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
