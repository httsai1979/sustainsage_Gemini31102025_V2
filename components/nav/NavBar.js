import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LocaleSwitcher from './LocaleSwitcher';

const NAV_KEYS = ['home', 'services', 'resources', 'about', 'blog', 'contact'];

export default function NavBar() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'en';

  const isActive = (key, href) => {
    if (key === 'home') {
      return router.pathname === '/';
    }
    if (key === 'blog') {
      return router.pathname.startsWith('/blog');
    }
    return router.pathname === href;
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/75 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" locale={locale} className="font-semibold" aria-label="SustainSage home">
          SustainSage
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_KEYS.map((key) => {
            const href = key === 'home' ? '/' : `/${key}`;
            const active = isActive(key, href);
            return (
              <Link
                key={key}
                href={href}
                locale={locale}
                className={`text-sm ${active ? 'text-black' : 'text-neutral-600 hover:text-black'}`}
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
