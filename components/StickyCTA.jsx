import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function StickyCTA() {
  const { t } = useTranslation('common');

  return (
    <div className="fixed bottom-6 left-1/2 z-30 w-[90%] max-w-xl -translate-x-1/2 rounded-2xl border border-emerald-200 bg-white/95 p-4 shadow-lg backdrop-blur">
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{t('stickyCta.title')}</p>
          <p className="text-sm text-slate-700">{t('stickyCta.subtitle')}</p>
        </div>
        <Link
          href="/contact?from=home-sticky"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          {t('stickyCta.button')}
        </Link>
      </div>
    </div>
  );
}
