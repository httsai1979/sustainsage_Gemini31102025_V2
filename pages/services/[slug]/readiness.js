import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ServiceSubpageLayout from '@/components/services/ServiceSubpageLayout';
import { getServiceData, getServiceSlugs } from '@/lib/services';
import { getServiceReadiness } from '@/lib/serviceSubpages';

function ReadinessSection({ section }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/95 p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
      {Array.isArray(section.items) && section.items.length > 0 ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

ReadinessSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default function ServiceReadinessPage({ service, readiness }) {
  const heading = readiness?.title ?? 'Readiness';
  const intro = readiness?.intro;
  const sections = Array.isArray(readiness?.sections) ? readiness.sections : [];
  const signals = Array.isArray(readiness?.signals) ? readiness.signals : [];

  return (
    <ServiceSubpageLayout service={service} title={heading} intro={intro} cta={readiness?.cta}>
      <div className="space-y-10">
        {sections.length > 0 ? (
          <div className="grid gap-6">
            {sections.map((section) => (
              <ReadinessSection key={section.title} section={section} />
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-700">
            Coaching is collaborative. Come ready to reflect honestly and experiment between sessions — we will shape the rest together.
          </p>
        )}
        {signals.length > 0 ? (
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
            <h2 className="text-base font-semibold text-slate-900">Before we begin</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </ServiceSubpageLayout>
  );
}

ServiceReadinessPage.propTypes = {
  service: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  readiness: PropTypes.shape({
    title: PropTypes.string,
    intro: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    signals: PropTypes.arrayOf(PropTypes.string),
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

ServiceReadinessPage.defaultProps = {
  readiness: null,
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
    const readiness = getServiceReadiness(service.slug);

    return {
      props: {
        service,
        readiness,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
