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
        paper: '#FFFFFF',
        background: '#F5F5F7',
        ink: '#1D1D1F',
        inkSoft: '#4B4B4F',
        line: '#E6E6EA',
        accent: '#0070C9',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)',
        soft: '0 2px 10px rgba(0,0,0,0.06)',
        ssgCard: '0 10px 30px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        ssgCard: '16px',
        ssgButton: '9999px',
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
