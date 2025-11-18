// DEPRECATED: This footer implementation is no longer used.
// Please render pages through MainLayout with SiteFooter instead.
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const NAV_LINKS = (t) => [
  { href: '/about', label: t('header.navAbout') },
  { href: '/services', label: t('header.navServices') },
  { href: '/resources', label: t('header.navResources') },
  { href: '/blog', label: t('header.navBlog') },
];

const SUPPORT_LINKS = (t) => [
  { href: '/faq', label: t('header.navFaq') },
  { href: '/contact', label: t('header.navContact') },
  { href: '/services/how-coaching-works', label: t('footer.coachingApproach') },
];

export default function Footer() {
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();
  const navLinks = NAV_LINKS(t);
  const supportLinks = SUPPORT_LINKS(t);
  return (
    <footer className="mt-16 bg-sustain-surface text-slate-600 transition-colors dark:bg-sustain-surface-dark dark:text-sustain-text-dark/80">
      <div className="ss-container space-y-10 py-12">
        <div className="rounded-card rounded-2xl border border-sustain-cardBorder bg-sustain-surface p-6 shadow-md transition-colors dark:border-sustain-cardBorder-dark dark:bg-sustain-surface-dark md:flex md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-lg font-semibold text-sustain-text dark:text-sustain-text-dark">{t('footer.ctaTitle')}</p>
            <p className="text-sm text-slate-600 dark:text-sustain-text-dark/80">{t('footer.ctaBody')}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
            <Link href="/contact" className="ss-btn-primary">
              {t('actions.bookChat')}
            </Link>
            <Link href="/services" className="ss-btn-secondary">
              {t('actions.exploreServices')}
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))]">
          <div className="space-y-4">
            <div>
              <p className="text-base font-semibold text-sustain-text dark:text-sustain-text-dark">{t('footer.companyName')}</p>
              <p className="text-sm text-slate-600 dark:text-sustain-text-dark/80">{t('footer.companyDescription')}</p>
            </div>
            <div className="space-y-2 text-sm">
              <a href="mailto:contact@sustainsage.com" className="font-semibold text-sustain-green transition hover:text-sustain-greenDark">
                contact@sustainsage.com
              </a>
              <p>+44 (0)20 8638 7870</p>
              <p>{t('footer.locations')}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{t('footer.quickLinksTitle')}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sustain-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{t('footer.supportTitle')}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sustain-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-sustain-cardBorder pt-6 text-xs text-slate-500 dark:border-sustain-cardBorder-dark dark:text-sustain-text-dark/70">
          {t('footer.copyright', { year })}
        </div>
      </div>
    </footer>
  );
}
