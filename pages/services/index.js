import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import StepList from '@/components/ui/StepList';
import { loadContent } from '@/lib/loadContent';
import { dedupeBy } from '@/lib/dedupe';
import { sanitizeProps } from '@/lib/toSerializable';

const PACKAGE_DETAILS = {
  'career-return': {
    who: 'Professionals returning to work after a pause or relocation.',
    focus: 'Rebuild routines, communicate boundaries, and design a sustainable ramp-up.',
    format: '1:1 online coaching · 12 weeks · 60–75 minute sessions.',
  },
  'graduate-start': {
    who: 'Graduates and early-career hires figuring out their story.',
    focus: 'Clarify strengths, build proof points, and test pathways safely.',
    format: '1:1 online coaching · 8–10 weeks · 60-minute sessions.',
  },
  'immigrant-job': {
    who: 'People new to the UK job market translating overseas experience.',
    focus: 'Localise your narrative, map networks, and rehearse confident interviews.',
    format: '1:1 online coaching · 8–12 weeks · 60–75 minute sessions.',
  },
};

const APPROACH_CARDS = [
  {
    title: 'Personalised & flexible',
    body:
      'We co-design agreements, cadence, and language preferences so the coaching rhythm fits your life and responsibilities.',
  },
  {
    title: 'Practical & sustainable',
    body:
      'Every session ends with right-sized experiments, reflections, or scripts you can use immediately without burning out.',
  },
];

const CTA_LINKS = [
  { href: '/contact', label: 'Book a 20-minute chat', variant: 'primary' },
  { href: '/services', label: 'Explore services', variant: 'secondary' },
];

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
  const fallbackMessage = fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';
  const primaryCta = hero?.primaryCta ?? { href: '/contact', label: 'Book a 20-minute chat' };
  const secondaryCta = hero?.secondaryCta ?? { href: '#support', label: 'Who we support' };

  // Single source of truth for the onboarding steps to avoid duplicate declarations.
  const gettingStartedSteps = [
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
        </div>
      </section>

      <section id="support" className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Support options</p>
          <h2 className="text-3xl font-semibold text-sustain-text">How I can support you</h2>
          {pathways?.description ? <p className="text-base text-slate-700">{pathways.description}</p> : null}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {uniqueCards.map((card) => {
            const detail = PACKAGE_DETAILS[card.slug] ?? {};
            return (
              <Card
                key={card.slug}
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
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Who it’s for</p>
                    <p className="mt-1">{detail.who ?? card.audience ?? 'Designed for people navigating complex transitions.'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Focus</p>
                    <p className="mt-1">{detail.focus ?? card.excerpt}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Format</p>
                    <p className="mt-1">{detail.format ?? 'Online coaching · 60–75 minutes per session'}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Getting started is simple</p>
          <h2 className="text-3xl font-semibold text-sustain-text">A steady process from first chat to ongoing sessions</h2>
        </div>
        <div className="mt-8">
          <StepList steps={gettingStartedSteps} />
        </div>
      </section>

      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">My approach</p>
          <h2 className="text-3xl font-semibold text-sustain-text">Practical, personalised, sustainable</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {APPROACH_CARDS.map((card) => (
            <Card key={card.title} title={card.title}>
              <p className="text-sm leading-relaxed text-slate-700">{card.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="ss-section">
        <div className="rounded-3xl border border-sustain-cardBorder bg-white p-8 text-center shadow-md">
          <h2 className="text-3xl font-semibold text-sustain-text">{cta?.title ?? 'Let’s find the right starting point'}</h2>
          <p className="mt-4 text-base text-slate-700">{cta?.body ?? 'Book a 20-minute chat or keep exploring the services in your own time.'}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {CTA_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.variant === 'primary' ? 'ss-btn-primary' : 'ss-btn-secondary'}
              >
                {link.label}
              </Link>
            ))}
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
