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
        },
        paper: 'var(--color-paper)',
        background: 'var(--color-paper)',
        surface: 'var(--color-surface)',
        foreground: 'var(--color-ink)',
        ink: {
          DEFAULT: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
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
        card: '0 20px 55px rgba(15, 23, 42, 0.08)',
        soft: '0 2px 10px rgba(0,0,0,0.06)',
        ssgCard: '0 18px 50px rgba(15, 23, 42, 0.08)',
        sustainCard: '0 12px 40px rgba(15, 23, 42, 0.08)',
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
        pill: '999px',
      },
      maxWidth: {
        wrap: '1200px',
        page: '72rem',
        'screen-content': '100rem',
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
