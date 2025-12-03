// tailwind.config.js
// [ ! ] 這是修復後的 V1.0 最終版本
// [SSG BRAND] Updated palette and logo usage to match new SustainSage logo (warm sand).

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
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          soft: 'var(--color-primary-soft)',
          50: '#F9F6F1',
          100: '#F4EDE1',
          200: '#E6DBC8',
          300: '#D6C6AA',
          400: '#C9B28B',
          500: '#BDA789', // Base
          600: '#97866D',
          700: '#736653',
          800: '#52493B',
          900: '#332D25',
        },
        paper: 'var(--color-paper)',
        background: 'var(--color-paper)',
        surface: 'var(--color-surface)',
        foreground: 'var(--color-ink)',
        ink: {
          DEFAULT: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
          light: '#9CA3AF',
        },
        inkSoft: 'var(--color-ink-muted)',
        line: 'rgba(0, 0, 0, 0.06)',
        border: 'rgba(0, 0, 0, 0.08)',
        card: 'var(--color-surface)',
        'card-foreground': 'var(--color-ink)',
        muted: 'var(--color-ink-muted)',
        'muted-foreground': 'var(--color-ink-muted)',
        accent: {
          DEFAULT: 'var(--color-primary)',
          sage: '#4A6C56',
          sageLight: '#6B8E78',
          sageDark: '#365040',
        },
        sustain: {
          primary: 'var(--color-primary)',
          primarySoft: 'var(--color-primary-soft)',
          accent: '#4A6C56',
          pageBg: 'var(--color-paper)',
          cardBg: 'var(--color-surface)',
          cardBorder: 'rgba(0, 0, 0, 0.08)',
          'cardBorder-dark': '#374151',
          textMain: 'var(--color-ink)',
          textMuted: 'var(--color-ink-muted)',
          navBg: 'var(--color-surface)',
          navBorder: 'rgba(0, 0, 0, 0.08)',
          navText: 'var(--color-ink)',
          navTextMuted: 'var(--color-ink-muted)',
          link: 'var(--color-primary)',
          linkHover: 'var(--color-primary-dark)',
          green: '#4A6C56',
          greenDark: '#365040',
          bg: 'var(--color-paper)',
          'bg-dark': '#050816',
          text: 'var(--color-ink)',
          'text-dark': '#E5E7EB',
          surface: 'var(--color-surface)',
          'surface-dark': '#111827',
          'surface-muted': 'var(--color-primary-soft)',
          'surface-muted-dark': '#1F2937',
          'surface-elevated': 'var(--color-surface)',
          'surface-elevated-dark': '#1F2937',
        },
        brand: {
          bg: 'var(--color-primary-soft)',
          primary: 'var(--color-primary)',
          primaryDark: 'var(--color-primary-dark)',
          sage: '#4A6C56',
          ink: 'var(--color-ink)',
        },
      },
      boxShadow: {
        card: '0 20px 55px -10px rgba(15, 23, 42, 0.08)',
        soft: '0 4px 20px -2px rgba(0,0,0,0.06)',
        ssgCard: '0 18px 50px -10px rgba(15, 23, 42, 0.08)',
        sustainCard: '0 12px 40px -8px rgba(15, 23, 42, 0.08)',
        legacyCard: '0 8px 24px -4px rgba(0,0,0,0.08)',
        glow: '0 0 20px rgba(189, 167, 137, 0.3)',
        'glow-sage': '0 0 20px rgba(74, 108, 86, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'float': '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        ssgCard: '20px',
        ssgButton: '9999px',
        card: '1.25rem',
        pill: '999px',
      },
      maxWidth: {
        wrap: '1200px',
        page: '76rem',
        'screen-content': '100rem',
      },
      spacing: {
        section: '6rem',
        'section-y': '4.5rem',
        'section-y-sm': '3rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // [ ! ] 確保 plugins 陣列看起來像這樣
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
