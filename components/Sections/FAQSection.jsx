import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

function FAQCard({ item }) {
  return (
    <article className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">{item.a}</p>
    </article>
  );
}

FAQCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    q: PropTypes.string,
    a: PropTypes.string,
  }).isRequired,
};

export default function FAQSection({
  categories = [],
  limit,
  title,
  intro,
  id,
  className = '',
}) {
  const { t } = useTranslation('faq');
  const items = t('items', { returnObjects: true });

  const filtered = useMemo(() => {
    const asArray = Array.isArray(items) ? items : [];
    const categorySet = Array.isArray(categories) && categories.length > 0 ? new Set(categories) : null;
    let result = categorySet
      ? asArray.filter((item) => (item?.category ? categorySet.has(item.category) : false))
      : asArray;

    if (typeof limit === 'number') {
      result = result.slice(0, limit);
    }

    return result;
  }, [items, categories, limit]);

  const resolvedTitle = title ?? t('title', 'Questions you might have');
  const resolvedIntro = intro ?? t('intro', 'Short, honest answers to get you started.');

  if (!filtered || filtered.length === 0) {
    return null;
  }

  return (
    <section id={id} className={`bg-white py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-5xl px-6">
        {resolvedTitle ? (
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{resolvedTitle}</h2>
        ) : null}
        {resolvedIntro ? <p className="mt-4 text-base leading-7 text-slate-600">{resolvedIntro}</p> : null}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((item) => (
            <FAQCard key={item.id || item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

FAQSection.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  title: PropTypes.string,
  intro: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};
