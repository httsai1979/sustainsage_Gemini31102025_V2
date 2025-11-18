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
    <footer className="border-t border-sustain-navBorder bg-sustain-cardBg">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-8 text-sustain-textMuted sm:px-8 sm:py-10 md:flex-row md:justify-between">
        <div>
          <p className="text-lg font-semibold text-sustain-navText">SustainSage</p>
          <p className="mt-3 max-w-sm text-sm text-sustain-textMuted">{t('footer.philosophy')}</p>
        </div>
        <div className="flex flex-1 flex-col gap-8 md:flex-row md:justify-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sustain-navTextMuted">
              {t('footer.sitemapTitle')}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-sustain-primary"
                  >
                    {tNav(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sustain-navTextMuted">
              {t('footer.contactTitle')}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="mailto:hello@sustainsage.com" className="text-sustain-link transition hover:text-sustain-linkHover">
                  hello@sustainsage.com
                </a>
              </li>
              <li className="text-sustain-textMuted">Southsea, England</li>
              <li>
                <a
                  href="https://linkedin.com/company/sustainsage-group-ltd"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sustain-link transition hover:text-sustain-linkHover"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-sustain-navBg/90 py-4">
        <p className="text-center text-xs text-sustain-navTextMuted">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  );
}
