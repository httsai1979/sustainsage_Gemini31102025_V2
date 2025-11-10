import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NAV_ITEMS = [
  { href: '/', label: 'header.navHome' },
  { href: '/services', label: 'header.navServices' },
  { href: '/resources', label: 'header.navResources' },
  { href: '/blog', label: 'header.navBlog' },
  { href: '/about', label: 'header.navAbout' },
  { href: '/contact', label: 'header.navContact' },
  { href: '/faq', label: 'header.navFaq' },
];

const LANGUAGE_OPTIONS = [
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'zh-CN', label: '简体中文' },
];

function LanguageSwitchPlaceholder({ variant = 'desktop' }) {
  const [value, setValue] = useState('en-GB');
  const baseClasses =
    variant === 'desktop'
      ? 'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm'
      : 'flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-base font-semibold text-slate-600 shadow-sm';

  return (
    <div className={variant === 'desktop' ? 'hidden items-center gap-3 md:flex' : 'flex w-full flex-col gap-2'}>
      <label className="sr-only" htmlFor={`language-switch-${variant}`}>
        Select language
      </label>
      <div className={baseClasses}>
        <select
          id={`language-switch-${variant}`}
          className="bg-transparent focus:outline-none"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label="Language selector (coming soon)"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Coming soon
        </span>
      </div>
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => {
    const path = router.asPath.split('#')[0];
    if (href === '/') return path === '/';
    return path.startsWith(href);
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
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
          <LanguageSwitchPlaceholder />
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
          <div className="mt-8 flex flex-col items-center gap-6 px-6 text-lg font-semibold">
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
            <LanguageSwitchPlaceholder variant="mobile" />
          </div>
        </div>
      )}
    </header>
  );
}
