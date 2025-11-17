import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

import cn from '@/lib/cn';
import ThemeToggle from '@/components/theme/ThemeToggle';

const DEFAULT_NAV_STRUCTURE = [
  { type: 'link', href: '/', labelKey: 'header.navHome' },
  { type: 'link', href: '/about', labelKey: 'header.navAbout' },
  { type: 'services' },
  { type: 'link', href: '/resources', labelKey: 'header.navResources' },
  { type: 'link', href: '/corporate', labelKey: 'header.navCorporate' },
  { type: 'link', href: '/blog', labelKey: 'header.navBlog' },
  { type: 'link', href: '/faq', labelKey: 'header.navFaq' },
  { type: 'link', href: '/contact', labelKey: 'header.navContact' },
];

const DEFAULT_MEGA_COLUMNS = [
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

const DEFAULT_MEGA_HIGHLIGHT = {
  title: 'Gentle support, wherever you are',
  description: 'Bilingual online coaching grounded in ethics, structure, and practical kindness.',
  ctaLabel: 'Explore services',
  ctaHref: '/services',
};

const LANGUAGE_OPTIONS = [
  { value: 'en-GB', fallbackLabel: 'English' },
  { value: 'zh-TW', fallbackLabel: '繁體中文' },
  { value: 'zh-CN', fallbackLabel: '简体中文' },
];

function LocaleToggle({ variant = 'desktop', value, onChange, label, options = [] }) {
  if (!options.length) {
    return null;
  }

  const wrapperClasses =
    variant === 'desktop'
      ? 'relative hidden items-center text-sustain-text dark:text-sustain-text-dark md:inline-flex'
      : 'relative inline-flex w-full items-center text-sustain-text dark:text-sustain-text-dark';

  const selectClasses =
    'appearance-none rounded-full border border-sustain-cardBorder bg-white px-3 py-1.5 pr-6 text-sm font-semibold leading-tight text-slate-700 shadow-sm transition focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-sustain-cardBorder-dark dark:bg-sustain-surface-dark dark:text-sustain-text-dark';

  const iconClasses =
    'pointer-events-none absolute right-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-slate-500 dark:text-sustain-text-dark/70';

  const handleChange = (event) => {
    const nextLocale = event.target.value;
    if (nextLocale && nextLocale !== value) {
      onChange(nextLocale);
    }
  };

  return (
    <label className={wrapperClasses}>
      <span className="sr-only">{label}</span>
      <select className={selectClasses} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className={iconClasses} aria-hidden />
    </label>
  );
}

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const servicesMenuRef = useRef(null);
  const currentLocale = typeof router.locale === 'string' && router.locale.length ? router.locale : 'en-GB';
  const availableLocales = Array.isArray(router.locales) && router.locales.length ? router.locales : LANGUAGE_OPTIONS.map((option) => option.value);
  const localeOptions = LANGUAGE_OPTIONS.filter((option) => availableLocales.includes(option.value)).map((option) => ({
    value: option.value,
    label: t(`header.languages.${option.value}`, option.fallbackLabel),
  }));

  const isActive = (href) => {
    const path = router.asPath.split('#')[0];
    if (href === '/') {
      return path === '/';
    }

    return path.startsWith(href);
  };

  const handleLocaleChange = (nextLocale) => {
    router.push(router.asPath, undefined, { locale: nextLocale });
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

  const navStructure = DEFAULT_NAV_STRUCTURE.map((item) =>
    item.type === 'link'
      ? {
          ...item,
          label: t(item.labelKey),
        }
      : item
  );

  const navLinks = navStructure.filter((item) => item.type === 'link');

  const megaColumns = t('header.mega.columns', { returnObjects: true });
  const resolvedMegaColumns = Array.isArray(megaColumns) && megaColumns.length ? megaColumns : DEFAULT_MEGA_COLUMNS;
  const highlight = t('header.mega.highlight', { returnObjects: true });
  const resolvedHighlight =
    highlight && typeof highlight === 'object'
      ? { ...DEFAULT_MEGA_HIGHLIGHT, ...highlight }
      : DEFAULT_MEGA_HIGHLIGHT;
  const mobileServicesLabel = t('header.mega.mobileCta', t('actions.exploreServices'));
  const openMenuLabel = t('header.openMenu');
  const closeMenuLabel = t('header.closeMenu');
  const localeLabel = t('header.languageSwitcherLabel', 'Choose language');

  const navLinkStyle = { fontSize: '0.85rem', letterSpacing: '-0.01em' };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-primary/40 bg-brand-bg/90 text-brand-ink backdrop-blur-[10px] shadow-sm transition-colors duration-300 dark:border-sustain-cardBorder-dark/60 dark:bg-sustain-surface-dark/90 dark:text-sustain-text-dark">
      <div className="ss-container flex items-center gap-4 py-3 lg:py-4">
        <div className="flex shrink-0 items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative block h-10 w-10">
              <Image src="/brand/ssg-logo-mark.svg" alt="SustainSage Group logo" fill className="object-contain" priority />
            </span>
            <span className="text-[0.95rem] font-semibold leading-tight tracking-tight text-brand-ink dark:text-sustain-text-dark">
              SustainSage
              <br className="hidden sm:inline" /> Group
            </span>
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center overflow-hidden lg:flex">
          <nav className="w-full max-w-4xl">
            <ul className="flex flex-nowrap items-center justify-center gap-4 whitespace-nowrap text-brand-ink">
              {navStructure.map((item, index) => {
                if (item.type === 'services') {
                  return (
                    <li
                      key={`services-${index}`}
                      ref={servicesMenuRef}
                      className="relative shrink-0"
                      onFocus={() => setMegaOpen(true)}
                      onBlur={handleMegaBlur}
                    >
                      <button
                        type="button"
                        style={navLinkStyle}
                        className={cn(
                          'nav-link inline-flex items-center rounded-full border border-transparent px-4 py-2 text-brand-ink transition-colors dark:text-sustain-text-dark',
                          megaOpen || isActive('/services')
                            ? 'bg-brand-primary/10 nav-link--active'
                            : 'hover:text-brand-sage dark:hover:text-white',
                        )}
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                        onClick={() => setMegaOpen((prev) => !prev)}
                      >
                        {t('header.navServices')}
                        <ChevronDownIcon className={cn('ml-1 h-4 w-4 transition', megaOpen ? 'rotate-180' : '')} />
                      </button>
                      {megaOpen ? (
                        <div className="absolute left-1/2 top-full z-30 mt-4 hidden w-[min(1000px,calc(100vw-2rem))] -translate-x-1/2 rounded-3xl border border-brand-primary/40 bg-brand-bg/95 p-8 text-brand-ink shadow-2xl lg:block dark:border-sustain-cardBorder-dark/60 dark:bg-sustain-surface-dark">
                          <div className="grid gap-8 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.2fr)]">
                            {resolvedMegaColumns.map((column) => (
                              <div key={column.title}>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-sage/90">
                                  {column.title}
                                </p>
                                <ul className="mt-4 space-y-3 text-sm">
                                  {column.links.map((link) => (
                                    <li key={link.href}>
                                      <Link
                                        href={link.href}
                                        className="block rounded-xl p-3 transition hover:bg-brand-primary/10 hover:text-brand-sage"
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
                            <div className="rounded-2xl bg-brand-sage p-6 text-white">
                              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">SustainSage</p>
                              <h3 className="mt-3 text-2xl font-semibold">{resolvedHighlight.title}</h3>
                              <p className="mt-3 text-sm text-white/80">{resolvedHighlight.description}</p>
                              <Link
                                href={resolvedHighlight.ctaHref}
                                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-ink"
                                onClick={() => setMegaOpen(false)}
                              >
                                {resolvedHighlight.ctaLabel}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </li>
                  );
                }

                return (
                  <li key={item.href} className="shrink-0">
                    <Link
                      href={item.href}
                      style={navLinkStyle}
                      className={cn(
                        'nav-link px-1 text-brand-ink transition-colors dark:text-sustain-text-dark',
                        isActive(item.href) && 'nav-link--active'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-brand-ink md:gap-3 dark:text-sustain-text-dark">
          <ThemeToggle className="hidden md:inline-flex" />
          <LocaleToggle
            value={currentLocale}
            onChange={handleLocaleChange}
            label={localeLabel}
            options={localeOptions}
          />
          <ThemeToggle variant="compact" className="md:hidden" />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-transparent p-2 text-brand-ink transition hover:border-brand-primary/60 hover:bg-brand-primary/10 dark:text-sustain-text-dark dark:hover:border-sustain-cardBorder-dark/70 dark:hover:bg-sustain-surface-dark/70 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label={openMenuLabel}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-brand-bg/95 text-brand-ink backdrop-blur-sm dark:bg-sustain-surface-dark/95 dark:text-sustain-text-dark lg:hidden">
          <div className="flex justify-end p-4">
            <button
              type="button"
              className="rounded-full p-2 text-brand-ink transition hover:bg-brand-primary/10 dark:text-sustain-text-dark dark:hover:bg-sustain-surface-dark/70"
              onClick={() => setMenuOpen(false)}
              aria-label={closeMenuLabel}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-6 px-6 pb-10 text-lg font-semibold">
            <div className="space-y-3">
              <Link
                href="/services"
                onClick={handleNavClick}
                className="block w-full rounded-2xl border border-brand-primary/50 bg-brand-bg px-4 py-3 text-left text-base font-semibold text-brand-ink shadow-sm transition hover:border-brand-primary dark:border-sustain-cardBorder-dark dark:bg-sustain-surface-dark dark:text-sustain-text-dark"
              >
                {mobileServicesLabel}
              </Link>
              {resolvedMegaColumns.map((column) => (
                  <div key={column.title}>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-sage/90">
                    {column.title}
                  </p>
                  <ul className="mt-2 space-y-3 text-base font-normal">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-xl bg-white/70 px-4 py-3 text-brand-ink transition hover:bg-brand-primary/10 dark:bg-sustain-surface-dark/80 dark:text-sustain-text-dark"
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
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn('nav-link text-lg w-fit text-brand-ink dark:text-sustain-text-dark', isActive(item.href) && 'nav-link--active')}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <ThemeToggle className="w-fit" />
            <LocaleToggle
              variant="mobile"
              value={currentLocale}
              onChange={handleLocaleChange}
              label={localeLabel}
              options={localeOptions}
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
