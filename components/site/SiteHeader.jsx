import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import i18nConfig from '../../next-i18next.config';

const NAV_ITEMS = [
  { href: '/', label: 'header.navHome' },
  { href: '/about', label: 'header.navAbout' },
  { href: '/services', label: 'header.navServices' },
  { href: '/resources', label: 'header.navResources' },
  { href: '/blog', label: 'header.navBlog' },
  { href: '/contact', label: 'header.navContact' },
];

const LOCALE_LABELS = {
  en: 'EN',
  'zh-TW': '繁體',
  'zh-CN': '简体',
};

function LocaleSwitcher({ activeLocale, onChange, variant = 'desktop', localeOptions = [] }) {
  const baseClasses =
    variant === 'desktop'
      ? 'rounded-xl px-3 py-2 text-sm font-semibold transition-colors'
      : 'rounded-xl px-4 py-2 text-base font-semibold transition-colors';

  if (localeOptions.length <= 1) {
    return null;
  }

  return (
    <div className={variant === 'desktop' ? 'hidden items-center gap-2 md:flex' : 'flex items-center gap-2'}>
      {localeOptions.map((locale) => {
        const isActive = locale.code === activeLocale;
        return (
          <button
            key={locale.code}
            type="button"
            onClick={() => onChange(locale.code)}
            className={`${baseClasses} ${
              isActive
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            {locale.label}
          </button>
        );
      })}
    </div>
  );
}

export default function SiteHeader() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLocale = router.locale ?? router.defaultLocale ?? 'en';
  const localeOptions = useMemo(() => {
    const configuredLocales = i18nConfig?.i18n?.locales ?? [];
    return configuredLocales
      .filter((code) => LOCALE_LABELS[code])
      .map((code) => ({ code, label: LOCALE_LABELS[code] }));
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLocaleChange = (locale) => {
    setMenuOpen(false);
    router.push(router.asPath, undefined, { locale });
  };

  const isActive = (href) => {
    const path = router.asPath.split('#')[0];
    if (href === '/') return path === '/';
    return path.startsWith(href);
  };

  const headerClasses = [
    'fixed inset-x-0 top-0 z-40 border-b border-transparent transition-colors duration-300',
    isScrolled ? 'bg-white/90 backdrop-blur border-slate-200 shadow-sm' : 'bg-white',
  ].join(' ');

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          SustainSage
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href)
                  ? 'text-emerald-700'
                  : 'text-slate-600 transition-colors hover:text-emerald-700'
              }
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <LocaleSwitcher
            activeLocale={activeLocale}
            onChange={handleLocaleChange}
            localeOptions={localeOptions}
          />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label={t('header.openMenu')}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm md:hidden">
          <div className="flex justify-end p-4">
            <button
              type="button"
              className="rounded-xl p-2 text-slate-700"
              onClick={() => setMenuOpen(false)}
              aria-label={t('header.closeMenu')}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-8 flex flex-col items-center gap-6 text-lg font-semibold">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={
                  isActive(item.href)
                    ? 'text-emerald-700'
                    : 'text-slate-900 transition-colors hover:text-emerald-700'
                }
              >
                {t(item.label)}
              </Link>
            ))}
            <LocaleSwitcher
              activeLocale={activeLocale}
              onChange={handleLocaleChange}
              variant="mobile"
              localeOptions={localeOptions}
            />
          </div>
        </div>
      )}
    </header>
  );
}
