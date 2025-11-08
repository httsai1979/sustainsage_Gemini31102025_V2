import { useTranslation } from 'next-i18next';

export default function Testimonials({ items = [] }) {
  const { t } = useTranslation('common');
  if (!items.length) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 md:px-8 md:py-10">
      <h2 className="text-xl font-bold text-slate-900">{t('testimonials.heading')}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <blockquote
            key={`${item.quote}-${index}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700"
          >
            <p className="leading-6">“{item.quote}”</p>
            {item.attribution && (
              <footer className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {item.attribution}
              </footer>
            )}
          </blockquote>
        ))}
      </div>
    </div>
  );
}
