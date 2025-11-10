import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 md:flex-row md:justify-between md:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-900">SustainSage</p>
          <p className="mt-3 max-w-sm text-sm text-slate-600">{t('footer.philosophy')}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-emerald-700">
            {t('footer.boundariesTitle')}
          </p>
          <div className="mt-1 space-y-1 text-xs">
            <p className="max-w-xs text-slate-500">{t('footer.boundariesNotice')}</p>
            <Link href="/legal/coaching-boundaries" className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline">
              {t('footer.boundariesLink')}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-8 md:flex-row md:justify-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('footer.sitemapTitle')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/">{t('header.navHome')}</Link></li>
              <li><Link href="/services">{t('header.navServices')}</Link></li>
              <li><Link href="/resources">{t('header.navResources')}</Link></li>
              <li><Link href="/blog">{t('header.navBlog')}</Link></li>
              <li><Link href="/about">{t('header.navAbout')}</Link></li>
              <li><Link href="/contact">{t('header.navContact')}</Link></li>
              <li><Link href="/faq">{t('header.navFaq')}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t('footer.contactTitle')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a href="mailto:hello@sustainsage.com" className="hover:text-emerald-700">
                  hello@sustainsage.com
                </a>
              </li>
              <li>Southsea, England</li>
              <li>
                <a
                  href="https://linkedin.com/company/sustainsage-group-ltd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white/90 py-4">
        <p className="text-center text-xs text-slate-500">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  );
}
