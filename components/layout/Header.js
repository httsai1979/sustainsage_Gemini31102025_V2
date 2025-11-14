import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

import cn from '@/lib/cn';

const NAV_STRUCTURE = [
  { type: 'link', href: '/', label: 'Home' },
  { type: 'link', href: '/about', label: 'About' },
  { type: 'services' },
  { type: 'link', href: '/resources', label: 'Resources' },
  { type: 'link', href: '/blog', label: 'Blog' },
  { type: 'link', href: '/faq', label: 'FAQ' },
  { type: 'link', href: '/contact', label: 'Contact' },
];

const NAV_LINKS = NAV_STRUCTURE.filter((item) => item.type === 'link');

const MEGA_COLUMNS = [
  {
    title: 'Coaching options',
    links: [
      { label: '1:1 Coaching', href: '/services', description: 'Bespoke coaching journeys rooted in structure.' },
      { label: 'Small groups', href: '/services#group', description: 'Gather peers navigating similar turning points.' },
      { label: 'Self-paced resources', href: '/resources', description: 'Worksheets and prompts you can start today.' },
    ],
  },
  {
    title: 'Support for you',
    links: [
      { label: 'Mid-career reset', href: '/services#mid-career', description: 'Realign your work with new priorities.' },
      { label: 'New to the UK', href: '/services#new-to-uk', description: 'Translate your story across cultures.' },
      { label: 'Graduates & returners', href: '/services#graduates', description: 'Build confidence entering new chapters.' },
    ],
  },
  {
    title: 'Explore topics',
    links: [
      { label: 'Career change', href: '/#topics', description: 'Test directions without rushing decisions.' },
      { label: 'Confidence & boundaries', href: '/#topics', description: 'Hold space for rest and clarity.' },
      { label: 'Living in the UK', href: '/#topics', description: 'Belonging while adapting to systems.' },
    ],
  },
];

const MEGA_HIGHLIGHT = {
  title: 'Gentle support, wherever you are',
  description: 'Bilingual online coaching grounded in ethics, structure, and practical kindness.',
  ctaLabel: 'Explore services',
  ctaHref: '/services',
};

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
  const [megaOpen, setMegaOpen] = useState(false);
  const servicesMenuRef = useRef(null);

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
    setMegaOpen(false);
  };

  useEffect(() => {
    if (!megaOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMegaOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [megaOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!megaOpen) return;
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target)) {
        setMegaOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [megaOpen]);

  const handleMegaBlur = (event) => {
    if (!servicesMenuRef.current) return;
    if (!servicesMenuRef.current.contains(event.relatedTarget)) {
      setMegaOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-paper/95 backdrop-blur">
      <div className="ss-container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          SustainSage Group
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_STRUCTURE.map((item, index) => {
            if (item.type === 'services') {
              return (
                <div
                  key={`services-${index}`}
                  ref={servicesMenuRef}
                  className="relative"
                  onFocus={() => setMegaOpen(true)}
                  onBlur={handleMegaBlur}
                >
                  <button
                    type="button"
                    className={cn(
                      'nav-link rounded-full px-4 py-2 transition-colors',
                      megaOpen || isActive('/services') ? 'bg-sustain-green/10 nav-link--active' : 'hover:text-primary',
                    )}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((prev) => !prev)}
                  >
                    Services
                    <ChevronDownIcon className={cn('h-4 w-4 transition', megaOpen ? 'rotate-180' : '')} />
                  </button>
                  {megaOpen ? (
                    <div className="absolute left-1/2 top-full z-30 mt-4 hidden w-[min(1000px,calc(100vw-2rem))] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl lg:block">
                      <div className="grid gap-8 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.2fr)]">
                        {MEGA_COLUMNS.map((column) => (
                          <div key={column.title}>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-green/80">
                              {column.title}
                            </p>
                            <ul className="mt-4 space-y-3 text-sm">
                              {column.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="block rounded-xl p-3 transition hover:bg-sustain-green/5 hover:text-primary"
                                    onClick={() => setMegaOpen(false)}
                                  >
                                    <p className="font-semibold">{link.label}</p>
                                    <p className="text-xs text-slate-600">{link.description}</p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="rounded-2xl bg-sustain-text p-6 text-white">
                          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">SustainSage</p>
                          <h3 className="mt-3 text-2xl font-semibold">{MEGA_HIGHLIGHT.title}</h3>
                          <p className="mt-3 text-sm text-white/80">{MEGA_HIGHLIGHT.description}</p>
                          <Link
                            href={MEGA_HIGHLIGHT.ctaHref}
                            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-sustain-text"
                            onClick={() => setMegaOpen(false)}
                          >
                            {MEGA_HIGHLIGHT.ctaLabel}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('nav-link', isActive(item.href) && 'nav-link--active')}
              >
                {item.label}
              </Link>
            );
          })}
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
            className="inline-flex items-center justify-center rounded-full p-2 text-ink transition hover:bg-slate-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-paper/95 backdrop-blur-sm lg:hidden">
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
          <div className="mt-6 flex flex-col gap-6 px-6 pb-10 text-lg font-semibold">
            <div className="space-y-3">
              <Link
                href="/services"
                onClick={handleNavClick}
                className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-base font-semibold"
              >
                Explore services
              </Link>
              {MEGA_COLUMNS.map((column) => (
                <div key={column.title}>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-green/80">
                    {column.title}
                  </p>
                  <ul className="mt-2 space-y-3 text-base font-normal">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-xl bg-white/60 px-4 py-3 text-ink transition hover:bg-sustain-green/10"
                          onClick={handleNavClick}
                        >
                          <p className="font-semibold">{link.label}</p>
                          <p className="text-sm text-slate-600">{link.description}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-base">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn('nav-link text-lg w-fit', isActive(item.href) && 'nav-link--active')}
                >
                  {item.label}
                </Link>
              ))}
            </div>
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
