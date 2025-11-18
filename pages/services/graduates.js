import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContentHero from '@/components/content/ContentHero';
import ServicesSectionRenderer from '@/components/services/ServicesSectionRenderer';
import MainLayout from '@/components/layout/MainLayout';
import { getServicesPageContent } from '@/lib/servicesContent';

const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

function GraduatesServicePage({ content, showFallbackNotice, fallbackNotice }) {
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return (
    <>
      <ContentHero hero={content?.hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />
      {sections.map((section) => (
        <ServicesSectionRenderer key={section?.id ?? section?.title} section={section} />
      ))}
    </>
  );
}

GraduatesServicePage.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    sections: PropTypes.array,
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};

GraduatesServicePage.getLayout = function getLayout(page) {
  const seo = page.props?.content?.seo ?? {};
  return (
    <MainLayout
      seo={{
        title: seo.title,
        description: seo.description,
      }}
    >
      <main>{page}</main>
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en-GB' }) {
  const resolvedLocale = typeof locale === 'string' ? locale : 'en-GB';
  const { content, isFallback } = getServicesPageContent('graduates', resolvedLocale);
  const fallbackNotice = content?.fallbackNotice ?? DEFAULT_NOTICE;

  return {
    props: {
      content,
      showFallbackNotice: isFallback,
      fallbackNotice,
      ...(await serverSideTranslations(resolvedLocale, ['common', 'nav'])),
    },
  };
}

export default GraduatesServicePage;
