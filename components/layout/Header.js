import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NAV_LINKS = [
  { href: '/', labelKey: 'header.navHome' },
  { href: '/about', labelKey: 'header.navAbout' },
  { href: '/service', labelKey: 'header.navService' },
  { href: '/resources', labelKey: 'header.navResources' },
  { href: '/blog', labelKey: 'header.navBlog' },
  { href: '/contact', labelKey: 'header.navContact' },
];

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'tc', label: 'TC' },
  { code: 'sc', label: 'SC' },
];

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const activeLocale = router.locale ?? router.defaultLocale ?? 'en';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isNavLinkActive = (href) => {
    const currentPath = router.asPath.split('?')[0];
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  };

  const handleLangChange = (newLocale) => {
    router.push(router.asPath, undefined, { locale: newLocale });
  };

  const headerClasses = [
    'fixed inset-x-0 top-0 z-40 w-full transition-all duration-300 ease-in-out',
    isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white',
  ].join(' ');

  const desktopNavLinkClasses = (href) =>
    [
      'text-base font-medium transition-colors',
      isNavLinkActive(href)
        ? 'font-semibold text-primary'
        : 'text-text-secondary hover:text-primary-dark',
    ].join(' ');

  const desktopLocaleButtonClasses = (code) =>
    [
      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
      activeLocale === code
        ? 'bg-primary text-white'
        : 'text-text-secondary hover:bg-gray-100',
    ].join(' ');

  const mobileLocaleButtonClasses = (code) =>
    [
      'rounded-md px-3 py-2 text-base font-medium transition-colors',
      activeLocale === code
        ? 'bg-primary text-white'
        : 'text-text-secondary hover:bg-gray-100',
    ].join(' ');

  return (
    <header className={headerClasses}>
      <div className="content-container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="SustainSage Group Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-semibold text-text-primary">SustainSage Group Ltd.</span>
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link key={href} href={href} className={desktopNavLinkClasses(href)}>
              <span>{t(labelKey)}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden space-x-2 md:flex">
          {LOCALES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => handleLangChange(code)}
              className={desktopLocaleButtonClasses(code)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)} className="rounded-md p-2 text-gray-700">
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">{t('header.openMenu', 'Open navigation')}</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsMobileMenuOpen(false)} className="rounded-md p-2 text-gray-700">
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">{t('header.closeMenu', 'Close navigation')}</span>
            </button>
          </div>

          <div className="mt-16 flex flex-col space-y-6 text-center text-2xl font-semibold">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={
                  isNavLinkActive(href)
                    ? 'font-semibold text-primary'
                    : 'text-text-primary hover:text-primary-dark'
                }
              >
                <span>{t(labelKey)}</span>
              </Link>
            ))}

            <div className="mt-8 flex justify-center space-x-2 border-t border-gray-300 pt-8">
              {LOCALES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => handleLangChange(code)}
                  className={mobileLocaleButtonClasses(code)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
