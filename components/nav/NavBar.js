import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LocaleSwitcher from './LocaleSwitcher';

const NAV = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'resources', href: '/resources' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' }
];

export default function NavBar() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'en';

  const isActive = (item) => {
    if (item.key === 'home') return router.pathname === '/';
    if (item.key === 'blog') return router.pathname.startsWith('/blog');
    return router.pathname === item.href;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" locale={locale} className="font-semibold" aria-label="SustainSage home">
          SustainSage
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          {NAV.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.key}
                href={item.href}
                locale={locale}
                className={`text-sm ${active ? 'text-black font-medium' : 'text-neutral-600 hover:text-black'}`}
                aria-current={active ? 'page' : undefined}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" locale={locale} className="rounded-md bg-[#4A6C56] px-3 py-1.5 text-white text-sm">
            {t('cta.book')}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
