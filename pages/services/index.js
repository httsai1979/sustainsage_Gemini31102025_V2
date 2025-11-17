import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RevealSection from '@/components/common/RevealSection';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import StepList from '@/components/ui/StepList';
import { loadContent } from '@/lib/loadContent';
import { dedupeBy } from '@/lib/dedupe';
import { sanitizeProps } from '@/lib/toSerializable';

export default function ServicesPage({
  cards = [],
  showFallbackNotice = false,
  fallbackNotice = null,
} = {}) {
  const { t } = useTranslation('services');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const pathways = t('pathways', { returnObjects: true });
  const badges = pathways?.badges ?? {};
  const gettingStartedCopy = t('gettingStarted', { returnObjects: true }) ?? {};
  const approachCopy = t('approach', { returnObjects: true }) ?? {};
  const approachCards = Array.isArray(approachCopy?.cards) ? approachCopy.cards : [];
  const cta = t('cta', { returnObjects: true });
  const fallbackMessage = fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';
  const primaryCta = hero?.primaryCta ?? { href: '/contact', label: 'Book a 20-minute chat' };
  const secondaryCta = hero?.secondaryCta ?? { href: '#support', label: 'Who we support' };

  const gettingStartedSteps = Array.isArray(gettingStartedCopy?.steps) && gettingStartedCopy.steps.length
    ? gettingStartedCopy.steps
    : [
        {
          title: 'Book your 20-minute chat',
          description: 'We talk for 20 minutes to understand what is changing and answer scope questions.',
        },
        {
          title: 'Explore together',
          description: 'We map priorities, access needs, and the rhythm that keeps you steady.',
        },
        {
          title: 'Choose your path',
          description: 'Select one of the coaching pathways or co-design something bespoke.',
        },
        {
          title: 'Begin your journey',
          description: 'We meet online every 2–3 weeks, review progress, and adjust agreements as needed.',
        },
      ];

  // Deduplicate CMS cards once so each package renders exactly once.
  const uniqueCards = dedupeBy(cards, (card) => card.slug ?? card.title);

  return (
    <main className="ss-container">
      <Head>
        <title>{seo?.title}</title>
        {seo?.description ? <meta name="description" content={seo?.description} /> : null}
      </Head>

      <section className="ss-section">
        <div className="grid gap-8 lg:grid-cols-2">
          <RevealSection>
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-sustain-cardBorder bg-gradient-to-br from-sustain-green/20 via-sustain-green/5 to-slate-100 p-1 shadow-md">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(74,108,86,0.25),_transparent_60%)]" aria-hidden />
              <div className="absolute inset-4 rounded-3xl border border-white/60 bg-white/20 backdrop-blur-sm" aria-hidden />
              <div className="relative flex h-full flex-col justify-between rounded-[1.75rem] p-6 text-sustain-text">
                <p className="text-sm font-semibold text-sustain-green">{hero?.eyebrow ?? 'Coaching services'}</p>
                <p className="text-lg font-medium text-sustain-text/70">
                  {hero?.highlight ?? 'Calm, card-based containers for transitions, restarts, and experimentation.'}
                </p>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="rounded-3xl border border-sustain-cardBorder bg-white p-8 shadow-xl">
              {hero?.title ? (
                <h1 className="text-3xl font-semibold tracking-tight text-sustain-text md:text-4xl">{hero.title}</h1>
              ) : (
                <h1 className="text-3xl font-semibold tracking-tight text-sustain-text md:text-4xl">Coaching services</h1>
              )}
              {hero?.subtitle ? (
                <p className="mt-4 text-base leading-relaxed text-slate-700">{hero.subtitle}</p>
              ) : null}
              {hero?.body ? <p className="mt-4 text-base leading-relaxed text-slate-700">{hero.body}</p> : null}
              {showFallbackNotice ? (
                <p className="mt-4 text-xs font-medium text-slate-500">{fallbackMessage}</p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                {primaryCta?.href ? (
                  <Link href={primaryCta.href} className="ss-btn-primary">
                    {primaryCta.label ?? 'Book a 20-minute chat'}
                  </Link>
                ) : null}
                {secondaryCta?.href ? (
                  <Link href={secondaryCta.href} className="ss-btn-secondary">
                    {secondaryCta.label ?? 'Who we help'}
                  </Link>
                ) : null}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <section id="support" className="ss-section">
        <RevealSection className="space-y-4 text-center md:text-left">
          {pathways?.eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{pathways.eyebrow}</p>
          ) : null}
          <h2 className="text-3xl font-semibold text-sustain-text">
            {pathways?.title ?? 'How I can support you'}
          </h2>
          {pathways?.description ? <p className="text-base text-slate-700">{pathways.description}</p> : null}
        </RevealSection>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {uniqueCards.map((card, index) => {
            const audience = card.audience ?? card.excerpt ?? card.description;
            const focus = card.focus ?? pathways?.highlight;
            const format = card.format ?? 'Online coaching · 60–75 minutes per session';
            return (
              <RevealSection key={card.slug} delay={(index % 3) * 0.1}>
                <Card
                  title={card.title}
                  subtitle={card.excerpt}
                  icon={<Icon name="spark" />}
                  footer={
                    <Link href={`/services/${card.slug}`} className="inline-flex items-center gap-2 font-semibold text-sustain-green">
                      {card.ctaLabel ?? pathways?.viewDetails ?? 'View details'}
                      <span aria-hidden>→</span>
                    </Link>
                  }
                >
                  <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-green/80">
                        {badges?.who ?? 'Who it’s for'}
                      </p>
                      <p className="mt-1">{audience ?? 'Designed for people navigating complex transitions.'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-green/80">
                        {badges?.focus ?? 'Focus'}
                      </p>
                      <p className="mt-1">{focus ?? card.excerpt}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-green/80">
                        {badges?.format ?? 'Format'}
                      </p>
                      <p className="mt-1">{format}</p>
                    </div>
                  </div>
                </Card>
              </RevealSection>
            );
          })}
        </div>
      </section>

      <section className="ss-section">
        <RevealSection className="space-y-4 text-center md:text-left">
          {gettingStartedCopy?.eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">
              {gettingStartedCopy.eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold text-sustain-text">
            {gettingStartedCopy?.title ?? 'A steady process from first chat to ongoing sessions'}
          </h2>
        </RevealSection>
        <RevealSection delay={0.1} className="mt-8">
          <StepList steps={gettingStartedSteps} />
        </RevealSection>
      </section>

      <section className="ss-section">
        <RevealSection className="space-y-4 text-center md:text-left">
          {approachCopy?.eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">
              {approachCopy.eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold text-sustain-text">
            {approachCopy?.title ?? 'Practical, personalised, sustainable'}
          </h2>
          {approachCopy?.description ? <p className="text-base text-slate-700">{approachCopy.description}</p> : null}
        </RevealSection>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {approachCards.map((card, index) => (
            <RevealSection key={card.title} delay={index * 0.1}>
              <Card title={card.title}>
                <p className="text-sm leading-relaxed text-slate-700">{card.body}</p>
              </Card>
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="ss-section">
        <RevealSection>
          <div className="rounded-3xl border border-sustain-cardBorder bg-white p-8 text-center shadow-md">
            <h2 className="text-3xl font-semibold text-sustain-text">{cta?.title ?? 'Let’s find the right starting point'}</h2>
            <p className="mt-4 text-base text-slate-700">{cta?.body ?? 'Book a 20-minute chat or keep exploring the services in your own time.'}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {cta?.primaryHref ? (
                <Link href={cta.primaryHref} className="ss-btn-primary">
                  {cta?.primaryCta ?? 'Book a 20-minute chat'}
                </Link>
              ) : null}
              {cta?.secondaryHref ? (
                <Link href={cta.secondaryHref} className="ss-btn-secondary">
                  {cta?.secondaryCta ?? 'Explore services'}
                </Link>
              ) : null}
            </div>
          </div>
        </RevealSection>
      </section>

      <section className="ss-section">
        <div className="rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 text-center shadow-md md:p-10">
          <h2 className="text-3xl font-semibold text-sustain-text">Support for China–UK corporate leaders</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Alongside individual coaching, I also work with leaders and HQ teams in China–UK businesses who manage UK sites and teams.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/corporate" className="ss-btn-primary">
              See corporate leaders page
            </Link>
          </div>
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
      audience: card.audience,
      focus: card.focus,
      format: card.format,
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
