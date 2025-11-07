import { useTranslation } from 'next-i18next';

export default function ICFNotice({ className = '', id }) {
  const { t } = useTranslation('common');

  return (
    <aside
      className={`mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm leading-relaxed text-neutral-700 shadow-sm ring-1 ring-neutral-100 ${className}`.trim()}
      id={id}
      role="note"
      aria-label={t('icfNotice.ariaLabel')}
    >
      <p>{t('icfNotice.paragraph1')}</p>
      <p className="mt-3">{t('icfNotice.paragraph2')}</p>
    </aside>
  );
}
