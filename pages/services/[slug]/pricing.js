import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ServiceSubpageLayout from '@/components/services/ServiceSubpageLayout';
import { getServiceData, getServiceSlugs } from '@/lib/services';
import { getServicePricing } from '@/lib/serviceSubpages';

function PlanCard({ plan }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900">{plan.name}</h2>
        {plan.price ? <p className="text-lg font-semibold text-emerald-700">{plan.price}</p> : null}
      </div>
      {plan.description ? <p className="mt-3 text-sm leading-6 text-slate-700">{plan.description}</p> : null}
      {Array.isArray(plan.highlights) && plan.highlights.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {plan.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
              <span aria-hidden="true" className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    description: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default function ServicePricingPage({ service, pricing }) {
  const heading = pricing?.title ?? 'Pricing';
  const intro = pricing?.intro;
  const plans = Array.isArray(pricing?.plans) ? pricing.plans : [];
  const notes = Array.isArray(pricing?.notes) ? pricing.notes : [];

  return (
    <ServiceSubpageLayout service={service} title={heading} intro={intro} cta={pricing?.cta}>
      <div className="space-y-12">
        {plans.length > 0 ? (
          <div className="grid gap-6">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-700">
            Get in touch for a tailored proposal. We will recommend a cadence once we understand the goals you are working toward.
          </p>
        )}
        {notes.length > 0 ? (
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
            <h2 className="text-base font-semibold text-slate-900">Good to know</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </ServiceSubpageLayout>
  );
}

ServicePricingPage.propTypes = {
  service: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    hero: PropTypes.shape({
      subtitle: PropTypes.string,
      primaryCta: PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      }),
      secondaryCta: PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      }),
    }),
    cta: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
  pricing: PropTypes.shape({
    title: PropTypes.string,
    intro: PropTypes.string,
    plans: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string,
        description: PropTypes.string,
        highlights: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    notes: PropTypes.arrayOf(PropTypes.string),
    cta: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      primary: PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      }),
      secondary: PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      }),
      note: PropTypes.string,
    }),
  }),
};

ServicePricingPage.defaultProps = {
  pricing: null,
};

export async function getStaticPaths() {
  const slugs = getServiceSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  try {
    const service = getServiceData(params.slug);
    const pricing = getServicePricing(service.slug);

    return {
      props: {
        service,
        pricing,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
