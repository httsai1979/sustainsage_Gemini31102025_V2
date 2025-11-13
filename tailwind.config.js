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
        moss: {
          50: '#F0F5F1',
          100: '#DCE7DE',
          200: '#C5D8C9',
          300: '#9FBEA6',
          400: '#7DA588',
          500: '#5F8A6E',
          600: '#4A6C56',
          700: '#395543',
          800: '#273C2E',
          900: '#17251B',
        },
        inkstone: '#0B1114',
        mist: '#F7F7FB',
        peach: '#FFDCC8',
        sand: '#F4EDE4',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'serif'],
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)',
        soft: '0 2px 10px rgba(0,0,0,0.06)',
        ssgCard: '0 10px 30px rgba(0,0,0,0.04)',
        floating: '0 25px 70px rgba(15,23,42,0.08)',
        glass: '0 45px 80px rgba(15,23,42,0.12)',
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
        prose: '65ch',
      },
      spacing: {
        section: '5rem',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(74,108,86,0.12), rgba(0,112,201,0.05))',
      },
      transitionTimingFunction: {
        'gentle-spring': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  // [ ! ] 確保 plugins 陣列看起來像這樣
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
