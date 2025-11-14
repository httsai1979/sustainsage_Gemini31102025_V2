import PropTypes from 'prop-types';

import cn from '@/lib/cn';

export default function FAQAccordion({ items = [], className = '' } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className={cn('grid gap-4', className)}>
      {items.map((item, index) => {
        const title = item?.question ?? item?.q ?? item?.title;
        const answer = item?.answer ?? item?.a ?? item?.content ?? item?.body;
        return (
          <details
            key={title ?? index}
            className="group border border-sustain-cardBorder rounded-card bg-white shadow-sm"
          >
            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-left md:px-5 md:py-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sustain-green/10 text-xs font-semibold text-sustain-green">
                  {index + 1}
                </span>
                <span className="font-medium text-sustain-text">{title}</span>
              </div>
              <svg
                className="h-5 w-5 text-sustain-green transition-transform duration-200 group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            {answer ? (
              <div className="px-4 pb-4 text-sm text-slate-700 leading-relaxed md:px-5 md:pb-5 md:text-base">
                {answer}
              </div>
            ) : null}
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

