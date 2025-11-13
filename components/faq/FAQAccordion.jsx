import PropTypes from 'prop-types';

import cn from '@/lib/cn';

export default function FAQAccordion({ items = [], className = '' } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className={cn('grid gap-3', className)}>
      {items.map((item, index) => {
        const title = item?.question ?? item?.q ?? item?.title;
        const answer = item?.answer ?? item?.a ?? item?.content ?? item?.body;
        return (
          <details key={title ?? index} className="rounded-2xl bg-white p-5 shadow-soft">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-base font-semibold text-ink">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sage/10 text-xs font-semibold text-sage">
                {index + 1}
              </span>
              {title}
            </summary>
            {answer ? <div className="mt-3 text-[15px] leading-7 text-slate-600">{answer}</div> : null}
          </details>
        );
      })}
    </div>
  );
}

FAQAccordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      answer: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

