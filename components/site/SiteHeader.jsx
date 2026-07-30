import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import cn from '@/lib/cn';
import { getSiteContent, normaliseLocale, primaryNavigation } from '@/content/siteStrategy';

function SiteLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 transition-transform active:scale-[.98]">
      <span aria-hidden className="grid h-10 w-10 place-items-center rounded-[.85rem] bg-emerald-900 text-sm font-semibold text-[#f4e7d1]">SS</span>
      <span className="text-sm font-semibold tracking-tight text-slate-950 sm:text-base">SustainSage</span>
    </Link>
  );
}

function LocaleSwitcher({ activeLocale, onChange, mobile = false }) {
  const options = [{ code: 'en-GB', label: 'EN' }, { code: 'zh-TW', label: '繁中' }];
  return (
    <div className={mobile ? 'flex items-center gap-2' : 'hidden items-center gap-1 md:flex'}>
      {options.map((locale) => (
        <button
          key={locale.code}
          type="button"
          aria-pressed={locale.code === activeLocale}
          onClick={() => onChange(locale.code)}
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${locale.code === activeLocale ? 'bg-emerald-900 text-white' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-950'}`}
        >
          {locale.label}
        </button>
      ))}
    </div>
  );
}

export default function SiteHeader() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeLocale = normaliseLocale(router.locale);
  const content = getSiteContent(activeLocale);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const changeLocale = (locale) => {
    setMenuOpen(false);
    router.push(router.asPath, undefined, { locale });
  };

  const isActive = (href) => {
    const path = router.asPath.split(/[?#]/)[0];
    return href === '/' ? path === '/' : path.startsWith(href);
  };

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 border-b transition-all duration-300', isScrolled ? 'border-emerald-950/10 bg-[#fcfaf5]/95 py-3 shadow-[0_12px_36px_rgba(28,55,44,.08)] backdrop-blur-md' : 'border-transparent bg-[#f6f1e7]/95 py-5')}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-10">
          <SiteLogo />
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined} className={cn('text-sm font-semibold tracking-tight transition-colors', isActive(item.href) ? 'text-emerald-900 underline decoration-2 underline-offset-8' : 'text-slate-700 hover:text-emerald-900')}>
                {content.nav[item.key]}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher activeLocale={activeLocale} onChange={changeLocale} />
          <button type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-label={activeLocale === 'zh-TW' ? '開啟選單' : 'Open menu'} className="rounded-lg bg-emerald-50 p-2 text-emerald-950 md:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className={cn('fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm transition-opacity md:hidden', menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0')} onClick={() => setMenuOpen(false)} />
      <div className={cn('fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-[#fcfaf5] shadow-2xl transition-transform duration-300 md:hidden', menuOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between border-b border-emerald-950/10 px-6 py-5">
          <SiteLogo />
          <button type="button" onClick={() => setMenuOpen(false)} aria-label={activeLocale === 'zh-TW' ? '關閉選單' : 'Close menu'} className="rounded-lg bg-emerald-50 p-2 text-emerald-950">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav aria-label="Mobile" className="grid gap-1 p-6">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={cn('rounded-xl px-4 py-4 text-lg font-semibold', isActive(item.href) ? 'bg-emerald-100 text-emerald-950' : 'text-slate-800')}>
              {content.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="px-10 py-4"><LocaleSwitcher activeLocale={activeLocale} onChange={changeLocale} mobile /></div>
      </div>
    </header>
  );
}
