import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AboutCTA from '@/components/about/AboutCTA';
import AboutHero from '@/components/about/AboutHero';
import AboutSectionRenderer from '@/components/about/AboutSectionRenderer';
import MainLayout from '@/components/layout/MainLayout';
import { getAboutPageContent } from '@/lib/aboutContent';

function ValuesPage({ content, showFallbackNotice, fallbackNotice }) {
  const sections = Array.isArray(content?.sections) ? content.sections : [];
  return (
    <>
      <AboutHero hero={content?.hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />
      {sections.map((section) => (
        <AboutSectionRenderer key={section?.id ?? section?.title} section={section} />
      ))}
      <AboutCTA cta={content?.cta} />
    </>
  );
}

ValuesPage.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    sections: PropTypes.array,
    cta: PropTypes.object,
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};

ValuesPage.getLayout = function getLayout(page) {
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
  const { content, isFallback } = getAboutPageContent('values', resolvedLocale);
  const fallbackNotice = content?.fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return {
    props: {
      content,
      showFallbackNotice: isFallback,
      fallbackNotice,
      ...(await serverSideTranslations(resolvedLocale, ['common', 'nav'])),
    },
  };
}

export default ValuesPage;
