import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageSection from '@/components/ui/PageSection';
import Card from '@/components/ui/Card';
import Callout from '@/components/ui/Callout';
import { H1 } from '@/components/ui/H';
import { loadContent } from '@/lib/loadContent';
import { sanitizeProps } from '@/lib/toSerializable';

function PathwayCard({ card, viewDetailsLabel }) {
  return (
    <Card
      className="flex h-full flex-col"
      title={card.title}
      subtitle={card.excerpt}
      footer={
        <Link href={`/services/${card.slug}`} className="inline-flex items-center gap-2 font-semibold text-sage">
          {card.ctaLabel ?? viewDetailsLabel}
          <span aria-hidden="true">→</span>
        </Link>
      }
    >
      {card.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">{card.eyebrow}</p>
      ) : null}
    </Card>
  );
}

PathwayCard.propTypes = {
  card: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    eyebrow: PropTypes.string,
    excerpt: PropTypes.string,
    ctaLabel: PropTypes.string,
  }).isRequired,
  viewDetailsLabel: PropTypes.string.isRequired,
};

export default function ServicesPage({
  cards = [],
  showFallbackNotice = false,
  fallbackNotice = null,
} = {}) {
  const { t } = useTranslation('services');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const pathways = t('pathways', { returnObjects: true });
  const cta = t('cta', { returnObjects: true });
  const faqLink = t('faqLink', { returnObjects: true });
  const fallbackMessage = fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        {seo?.description ? <meta name="description" content={seo?.description} /> : null}
      </Head>

      <PageSection className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-6">
            {hero?.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">{hero.eyebrow}</p>
            ) : null}
            {hero?.title ? <H1>{hero.title}</H1> : null}
            {hero?.subtitle ? <p className="text-base leading-7 text-slate-600">{hero.subtitle}</p> : null}
            {hero?.highlight ? (
              <p className="text-base font-semibold text-slate-900">{hero.highlight}</p>
            ) : null}
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
            ) : null}
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-sage">
              {hero?.boundariesLink?.label ? (
                <Link href={hero.boundariesLink.href} className="inline-flex items-center gap-2 hover:underline">
                  {hero.boundariesLink.label}
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
              {faqLink?.label ? (
                <Link href={faqLink.href} className="inline-flex items-center gap-2 hover:underline">
                  {faqLink.label}
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          </div>
          <Callout
            title={pathways?.sidebarTitle ?? 'Where to begin'}
            body={pathways?.sidebar ?? pathways?.description}
          />
        </div>
      </PageSection>

      <PageSection title={pathways?.title} lead={pathways?.description}>
        {pathways?.highlight ? (
          <p className="mb-8 text-base font-semibold text-slate-900">{pathways.highlight}</p>
        ) : null}
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <PathwayCard key={card.slug} card={card} viewDetailsLabel={pathways?.viewDetails ?? 'View details'} />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <Card className="text-center" title={cta?.title} subtitle={cta?.body}>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {cta?.primaryHref && cta?.primaryCta ? (
              <Link
                href={cta.primaryHref}
                className="inline-flex items-center justify-center rounded-full bg-sage px-5 py-3 text-sm font-semibold text-white"
              >
                {cta.primaryCta}
              </Link>
            ) : null}
            {cta?.secondaryHref && cta?.secondaryCta ? (
              <Link
                href={cta.secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-sage/40 px-5 py-3 text-sm font-semibold text-sage"
              >
                {cta.secondaryCta}
              </Link>
            ) : null}
          </div>
        </Card>
      </PageSection>
    </>
  );
}

ServicesPage.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      eyebrow: PropTypes.string,
      excerpt: PropTypes.string,
      ctaLabel: PropTypes.string,
    })
  ).isRequired,
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};

export async function getStaticProps({ locale }) {
  const currentLocale = locale ?? 'en-GB';
  const { data, locale: usedLocale } = loadContent(`content/services/index.{locale}.json`, currentLocale, 'en-GB');
  const isFallbackLocale = Boolean(usedLocale && usedLocale !== currentLocale);
  const rawCards = Array.isArray(data?.pathways) && data.pathways.length > 0 ? data.pathways : data?.cards;

  const cards = (Array.isArray(rawCards) ? rawCards : [])
    .filter(Boolean)
    .slice(0, 3)
    .map((card) => ({
      slug: card.slug,
      title: card.title,
      eyebrow: card.eyebrow,
      excerpt: card.excerpt ?? card.description ?? card.teaser ?? '',
      ctaLabel: card.ctaLabel ?? card.cta ?? card.buttonLabel ?? card.cta_label ?? null,
    }))
    .filter((card) => card.slug && card.title);

  const fallbackNotice = typeof data?.fallbackNotice === 'string' ? data.fallbackNotice : null;

  const props = {
    cards,
    showFallbackNotice: isFallbackLocale,
    fallbackNotice,
    ...(await serverSideTranslations(currentLocale, ['common', 'services'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
