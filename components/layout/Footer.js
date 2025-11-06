import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} SustainSage Group Ltd.</div>
        <nav className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:text-black">
            {t('nav.about')}
          </Link>
          <Link href="/services" className="hover:text-black">
            {t('nav.services')}
          </Link>
          <Link href="/resources" className="hover:text-black">
            {t('nav.resources')}
          </Link>
          <Link href="/blog" className="hover:text-black">
            {t('nav.blog')}
          </Link>
          <Link href="/contact" className="hover:text-black">
            {t('nav.contact')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
