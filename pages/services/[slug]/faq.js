import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import FAQAccordion from '@/components/faq/FAQAccordion';
import ServiceSubpageLayout from '@/components/services/ServiceSubpageLayout';
import { getServiceData, getServiceSlugs } from '@/lib/services';
import { getServiceFaqContent } from '@/lib/serviceSubpages';

export default function ServiceFaqPage({ service, faq }) {
  const heading = faq?.title ?? 'Frequently asked questions';
  const intro = faq?.description;
  const items = Array.isArray(faq?.items) ? faq.items : [];

  return (
    <ServiceSubpageLayout service={service} title={heading} intro={intro} cta={faq?.cta}>
      <div className="space-y-6">
        {items.length > 0 ? (
          <FAQAccordion items={items} />
        ) : (
          <p className="text-sm leading-6 text-slate-700">
            We build the FAQ for each service as questions come up. Drop us a note with what you are curious about and we will add it here.
          </p>
        )}
      </div>
    </ServiceSubpageLayout>
  );
}

ServiceFaqPage.propTypes = {
  service: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  faq: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
      })
    ),
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

ServiceFaqPage.defaultProps = {
  faq: null,
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
    const faq = getServiceFaqContent(service.slug);

    return {
      props: {
        service,
        faq,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
