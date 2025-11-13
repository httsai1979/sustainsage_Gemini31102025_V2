import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';
import CardGrid from '@/components/ui/CardGrid';
import PageSection from '@/components/ui/PageSection';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function safeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function renderSegments(paragraph = []) {
  if (!Array.isArray(paragraph)) {
    return null;
  }

  return paragraph.map((segment, index) => {
    if (segment?.type === 'link' && segment.href) {
      return (
        <Link
          key={`${segment.href}-${index}`}
          href={segment.href}
          className="font-semibold text-primary underline-offset-2 hover:underline"
        >
          {segment.label}
        </Link>
      );
    }

    const value = segment?.value ?? segment;
    return <span key={index}>{value}</span>;
  });
}

export default function PersonaServicePage({ personaKey, image, imageAlt }) {
  const { t } = useTranslation('services-personas');
  const content = t(personaKey, { returnObjects: true }) ?? {};
  const seo = content.seo ?? {};
  const hero = content.hero ?? {};
  const sections = content.sections ?? {};
  const challenges = safeArray(sections?.challenges?.items);
  const support = safeArray(sections?.support?.items);
  const vignette = sections?.vignette ?? {};
  const packages = sections?.packages ?? {};

  const heroImage = image ?? hero.image ?? '/images/services/transition.svg';
  const heroAlt = imageAlt ?? hero.imageAlt ?? hero.title ?? 'Service illustration';

  return (
    <>
      <Head>
        <title>{seo?.title ?? `${hero?.title ?? 'Service'} | SustainSage`}</title>
        {seo?.description ? <meta name="description" content={seo.description} /> : null}
      </Head>

      <Hero title={hero?.title} subtitle={hero?.subtitle} eyebrow={hero?.eyebrow} image={heroImage} imageAlt={heroAlt}>
        <Link
          href={hero?.primaryHref ?? '/contact'}
          className={`${BUTTON_BASE} bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary`}
        >
          {hero?.primaryCta ?? 'Book an intro call'}
        </Link>
        <Link
          href={hero?.secondaryHref ?? '/services'}
          className={`${BUTTON_BASE} bg-white text-primary ring-1 ring-inset ring-primary/30 hover:bg-primary/5 focus-visible:outline-primary`}
        >
          {hero?.secondaryCta ?? 'Back to services'}
        </Link>
      </Hero>

      {sections?.challenges?.title ? (
        <PageSection title={sections.challenges.title} lead={sections.challenges.description}>
          <CardGrid>
            {challenges.map((item) => (
              <Card key={item.title} title={item.title} subtitle={item.description} className="h-full" />
            ))}
          </CardGrid>
        </PageSection>
      ) : null}

      {sections?.support?.title ? (
        <PageSection title={sections.support.title} lead={sections.support.description} background="paper">
          <CardGrid>
            {support.map((item) => (
              <Card key={item.title} title={item.title} subtitle={item.description} className="h-full" />
            ))}
          </CardGrid>
        </PageSection>
      ) : null}

      {vignette?.title || vignette?.body ? (
        <PageSection title={vignette?.title}>
          <Card prose>
            <p>{vignette?.body}</p>
          </Card>
        </PageSection>
      ) : null}

      {packages?.title || packages?.paragraphs?.length ? (
        <PageSection background="paper" title={packages?.title}>
          <div className="space-y-4">
            {safeArray(packages?.paragraphs).map((paragraph, index) => (
              <Card key={index} className="space-y-2">
                <p className="text-sm leading-6 text-ink/80">{renderSegments(paragraph)}</p>
              </Card>
            ))}
          </div>
        </PageSection>
      ) : null}
    </>
  );
}

PersonaServicePage.propTypes = {
  personaKey: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
};
