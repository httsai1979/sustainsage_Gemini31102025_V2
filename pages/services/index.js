import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContentHero from '@/components/content/ContentHero';
import ServicesSectionRenderer from '@/components/services/ServicesSectionRenderer';
import MainLayout from '@/components/layout/MainLayout';
import PageSection from '@/components/ui/PageSection';
import CardShell from '@/components/ui/CardShell';
import { getServicesPageContent } from '@/lib/servicesContent';

const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

function WhoSection({ sectionMeta = {}, cards = [] }) {
  if (!cards.length) return null;
  return (
    <PageSection id="services-who" eyebrow={sectionMeta?.eyebrow} title={sectionMeta?.title} lead={sectionMeta?.lead}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const paragraphs = Array.isArray(card?.body) ? card.body : [card?.body].filter(Boolean);
          const cardProps = card?.href ? { as: Link, href: card.href } : {};
          return (
            <CardShell
              key={card?.id ?? card?.href ?? card?.title}
              {...cardProps}
              iconName={card?.iconName}
              eyebrow={card?.eyebrow}
              title={card?.title}
            >
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardShell>
          );
        })}
      </div>
    </PageSection>
  );
}

WhoSection.propTypes = {
  sectionMeta: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
  }),
  cards: PropTypes.arrayOf(PropTypes.object),
};

function ServicesPage({ content, showFallbackNotice, fallbackNotice }) {
  const sections = Array.isArray(content?.sections) ? content.sections : [];
  const whoSection = content?.whoThisIsFor ?? {};
  const whoCards = Array.isArray(content?.whoThisIsForCards) ? content.whoThisIsForCards : [];

  return (
    <>
      <ContentHero hero={content?.hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />
      <WhoSection sectionMeta={whoSection} cards={whoCards} />
      {sections.map((section) => (
        <ServicesSectionRenderer key={section?.id ?? section?.title} section={section} />
      ))}
    </>
  );
}

ServicesPage.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    sections: PropTypes.array,
    whoThisIsFor: PropTypes.object,
    whoThisIsForCards: PropTypes.array,
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};

ServicesPage.getLayout = function getLayout(page) {
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
  const { content, isFallback } = getServicesPageContent('index', resolvedLocale);
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

export default ServicesPage;
