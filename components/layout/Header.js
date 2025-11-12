import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/resources', label: 'Free Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

function LocaleToggle({ variant = 'desktop', onToggle }) {
  const buttonClasses =
    variant === 'desktop'
      ? 'hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 md:inline-flex'
      : 'inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-base font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700';

  return (
    <button type="button" className={buttonClasses} onClick={onToggle}>
      <span aria-hidden>EN ⇄ 繁中</span>
      <span className="sr-only">Toggle language</span>
    </button>
  );
}

export default function Header() {
  const router = useRouter();
  const { locale = 'en', asPath } = router;
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => {
    const path = router.asPath.split('#')[0];
    if (href === '/') {
      return path === '/';
    }

    return path.startsWith(href);
  };

  const handleToggleLocale = () => {
    const nextLocale = locale === 'zh-TW' ? 'en' : 'zh-TW';

    router.push(asPath, asPath, { locale: nextLocale });
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          SustainSage
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
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
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <LocaleToggle onToggle={handleToggleLocale} />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm md:hidden">
          <div className="flex justify-end p-4">
            <button
              type="button"
              className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flex flex-col items-center gap-6 px-6 text-lg font-semibold">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={
                  isActive(item.href)
                    ? 'text-emerald-700'
                    : 'text-slate-900 transition-colors hover:text-emerald-700'
                }
              >
                {item.label}
              </Link>
            ))}
            <LocaleToggle variant="mobile" onToggle={handleToggleLocale} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
