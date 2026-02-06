import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import cn from '@/lib/cn';
import i18nConfig from '../../next-i18next.config';

const NAV_LINKS = {
  primary: [
    { href: '/services', label: 'services', highlight: true },
    { href: '/resources', label: 'resources', highlight: true },
  ],
  secondary: [
    { href: '/blog', label: 'blog' },
    { href: '/about', label: 'about' },
    { href: '/faq', label: 'faq' },
    { href: '/contact', label: 'contact' },
  ]
};

const LOCALE_LABELS = {
  'en-GB': 'EN',
  'zh-TW': '繁體',
  'zh-CN': '简体',
};

function SiteLogo({ className = '' }) {
  return (
    <Link href="/" className={`flex items-center gap-3 active:scale-95 transition-transform ${className}`}>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-soft)] shadow-inner">
        <Image src="/brand/ssg-logo-mark.png" alt="SustainSage Group logo" width={24} height={24} />
      </span>
      <span className="text-sm font-bold tracking-tight text-[var(--color-ink)] sm:text-base">
        SustainSage
      </span>
    </Link>
  );
}

function LocaleSwitcher({ activeLocale, onChange, variant = 'desktop', localeOptions = [] }) {
  const baseClasses =
    variant === 'desktop'
      ? 'rounded-full px-3 py-1.5 text-[13px] font-bold transition-all duration-200 active:scale-95'
      : 'rounded-full px-5 py-2.5 text-[15px] font-semibold transition-all duration-200 active:scale-95';

  if (localeOptions.length <= 1) {
    return null;
  }

  return (
    <div className={variant === 'desktop' ? 'hidden items-center gap-1.5 md:flex' : 'flex items-center gap-2'}>
      {localeOptions.map((locale) => {
        const isActive = locale.code === activeLocale;
        return (
          <button
            key={locale.code}
            type="button"
            onClick={() => onChange(locale.code)}
            className={`${baseClasses} ${isActive
              ? 'bg-[var(--color-primary)] text-white shadow-md'
              : 'bg-white/50 text-[var(--color-ink-muted)] hover:bg-white hover:text-[var(--color-primary)] ring-1 ring-black/[0.05]'
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
  const { t: tNav } = useTranslation('nav');
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
    const onScroll = () => setIsScrolled(window.scrollY > 12);
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

  const headerClasses = cn(
    'fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b',
    isScrolled
      ? 'bg-white/95 backdrop-blur-md py-3 shadow-ssg border-emerald-950/5'
      : 'bg-[var(--color-surface)] py-5 border-transparent'
  );

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-10">
          <SiteLogo />

          {/* Layered Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-6 border-r border-slate-200 pr-6">
              {NAV_LINKS.primary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-[15px] font-bold tracking-tight transition-all duration-200',
                    isActive(item.href)
                      ? 'text-[var(--color-brand-sage)]'
                      : 'text-slate-900/90 hover:text-[var(--color-brand-sage)]'
                  )}
                >
                  {tNav(item.label)}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-5">
              {NAV_LINKS.secondary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-[14px] font-semibold transition-all duration-200',
                    isActive(item.href)
                      ? 'text-[var(--color-brand-sage)]'
                      : 'text-slate-500 hover:text-slate-900'
                  )}
                >
                  {tNav(item.label)}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <LocaleSwitcher
            activeLocale={activeLocale}
            onChange={handleLocaleChange}
            localeOptions={localeOptions}
          />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-700 md:hidden active:scale-90 transition-transform"
            onClick={() => setMenuOpen(true)}
            aria-label={t('header.openMenu')}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu with neutral transition */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[70] w-full max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out md:hidden',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <SiteLogo />
          <button
            type="button"
            className="rounded-full bg-slate-100 p-2 text-slate-700 active:scale-90 transition-transform"
            onClick={() => setMenuOpen(false)}
            aria-label={t('header.closeMenu')}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <p className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Core Services</p>
          {NAV_LINKS.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'flex items-center rounded-2xl px-4 py-4 text-[17px] font-bold transition-all',
                isActive(item.href)
                  ? 'bg-emerald-50 text-[var(--color-brand-sage)]'
                  : 'text-slate-900 active:bg-slate-50'
              )}
            >
              {tNav(item.label)}
            </Link>
          ))}
          <div className="my-4 h-px bg-slate-100 mx-4" />
          {NAV_LINKS.secondary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'flex items-center rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-all',
                isActive(item.href)
                  ? 'bg-emerald-50 text-[var(--color-brand-sage)]'
                  : 'text-slate-600 active:bg-slate-50'
              )}
            >
              {tNav(item.label)}
            </Link>
          ))}
        </div>
        <div className="absolute bottom-10 left-0 w-full px-8">
          <LocaleSwitcher
            activeLocale={activeLocale}
            onChange={handleLocaleChange}
            variant="mobile"
            localeOptions={localeOptions}
          />
        </div>
      </div>
    </header>
  );
}
