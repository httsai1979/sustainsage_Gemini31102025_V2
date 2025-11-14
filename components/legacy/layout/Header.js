import { useState } from 'react';
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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-paper/90 backdrop-blur">
      <div className="ssg-container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          SustainSage Group
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-ink/70 transition-colors hover:text-primary'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:inline-flex"
          >
            Book a 20-minute chat
          </Link>
          <LocaleToggle onToggle={handleToggleLocale} />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-ink transition hover:bg-slate-100 md:hidden"
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
            <Link
              href="/contact"
              onClick={handleNavClick}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white"
            >
              Book a 20-minute chat
            </Link>
            <LocaleToggle variant="mobile" onToggle={handleToggleLocale} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
