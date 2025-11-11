import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { loadContent } from '@/lib/loadContent';
import { toSerializable } from '@/lib/toSerializable';

function PathwayCard({ card, viewDetailsLabel }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      <div className="space-y-4">
        {card.eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{card.eyebrow}</p>
        ) : null}
        <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
        {card.excerpt ? <p className="text-sm leading-6 text-slate-600">{card.excerpt}</p> : null}
      </div>
      <Link
        href={`/services/${card.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
      >
        {card.ctaLabel ?? viewDetailsLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
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

export default function ServicesPage({ cards, showFallbackNotice, fallbackNotice }) {
  const { t } = useTranslation('services');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const pathways = t('pathways', { returnObjects: true });
  const cta = t('cta', { returnObjects: true });
  const faqLink = t('faqLink', { returnObjects: true });
  const boundariesLink = hero?.boundariesLink;
  const visibleCards = Array.isArray(cards) ? cards.filter((card) => card && card.title) : [];
  const fallbackMessage = fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        {seo?.description ? <meta name="description" content={seo?.description} /> : null}
      </Head>

      <section className="bg-emerald-50/60 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 md:flex-row md:items-center">
          <div className="typography flex flex-col gap-4 md:flex-1">
            <h1>{hero?.title}</h1>
            {hero?.highlight ? (
              <p>
                <strong>{hero.highlight}</strong>
              </p>
            ) : null}
            {hero?.subtitle ? <p>{hero.subtitle}</p> : null}
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
            ) : null}
            {boundariesLink?.label || faqLink?.label ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {boundariesLink?.label ? (
                  <Link
                    href={boundariesLink.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
                  >
                    {boundariesLink.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
                {faqLink?.label ? (
                  <Link
                    href={faqLink.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
                  >
                    {faqLink.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 text-sm leading-6 text-slate-700 md:w-80">
            <p>{pathways?.sidebar ?? pathways?.description}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="typography max-w-3xl flex flex-col gap-4">
            <h2>{pathways?.title}</h2>
            {pathways?.highlight ? (
              <p>
                <strong>{pathways.highlight}</strong>
              </p>
            ) : null}
            {pathways?.description ? <p>{pathways.description}</p> : null}
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {visibleCards.map((card) => (
              <PathwayCard key={card.slug} card={card} viewDetailsLabel={pathways?.viewDetails ?? 'View details'} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
          <div className="typography flex flex-col gap-4">
            <h2>{cta?.title}</h2>
            {cta?.highlight ? (
              <p>
                <strong>{cta.highlight}</strong>
              </p>
            ) : null}
            {cta?.body ? <p>{cta.body}</p> : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {cta?.primaryHref && cta?.primaryCta ? (
              <Link
                href={cta.primaryHref}
                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {cta.primaryCta}
              </Link>
            ) : null}
            {cta?.secondaryHref && cta?.secondaryCta ? (
              <Link
                href={cta.secondaryHref}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {cta.secondaryCta}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
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

ServicesPage.defaultProps = {
  showFallbackNotice: false,
  fallbackNotice: null,
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
      excerpt: card.excerpt ?? card.description ?? '',
      ctaLabel: card.ctaLabel ?? card.cta ?? card.buttonLabel ?? null,
    }))
    .filter((card) => card.slug && card.title);

  const fallbackNotice = typeof data?.fallbackNotice === 'string' ? data.fallbackNotice : null;

  return {
    props: toSerializable({
      cards,
      showFallbackNotice: isFallbackLocale,
      fallbackNotice,
      ...(await serverSideTranslations(currentLocale, ['common', 'services'])),
    }),
  };
}
