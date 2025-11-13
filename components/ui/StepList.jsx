import PropTypes from 'prop-types';

import cn from '@/lib/cn';

export default function StepList({ steps = [], className = '' }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <ol className={cn('grid gap-4 sm:grid-cols-2', className)}>
      {steps.map((step, index) => {
        const title = typeof step === 'string' ? null : step?.title;
        const description = typeof step === 'string' ? step : step?.description;
        return (
          <li key={title ?? description ?? index} className="rounded-2xl bg-white p-5 shadow-card">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage/10 text-sm font-medium text-sage">
                {index + 1}
              </div>
              {title ? <span className="font-medium text-ink">{title}</span> : null}
            </div>
            {description ? <p className="text-[15px] leading-7 text-slate-600">{description}</p> : null}
          </li>
        );
      })}
    </ol>
  );
}

StepList.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ]),
  ),
  className: PropTypes.string,
};
