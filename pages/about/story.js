import PropTypes from 'prop-types';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AboutHero from '@/components/about/AboutHero';
import AboutSectionRenderer from '@/components/about/AboutSectionRenderer';
import MainLayout from '@/components/layout/MainLayout';
import PageSection from '@/components/ui/PageSection';
import { getAboutPageContent } from '@/lib/aboutContent';

function StoryFooter({ cta, secondaryCta, disclaimer }) {
  const links = [cta, secondaryCta].filter((action) => action?.href && action?.label);
  if (!links.length && !disclaimer) return null;
  return (
    <PageSection>
      {links.length ? (
        <div className="flex flex-wrap gap-3">
          {links.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className={index === 0 ? 'ss-btn-primary' : 'ss-btn-secondary'}
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
      {disclaimer ? (
        <p className="mt-6 text-xs text-sustain-textMuted">{disclaimer}</p>
      ) : null}
    </PageSection>
  );
}

StoryFooter.propTypes = {
  cta: PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string,
  }),
  secondaryCta: PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string,
  }),
  disclaimer: PropTypes.string,
};

function StoryPage({ content, showFallbackNotice, fallbackNotice }) {
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return (
    <>
      <AboutHero hero={content?.hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />
      {sections.map((section) => (
        <AboutSectionRenderer key={section?.id ?? section?.title} section={section} />
      ))}
      <StoryFooter cta={content?.cta} secondaryCta={content?.secondaryCta} disclaimer={content?.disclaimer} />
    </>
  );
}

StoryPage.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    sections: PropTypes.array,
    cta: PropTypes.object,
    secondaryCta: PropTypes.object,
    disclaimer: PropTypes.string,
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};

StoryPage.getLayout = function getLayout(page) {
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
  const { content, isFallback } = getAboutPageContent('story', resolvedLocale);
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

export default StoryPage;
