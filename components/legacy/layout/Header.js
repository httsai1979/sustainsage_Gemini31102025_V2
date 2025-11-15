import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/resources', label: 'Resources' },
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
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => {
    const path = router.asPath.split('#')[0];
    if (href === '/') {
      return path === '/';
    }

    return path.startsWith(href);
  };

  const handleToggleLocale = () => {
    const currentLocale = router.locale === 'zh-TW' ? 'zh-TW' : 'en';
    const nextLocale = currentLocale === 'zh-TW' ? 'en' : 'zh-TW';

    router.push(router.asPath, router.asPath, { locale: nextLocale });
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icon-192x192.png"
            alt="SustainSage icon"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-ink">SustainSage</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-ink/70 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href)
                  ? 'text-primary'
                  : 'transition-colors hover:text-primary'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleToggle onToggle={handleToggleLocale} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleToggle variant="mobile" onToggle={handleToggleLocale} />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-ink transition hover:bg-slate-100"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-paper/95 backdrop-blur-sm md:hidden">
          <div className="flex justify-end p-4">
            <button
              type="button"
              className="rounded-full p-2 text-ink transition hover:bg-slate-100"
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
                    ? 'text-primary'
                    : 'text-ink transition-colors hover:text-primary'
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
