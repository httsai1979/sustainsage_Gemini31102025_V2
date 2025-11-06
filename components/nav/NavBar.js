import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LocaleSwitcher from './LocaleSwitcher';

const NAV = [
  { key: 'services', href: '/services' },
  { key: 'resources', href: '/resources' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
];

export default function NavBar() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'en';

  const isActive = (href, key) => {
    if (key === 'blog') return router.pathname.startsWith('/blog');
    return router.pathname === href;
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" locale={locale} className="font-semibold">
          SustainSage
        </Link>
        <nav aria-label="Primary navigation" className="hidden gap-6 md:flex">
          <Link
            href="/"
            locale={locale}
            className={`text-sm ${
              router.pathname === '/'
                ? 'font-semibold text-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {t('nav.home')}
          </Link>
          {NAV.map(({ key, href }) => {
            const active = isActive(href, key);
            return (
              <Link
                key={key}
                href={href}
                locale={locale}
                className={`text-sm ${
                  active
                    ? 'font-semibold text-black'
                    : 'text-gray-600 hover:text-black'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {t(`nav.${key}`)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            locale={locale}
            className="rounded-md bg-[#4A6C56] px-3 py-1.5 text-sm text-white"
          >
            {t('cta.book')}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
