import PropTypes from 'prop-types';
import Link from 'next/link';

function ScenarioCard({ item }) {
  const { title, description } = item ?? {};

  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-5">
      {title ? (
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
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
  const primaryCta = data?.cta ?? data?.primaryCta;
  const secondaryCta = data?.secondaryCta;
  const hasPrimaryCta = Boolean(primaryCta?.href && primaryCta?.label);
  const hasSecondaryCta = Boolean(secondaryCta?.href && secondaryCta?.label);

  if (!scenarios.length) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
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
        {(hasPrimaryCta || hasSecondaryCta) && (
          <div className="mt-8 flex flex-col gap-3 text-sm font-semibold sm:flex-row">
            {hasPrimaryCta ? (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {hasSecondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-5 py-3 text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        )}
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
    cta: PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
    primaryCta: PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
    secondaryCta: PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  }),
};

WhatIsCoaching.defaultProps = {
  data: undefined,
};
