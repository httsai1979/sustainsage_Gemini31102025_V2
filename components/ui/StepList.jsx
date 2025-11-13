import PropTypes from 'prop-types';

import Card from './Card';

export default function StepList({ steps = [] }) {
  if (!steps.length) return null;
  return (
    <ol className="space-y-6">
      {steps.map((step, index) => {
        const title = typeof step === 'string' ? null : step?.title;
        const description = typeof step === 'string' ? step : step?.description;
        return (
          <li key={title ?? description ?? index} className="grid gap-4 sm:grid-cols-[auto,1fr] sm:items-start">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-base font-semibold text-sage">
              {index + 1}
            </span>
            <Card title={title} className="p-5 sm:p-6" subtitle={null} prose>
              {description ? <p className="text-sm text-slate-600">{description}</p> : null}
            </Card>
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
};
