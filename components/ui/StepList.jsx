import PropTypes from 'prop-types';

import cn from '@/lib/cn';

export default function StepList({ steps = [], className = '' }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <ol
      className={cn(
        'grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
    >
      {steps.map((step, index) => {
        const title = typeof step === 'string' ? null : step?.title;
        const description = typeof step === 'string' ? step : step?.description;
        return (
          <li
            key={title ?? description ?? index}
            className="flex h-full w-full flex-col gap-3 rounded-card rounded-2xl border border-slate-100 bg-white p-4 shadow-md md:p-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sustain-green text-sm font-semibold text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-1 flex-col">
              {title ? <p className="font-medium text-sustain-text">{title}</p> : null}
              {description ? (
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{description}</p>
              ) : null}
            </div>
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
