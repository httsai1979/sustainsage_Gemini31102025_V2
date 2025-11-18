import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const NAV_LINKS = [
  { href: '/', label: 'home' },
  { href: '/services', label: 'services' },
  { href: '/resources', label: 'resources' },
  { href: '/blog', label: 'blog' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
  { href: '/faq', label: 'faq' },
];

export default function SiteFooter() {
  const { t } = useTranslation('common');
  const { t: tNav } = useTranslation('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="ssg-site-footer">
      <div className="ssg-footer-inner">
        <div className="flex flex-1 flex-col gap-4 text-[var(--color-ink-muted)]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-soft)]">
              <Image src="/brand/ssg-logo-mark.png" alt="SustainSage Group logo" width={22} height={22} />
            </span>
            <div>
              <p className="text-base font-semibold text-[var(--color-ink)]">SustainSage Group</p>
              <p className="text-xs text-[var(--color-ink-muted)]">{t('footer.copyright', { year })}</p>
            </div>
          </div>
          <p className="max-w-sm text-sm text-[var(--color-ink-muted)]">{t('footer.philosophy')}</p>
        </div>
        <div className="flex flex-1 flex-col gap-8 md:flex-row md:justify-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
              {t('footer.sitemapTitle')}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {tNav(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
              {t('footer.contactTitle')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-muted)]">
              <li>
                <a href="mailto:hello@sustainsage.com" className="ssg-link">
                  hello@sustainsage.com
                </a>
              </li>
              <li>Southsea, England</li>
              <li>
                <a
                  href="https://linkedin.com/company/sustainsage-group-ltd"
                  target="_blank"
                  rel="noreferrer"
                  className="ssg-link"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
