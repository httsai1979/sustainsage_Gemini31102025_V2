import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RevealSection from '@/components/common/RevealSection';
import CardShell from '@/components/ui/CardShell';
import StepList from '@/components/ui/StepList';
import { loadContent } from '@/lib/loadContent';
import { dedupeBy } from '@/lib/dedupe';
import { sanitizeProps } from '@/lib/toSerializable';

const SERVICE_ICON_MAP = {
  'career-return': 'clock',
  'graduate-start': 'book',
  'immigrant-job': 'compass',
};

const SERVICE_LAYERS = [
  {
    id: 'strategic-leadership',
    icon: 'target',
    title: 'Strategic leadership development',
    description:
      'A bilingual, discreet partnership for senior leaders balancing China–UK contexts, stakeholder care, and people decisions.',
    links: [
      {
        href: '/services/leadership',
        label: 'Leadership partnership',
        description: 'Monthly advisory container for CEOs, founders, and site leaders navigating board, HQ, and plant realities.',
        highlights: ['Quarterly prioritisation labs', 'Sponsor-ready bilingual summaries'],
      },
      {
        href: '/services/working-parents',
        label: 'Sustainable working parent leadership',
        description: 'Strengthen boundaries and flexible playbooks so caregivers in senior roles stay resourced.',
        highlights: ['Values-based decision rehearsals', 'Safety plans for crunch seasons'],
      },
      {
        href: '/corporate',
        label: 'Corporate collaborations',
        description: 'Bespoke support for China–UK leadership teams, bridge roles, and sponsor groups.',
        highlights: ['Bilingual synthesis of themes', 'Clear escalation paths'],
      },
    ],
  },
  {
    id: 'foundations-for-clarity',
    icon: 'compass',
    title: 'Foundations for clarity',
    description:
      'Reset rhythms, map constraints, and practise kinder scripts before big decisions or launches.',
    links: [
      {
        href: '/services/transition',
        label: 'Transition steadiness series',
        description: 'Structure reflection across identity, logistics, and story so change feels paced.',
        highlights: ['Session-by-session journey map', 'Experiments that fit your access needs'],
      },
      {
        href: '/services/reset-sprint',
        label: 'Reset sprint',
        description: 'A focused 4-week container to triage energy leaks and rebuild simple agreements.',
        highlights: ['Weekly micro-assignments', 'Accountability check-ins'],
      },
      {
        href: '/services/how-coaching-works',
        label: 'Readiness & scope walkthrough',
        description: 'Understand ethics, accessibility, and how we co-design your coaching contract.',
        highlights: ['Inclusion practices', 'Data and privacy guardrails'],
      },
    ],
  },
  {
    id: 'sustainable-growth',
    icon: 'handshake',
    title: 'Sustainable growth partnership',
    description:
      'Build momentum over a quarter or more with clear review points and supportive experimentation.',
    links: [
      {
        href: '/services/deepening-practice',
        label: 'Deepening practice lab',
        description: 'Designed for coaches, facilitators, and HR partners who want supervision-style reflection.',
        highlights: ['Recorded reflection prompts', 'Ethics and scope checkpoints'],
      },
      {
        href: '/services/mid-career-coaching',
        label: 'Mid-career calibration',
        description: 'Reconnect your story, proof points, and ambition with thoughtful experiments.',
        highlights: ['Narrative rehearsals', 'Gentle accountability rhythms'],
      },
      {
        href: '/services/returner-coaching',
        label: 'Returner partnership',
        description: 'Support for professionals rebuilding confidence after health, caregiving, or relocation pauses.',
        highlights: ['Energy-aware planning', 'Sponsor and ally briefings'],
      },
    ],
  },
  {
    id: 'mindful-transitions',
    icon: 'calendar',
    title: 'Mindful transitions',
    description:
      'Persona-specific guides so you can start from the scenario that feels closest to your life.',
    links: [
      {
        href: '/services/for-newcomers-to-uk',
        label: 'Newcomers to the UK',
        description: 'Localise experience, manage sponsorship conversations, and ease culture shock.',
        highlights: ['Accent and language support', 'Policy-aware job search scripts'],
      },
      {
        href: '/services/for-career-returners',
        label: 'Career returners',
        description: 'Blend self-trust rebuilding with practical plans for childcare, pacing, and communication.',
        highlights: ['Flexible pacing menu', 'Boundaries rehearsed in-session'],
      },
      {
        href: '/services/for-parents-returning',
        label: 'Parents returning to work',
        description: 'Translate family care seasons into confident workplace narratives.',
        highlights: ['Micro-celebrations toolkit', 'Employer-ready updates'],
      },
    ],
  },
];

const CLIENT_CASES = [
  {
    id: 'leadership-transformation',
    icon: 'handshake',
    tag: 'Manufacturing leader · 9 months',
    title: 'Leadership transformation',
    challenge: 'Site lead juggling HQ demands, union negotiations, and family care in two countries.',
    approach: 'Bi-weekly bilingual coaching plus asynchronous check-ins for sponsor alignment.',
    shift: 'Clearer stakeholder scripts, steadier delegation, and a calmer handover plan.',
  },
  {
    id: 'career-pivot-success',
    icon: 'compass',
    tag: 'Career pivot · 4 months',
    title: 'Career pivot success',
    challenge: 'Senior analyst moving sectors after redundancy and feeling stuck translating experience.',
    approach: 'Values mapping, interview labs, and portfolio experiments grounded in access needs.',
    shift: 'Secured a sustainable hybrid role with boundaries rehearsed with their new manager.',
  },
  {
    id: 'community-breakthrough',
    icon: 'spark',
    tag: 'Community builder · 3 months',
    title: 'Community breakthrough',
    challenge: 'Grassroots organiser burning out while scaling programmes across languages.',
    approach: 'Reset sprint plus co-created delegation scripts for volunteers and funders.',
    shift: 'More rested leadership, multi-lingual documentation, and a confident funding story.',
  },
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
  const uniqueCards = dedupeBy(cards, (card) => card.slug ?? card.title).map((card) => ({
    ...card,
    iconName: card?.iconName ?? SERVICE_ICON_MAP[card?.slug] ?? 'spark',
  }));

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

      <section className="ss-section" aria-labelledby="service-layers-heading">
        <RevealSection className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Layered pathways</p>
          <h2 id="service-layers-heading" className="text-3xl font-semibold text-sustain-text">
            How I can support you
          </h2>
          <p className="text-base text-slate-700">
            Start with the card that matches your context, then follow the links to see detailed second- and third-layer pages
            with full outlines.
          </p>
        </RevealSection>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {SERVICE_LAYERS.map((layer, index) => (
            <RevealSection key={layer.id} delay={(index % 2) * 0.1}>
              <CardShell iconName={layer.icon} title={layer.title} meta={layer.description} className="h-full">
                <ul className="mt-4 space-y-4">
                  {layer.links.map((link) => (
                    <li key={link.href} className="rounded-2xl border border-sustain-cardBorder/70 bg-white/80 p-4">
                      <Link href={link.href} className="inline-flex items-center gap-2 font-semibold text-sustain-primary">
                        {link.label}
                        <span aria-hidden>→</span>
                      </Link>
                      <p className="mt-2 text-sm text-sustain-textMuted">{link.description}</p>
                      {Array.isArray(link.highlights) && link.highlights.length ? (
                        <ul className="mt-3 space-y-1 text-xs font-medium text-sustain-textMuted">
                          {link.highlights.map((point) => (
                            <li key={point} className="flex items-center gap-2">
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sustain-primary/10 text-sustain-primary">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2" fill="none">
                                  <path d="M5 12l4 4 10-10" />
                                </svg>
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </CardShell>
            </RevealSection>
          ))}
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
                <CardShell title={card.title} meta={card.excerpt} iconName={card.iconName} className="h-full">
                  <div className="space-y-4 text-sm leading-relaxed text-sustain-textMuted">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-textMuted">
                        {badges?.who ?? 'Who it’s for'}
                      </p>
                      <p className="mt-1">{audience ?? 'Designed for people navigating complex transitions.'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-textMuted">
                        {badges?.focus ?? 'Focus'}
                      </p>
                      <p className="mt-1">{focus ?? card.excerpt}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-textMuted">
                        {badges?.format ?? 'Format'}
                      </p>
                      <p className="mt-1">{format}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Link href={`/services/${card.slug}`} className="inline-flex items-center gap-2 font-semibold text-sustain-primary">
                      {card.ctaLabel ?? pathways?.viewDetails ?? 'View details'}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </CardShell>
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
              <CardShell title={card.title} className="h-full">
                <p>{card.body}</p>
              </CardShell>
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="ss-section" aria-labelledby="client-stories-heading">
        <RevealSection className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Client transformations</p>
          <h2 id="client-stories-heading" className="text-3xl font-semibold text-sustain-text">
            Real client transformations
          </h2>
          <p className="text-base text-slate-700">
            Every partnership protects confidentiality; the composites below show how layered pathways play out in real life.
          </p>
        </RevealSection>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CLIENT_CASES.map((story, index) => (
            <RevealSection key={story.id} delay={(index % 3) * 0.1}>
              <CardShell iconName={story.icon} title={story.title} meta={story.tag} className="h-full">
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold">Challenge:</span> {story.challenge}
                  </p>
                  <p>
                    <span className="font-semibold">Approach:</span> {story.approach}
                  </p>
                  <p>
                    <span className="font-semibold">Shift:</span> {story.shift}
                  </p>
                </div>
              </CardShell>
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="ss-section" aria-labelledby="client-stories-heading">
        <RevealSection className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">Client transformations</p>
          <h2 id="client-stories-heading" className="text-3xl font-semibold text-sustain-text">
            Real client transformations
          </h2>
          <p className="text-base text-slate-700">
            Every partnership protects confidentiality; the composites below show how layered pathways play out in real life.
          </p>
        </RevealSection>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CLIENT_CASES.map((story, index) => (
            <RevealSection key={story.id} delay={(index % 3) * 0.1}>
              <Card icon={<Icon name={story.icon} />} tag={story.tag} title={story.title}>
                <div className="space-y-3 text-sm leading-relaxed text-slate-700">
                  <p>
                    <span className="font-semibold text-sustain-text">Challenge: </span>
                    {story.challenge}
                  </p>
                  <p>
                    <span className="font-semibold text-sustain-text">Approach: </span>
                    {story.approach}
                  </p>
                  <p>
                    <span className="font-semibold text-sustain-text">Shift: </span>
                    {story.shift}
                  </p>
                </div>
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
    ...(await serverSideTranslations(currentLocale, ['common', 'nav', 'services'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
