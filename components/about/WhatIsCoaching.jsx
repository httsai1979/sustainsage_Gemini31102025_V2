import PropTypes from 'prop-types';

function ScenarioCard({ item }) {
  const { title, description } = item ?? {};

  return (
    <article className="flex h-full flex-col gap-3 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      {title ? (
        <h3 className="text-base font-semibold tracking-tight text-slate-900">{title}</h3>
      ) : null}
      {description ? <p className="text-sm leading-6 text-slate-700">{description}</p> : null}
    </article>
  );
}

const scenarioShape = {
  title: PropTypes.string,
  description: PropTypes.string,
};

ScenarioCard.propTypes = {
  item: PropTypes.shape(scenarioShape).isRequired,
};

export default function WhatIsCoaching({ data }) {
  const scenarios = data?.scenarios ?? [];
  if (!scenarios.length) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {data?.eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{data.eyebrow}</p>
        ) : null}
        {data?.title ? (
          <h2 className="mt-2 scroll-mt-24 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {data.title}
          </h2>
        ) : null}
        {data?.description ? (
          <p className="mt-4 text-base leading-7 text-slate-700">{data.description}</p>
        ) : null}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {scenarios.map((scenario, index) => (
            <ScenarioCard key={scenario.title ?? index} item={scenario} />
          ))}
        </div>
        {data?.disclaimer ? (
          <p className="mt-8 text-xs leading-5 text-slate-500">{data.disclaimer}</p>
        ) : null}
      </div>
    </section>
  );
}

WhatIsCoaching.propTypes = {
  data: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    scenarios: PropTypes.arrayOf(PropTypes.shape(scenarioShape)),
    disclaimer: PropTypes.string,
  }),
};

WhatIsCoaching.defaultProps = {
  data: undefined,
};
