import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="font-semibold text-neutral-800">SustainSage Group Ltd.</div>
          <div>ICF-aligned coaching. UK and Taiwan bilingual.</div>
          <div>© {year} SustainSage. All rights reserved.</div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/legal/privacy" className="hover:underline">{t('footer.privacy')}</Link>
          <Link href="/legal/terms" className="hover:underline">{t('footer.terms')}</Link>
          <span className="text-neutral-400">{t('footer.icf_note')}</span>
        </div>
      </div>
    </footer>
  );
}
