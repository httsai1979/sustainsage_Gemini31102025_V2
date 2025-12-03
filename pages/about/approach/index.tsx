import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AboutCTA from '@/components/about/AboutCTA';
import AboutHero from '@/components/about/AboutHero';
import AboutSectionRenderer from '@/components/about/AboutSectionRenderer';
import MainLayout from '@/components/layout/MainLayout';
import { getAboutPageContent } from '@/lib/aboutContent';

type ApproachPageProps = {
  content: any;
  showFallbackNotice: boolean;
  fallbackNotice: string | null;
};

function ApproachPage({ content, showFallbackNotice, fallbackNotice }: ApproachPageProps) {
  const sections = Array.isArray(content?.sections) ? content.sections : [];
  return (
    <>
      <AboutHero hero={content?.hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice ?? undefined} />
      {sections.map((section: any) => (
        <AboutSectionRenderer key={section?.id ?? section?.title} section={section} />
      ))}
      <AboutCTA cta={content?.cta} />
    </>
  );
}

ApproachPage.getLayout = function getLayout(page: any) {
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

export const getStaticProps: GetStaticProps = async ({ locale = 'en-GB' }) => {
  const resolvedLocale = typeof locale === 'string' ? locale : 'en-GB';
  const { content, isFallback } = getAboutPageContent('approach', resolvedLocale);
  const fallbackNotice = content?.fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return {
    props: {
      content,
      showFallbackNotice: isFallback,
      fallbackNotice,
      ...(await serverSideTranslations(resolvedLocale, ['common', 'nav'])),
    },
  };
};

export default ApproachPage;
