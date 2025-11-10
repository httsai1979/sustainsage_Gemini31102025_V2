import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ServiceSubpageLayout from '@/components/services/ServiceSubpageLayout';
import { getServiceData, getServiceSlugs } from '@/lib/services';
import { getServiceAgreement } from '@/lib/serviceSubpages';

function AgreementSection({ section }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">{section.heading}</h2>
      {Array.isArray(section.paragraphs) && section.paragraphs.length > 0 ? (
        <div className="space-y-3 text-sm leading-6 text-slate-700">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

AgreementSection.propTypes = {
  section: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default function ServiceAgreementPage({ service, agreement }) {
  const heading = agreement?.title ?? 'Coaching agreement';
  const intro = agreement?.intro;
  const sections = Array.isArray(agreement?.sections) ? agreement.sections : [];
  const footer = agreement?.footer;

  return (
    <ServiceSubpageLayout service={service} title={heading} intro={intro} cta={agreement?.cta}>
      <div className="space-y-8">
        {sections.length > 0 ? (
          <div className="space-y-8">
            {sections.map((section) => (
              <AgreementSection key={section.heading} section={section} />
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-700">
            We keep agreements simple: confidentiality, cadence and fees are written down before paid work begins. Ask for a sample contract during your intro chat.
          </p>
        )}
        {footer ? <p className="text-sm leading-6 text-slate-700">{footer}</p> : null}
      </div>
    </ServiceSubpageLayout>
  );
}

ServiceAgreementPage.propTypes = {
  service: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  agreement: PropTypes.shape({
    title: PropTypes.string,
    intro: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        heading: PropTypes.string.isRequired,
        paragraphs: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    footer: PropTypes.string,
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

ServiceAgreementPage.defaultProps = {
  agreement: null,
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
    const agreement = getServiceAgreement(service.slug);

    return {
      props: {
        service,
        agreement,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
