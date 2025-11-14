import PropTypes from 'prop-types';

import cn from '@/lib/cn';

export default function StepList({ steps = [], className = '' }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <ol className={cn('space-y-4', className)}>
      {steps.map((step, index) => {
        const title = typeof step === 'string' ? null : step?.title;
        const description = typeof step === 'string' ? step : step?.description;
        return (
          <li
            key={title ?? description ?? index}
            className="flex items-start gap-4 rounded-card border border-sustain-cardBorder bg-white p-4 shadow-card md:p-5"
          >
            <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-sustain-green text-sm font-medium text-white">
              {index + 1}
            </span>
            <div>
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
