import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Compass, List, X } from '@phosphor-icons/react';
import cn from '@/lib/cn';
import { getSiteContent, normaliseLocale, primaryNavigation } from '@/content/siteStrategy';

function SiteLogo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="SustainSage home">
      <span aria-hidden className="grid h-10 w-10 place-items-center rounded-[.85rem] bg-[#173d2f] text-[#f5f0e7] shadow-[0_8px_22px_rgba(16,37,29,.14)] transition-transform group-hover:-rotate-3">
        <Compass className="h-6 w-6" weight="regular" />
      </span>
      <span className="text-base font-bold tracking-[-.025em] text-[#10251d]">SustainSage</span>
    </Link>
  );
}

function LocaleSwitcher({ activeLocale, onChange, mobile = false }) {
  const options = [{ code: 'en-GB', label: 'EN' }, { code: 'zh-TW', label: '繁中' }];
  return (
    <div className={mobile ? 'flex items-center gap-2' : 'hidden items-center gap-1 lg:flex'} aria-label="Language">
      {options.map((locale) => (
        <button
          key={locale.code}
          type="button"
          aria-pressed={locale.code === activeLocale}
          onClick={() => onChange(locale.code)}
          className={cn(
            'min-h-10 rounded-[.7rem] px-3 text-xs font-bold transition-colors',
            locale.code === activeLocale ? 'bg-[#173d2f] text-white' : 'text-[#52665e] hover:bg-[#e2ebe5] hover:text-[#173d2f]',
          )}
        >
          {locale.label}
        </button>
      ))}
    </div>
  );
}

export default function SiteHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeLocale = normaliseLocale(router.locale);
  const content = getSiteContent(activeLocale);

  const changeLocale = (locale) => {
    setMenuOpen(false);
    router.push(router.asPath, undefined, { locale });
  };

  const isActive = (href) => {
    const path = router.asPath.split(/[?#]/)[0];
    return href === '/' ? path === '/' : path.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#173d2f]/10 bg-[#f5f7f3]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <SiteLogo />
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'relative py-2 text-sm font-semibold tracking-[-.01em] transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-[#d98b42] after:transition-transform',
                isActive(item.href) ? 'text-[#173d2f] after:scale-x-100' : 'text-[#4a5d55] after:scale-x-0 hover:text-[#173d2f] hover:after:scale-x-100',
              )}
            >
              {content.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher activeLocale={activeLocale} onChange={changeLocale} />
          <button type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-label={activeLocale === 'zh-TW' ? '開啟選單' : 'Open menu'} className="grid h-11 w-11 place-items-center rounded-[.8rem] bg-[#e2ebe5] text-[#173d2f] md:hidden">
            <List className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className={cn('fixed inset-0 z-[60] bg-[#10251d]/45 backdrop-blur-sm transition-opacity md:hidden', menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0')} onClick={() => setMenuOpen(false)} />
      <div className={cn('fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-[#f6f8f4] shadow-2xl transition-transform duration-300 md:hidden', menuOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex h-[72px] items-center justify-between border-b border-[#173d2f]/10 px-5">
          <SiteLogo />
          <button type="button" onClick={() => setMenuOpen(false)} aria-label={activeLocale === 'zh-TW' ? '關閉選單' : 'Close menu'} className="grid h-11 w-11 place-items-center rounded-[.8rem] bg-[#e2ebe5] text-[#173d2f]">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav aria-label="Mobile" className="grid gap-2 p-5">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={cn('rounded-[.9rem] px-5 py-4 text-lg font-semibold', isActive(item.href) ? 'bg-[#dfe9e2] text-[#173d2f]' : 'text-[#31483f]')}>
              {content.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="px-10 py-4"><LocaleSwitcher activeLocale={activeLocale} onChange={changeLocale} mobile /></div>
      </div>
    </header>
  );
}
