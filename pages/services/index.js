import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Card from '@/components/ui/Card';
import StepList from '@/components/ui/StepList';
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
        <Link href={`/services/${card.slug}`} className="inline-flex items-center gap-2 font-semibold text-sustain-green">
          {card.ctaLabel ?? viewDetailsLabel}
          <span aria-hidden="true">→</span>
        </Link>
      }
    >
      <div className="space-y-3 text-sm text-slate-700">
        {card.eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{card.eyebrow}</p>
        ) : null}
        {card.audience ? <p className="text-slate-600">{card.audience}</p> : null}
        <p className="text-slate-500">Online sessions · 60–75 minutes</p>
      </div>
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

  const gettingStartedSteps = [
    'Schedule a short chemistry call to check fit and scope.',
    'Co-design a package or rhythm that matches your capacity.',
    'Meet online for 60–75 minutes per session and review every few weeks.',
  ];

  return (
    <main className="ss-container">
      <Head>
        <title>{seo?.title}</title>
        {seo?.description ? <meta name="description" content={seo?.description} /> : null}
      </Head>

      <section className="ss-section">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-6">
            {hero?.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{hero.eyebrow}</p>
            ) : null}
            {hero?.title ? <H1>{hero.title}</H1> : null}
            {hero?.subtitle ? <p className="text-base leading-7 text-slate-700">{hero.subtitle}</p> : null}
            {hero?.highlight ? (
              <p className="text-base font-semibold text-sustain-text">{hero.highlight}</p>
            ) : null}
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
            ) : null}
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-sustain-green">
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
          <div className="rounded-card border border-sustain-cardBorder bg-white p-6 shadow-card">
            <h3 className="text-lg font-semibold text-sustain-text">
              {pathways?.sidebarTitle ?? 'Where to begin'}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {pathways?.sidebar ?? pathways?.description}
            </p>
          </div>
        </div>
      </section>

      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-sustain-text">{pathways?.title}</h2>
          {pathways?.description ? <p className="text-base text-slate-700">{pathways.description}</p> : null}
          {pathways?.highlight ? (
            <p className="text-base font-semibold text-sustain-text">{pathways.highlight}</p>
          ) : null}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <PathwayCard key={card.slug} card={card} viewDetailsLabel={pathways?.viewDetails ?? 'View details'} />
          ))}
        </div>
      </section>

      <section className="ss-section">
        <div className="rounded-card border border-sustain-cardBorder bg-white p-6 shadow-card">
          <h2 className="text-3xl font-semibold text-sustain-text">{cta?.title}</h2>
          <p className="mt-4 text-base text-slate-700">{cta?.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {cta?.primaryHref && cta?.primaryCta ? (
              <Link href={cta.primaryHref} className="ss-btn-primary">
                {cta.primaryCta}
              </Link>
            ) : null}
            {cta?.secondaryHref && cta?.secondaryCta ? (
              <Link href={cta.secondaryHref} className="ss-btn-secondary">
                {cta.secondaryCta}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">How to get started</p>
          <h2 className="text-3xl font-semibold text-sustain-text">A gentle way into coaching</h2>
        </div>
        <div className="mt-8">
          <StepList steps={gettingStartedSteps} />
        </div>
        <div className="mt-6">
          <Link href="/contact" className="ss-btn-primary">
            Talk to us
          </Link>
        </div>
      </section>
    </main>
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
