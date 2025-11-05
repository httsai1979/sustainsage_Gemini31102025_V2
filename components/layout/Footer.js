import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="content-container section-padding">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="SustainSage Group Logo" width={32} height={32} className="h-8 w-8" />
              <span className="text-lg font-semibold text-slate-900">SustainSage Group Ltd.</span>
            </Link>
            <p className="caption mt-4 text-slate-600">{t('footer.philosophy')}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
              {t('footer.sitemapTitle')}
            </h4>
            <ul className="caption space-y-2">
              <li>
                <Link href="/" className="hover:text-emerald-700">
                  {t('header.navHome')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-700">
                  {t('header.navAbout')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-700">
                  {t('header.navServices')}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-emerald-700">
                  {t('header.navResources')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-700">
                  {t('header.navBlog')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-700">
                  {t('header.navContact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
              {t('footer.contactTitle')}
            </h4>
            <ul className="caption space-y-2 text-slate-600">
              <li>
                <a href="mailto:hc.tsai@sustainsage-group.com" className="hover:text-emerald-700">
                  hc.tsai@sustainsage-group.com
                </a>
              </li>
              <li>+44-7510-317-505</li>
              <li>Southsea, England</li>
              <li>
                <a
                  href="https://linkedin.com/company/sustainsage-group-ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2"
                >
                  <svg
                    className="h-5 w-5 text-slate-500 transition-colors group-hover:text-emerald-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732A1.75 1.75 0 116.501 3a1.75 1.75 0 010 3.732zM20 19h-3v-5.602c0-3.376-4-3.524-4 0V19h-3V8h3v1.765c1.395-2.586 7-2.777 7 2.476V19z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="caption mt-12 text-center text-slate-500">
          <p>{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
