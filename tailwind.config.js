// tailwind.config.js
// [ ! ] 這是修復後的 V1.0 最終版本

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './content/**/*.{json,md}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
    },
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
        sustain: {
          green: '#4A6C56',
          greenDark: '#3A5443',
          bg: '#F5F5F7',
          'bg-dark': '#050816',
          text: '#1D1D1F',
          'text-dark': '#E5E7EB',
          accent: '#0070C9',
          cardBorder: '#E2E4EA',
          'cardBorder-dark': '#374151',
          surface: '#FFFFFF',
          'surface-dark': '#111827',
          'surface-muted': '#F9FAFB',
          'surface-muted-dark': '#1F2937',
          'surface-elevated': '#FDFDFE',
          'surface-elevated-dark': '#1F2937',
        },
        brand: {
          bg: '#F6F2EA',
          primary: '#C7A87A',
          primaryDark: '#B18F5F',
          sage: '#4A6C56',
          ink: '#1F2933',
        },
      },
      boxShadow: {
        card: '0 8px 20px rgba(15, 23, 42, 0.06)',
        soft: '0 2px 10px rgba(0,0,0,0.06)',
        ssgCard: '0 10px 30px rgba(0,0,0,0.04)',
        sustainCard: '0 8px 20px rgba(15, 23, 42, 0.06)',
        legacyCard: '0 8px 24px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        ssgCard: '16px',
        ssgButton: '9999px',
        card: '1rem',
      },
      maxWidth: {
        wrap: '1200px',
        page: '72rem',
      },
      spacing: {
        section: '5rem',
        'section-y': '3.75rem',
        'section-y-sm': '2.5rem',
      },
    },
  },
  // [ ! ] 確保 plugins 陣列看起來像這樣
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
