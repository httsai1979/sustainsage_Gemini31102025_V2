import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AcademicCapIcon, ArrowsRightLeftIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

import RevealSection from '@/components/common/RevealSection';
import Testimonials from '@/components/Testimonials';
import FAQAccordion from '@/components/faq/FAQAccordion';
import TopicsHero from '@/components/sections/TopicsHero';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/Section';
import StepList from '@/components/ui/StepList';
import { getIconComponent } from '@/components/icons/map';
import { loadJSON } from '@/lib/content';
import { orderSections } from '@/lib/content/normalize';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

const DEFAULT_WHO_CARDS = [
  {
    title: 'Professionals seeking growth',
    description:
      'Mid-career people who want a thoughtful space to decide what stays, what shifts, and how to move without burning out.',
    icon: BriefcaseIcon,
    href: '/for/mid-career-returners',
    linkLabel: 'See the mid-career guide',
  },
  {
    title: 'Career changers',
    description:
      'Those translating experience between countries or industries and needing calm structure to test new directions.',
    icon: ArrowsRightLeftIcon,
    href: '/for/newcomers-to-uk',
    linkLabel: 'See the newcomers guide',
  },
  {
    title: 'Purpose-driven individuals',
    description:
      'Graduates, working parents, and community builders who want support aligning their work with their values.',
    icon: AcademicCapIcon,
    href: '/for/parents-returning-to-work',
    linkLabel: 'See the parents guide',
  },
];

export default function Home({
  content = {},
  testimonials = [],
  showFallbackNotice = false,
  fallbackNotice = null,
} = {}) {
  const {
    hero = {},
    services = {},
    process = {},
    faqTeaser = null,
    recognise: recogniseContent = {},
    boundaries = {},
    audiences: contentAudiences,
    audienceSection = {},
    coachingDefinition = {},
  } = content ?? {};

  const faqContent = {
    title: faqTeaser?.title ?? 'Questions about coaching?',
    body:
      faqTeaser?.body ??
      'Read about session rhythms, pricing, ethics, and how we tailor support for individuals and organisations.',
    ctaHref: faqTeaser?.cta?.href ?? '/faq',
    ctaLabel: faqTeaser?.cta?.label ?? 'Read the FAQs',
  };

  const serviceCards = dedupeBy(
    orderSections(Array.isArray(services?.cards) ? services.cards : []),
    (card) => card?.slug ?? card?.href ?? card?.title ?? card?.description ?? ''
  );

  const processSteps = dedupeBy(
    orderSections(Array.isArray(process?.steps) ? process.steps : []),
    (step) =>
      typeof step === 'string'
        ? step
        : step?.title ?? step?.description ?? `${step?.tag ?? ''}`
  );

  const boundaryItems = dedupeBy(
    orderSections(Array.isArray(boundaries?.items) ? boundaries.items : []),
    (item) => item?.question ?? item?.title ?? item?.answer ?? ''
  );

  const fallbackMessage =
    fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  const audiences = dedupeBy(
    Array.isArray(contentAudiences) && contentAudiences.length
      ? contentAudiences
      : DEFAULT_WHO_CARDS,
    (item) => item?.title ?? item?.description ?? ''
  );

  const whoCards = DEFAULT_WHO_CARDS.map((card, index) => {
    const override = audiences[index] ?? {};
    return {
      ...card,
      ...override,
      description: override?.description ?? card.description,
      title: override?.title ?? card.title,
      href: override?.href ?? card.href,
      linkLabel: override?.linkLabel ?? card.linkLabel,
      icon: card.icon,
    };
  });

  const fallbackSteps = [
    {
      title: 'Initial conversation',
      description:
        'A 20-minute chat to understand what is changing and share the boundaries we work within.',
    },
    {
      title: 'Goal setting',
      description: 'We agree the focus, cadence, and accessibility needs before sessions begin.',
    },
    {
      title: 'Regular sessions',
      description: 'Online conversations (60–75 minutes) with experiments and reflections between sessions.',
    },
    {
      title: 'Sustainable growth',
      description: 'We pause, review, and keep what works so progress feels steady and kind.',
    },
  ];

  const stepIcons = ['calendar', 'target', 'note', 'handshake'];

  const processCards = (processSteps.length ? processSteps : fallbackSteps)
    .slice(0, 4)
    .map((step, index) => {
      if (typeof step === 'string') {
        return {
          title: `Step ${index + 1}`,
          description: step,
          icon: stepIcons[index] ?? 'spark',
        };
      }

      return {
        ...step,
        icon: step?.icon ?? step?.iconName ?? stepIcons[index] ?? 'spark',
      };
    });

  const topicItems = dedupeBy(
    orderSections(Array.isArray(recogniseContent?.items) ? recogniseContent.items : []),
    (item, index) => (typeof item === 'string' ? item : item?.title ?? item?.description ?? index)
  );

  const coachingIsBullets = [process?.description, process?.note, hero?.subheadline]
    .filter(Boolean)
    .slice(0, 3);
  const coachingIsNotBullets = [boundaries?.description, boundaries?.note]
    .filter(Boolean)
    .slice(0, 3);
  const heroImageSrc = hero?.image?.src ?? hero?.imageSrc ?? '/images/hero/main.jpg';
  const heroImageAlt =
    hero?.image?.alt ?? hero?.imageAlt ?? hero?.title ?? 'Coach and client in a calm conversation';

  return (
    <main className="bg-sustain-bg dark:bg-sustain-bg-dark">
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <RevealSection>
            <div className="space-y-4">
              {hero?.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-green/80">{hero.eyebrow}</p>
              ) : null}
              <h1 className="text-h1">
                {hero?.title ?? hero?.headline ?? 'Space for life’s turning points'}
              </h1>
              {hero?.description || hero?.subheadline ? (
                <p className="text-body">{hero?.description ?? hero?.subheadline}</p>
              ) : null}
              {showFallbackNotice ? (
                <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
              ) : null}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={hero?.primaryCta?.href ?? '/contact'} className="ss-btn-primary">
                  {hero?.primaryCta?.label ?? hero?.primaryCta ?? 'Book a 20-minute chat'}
                </Link>
                <Link href={hero?.secondaryCta?.href ?? '/services'} className="ss-btn-secondary text-sustain-text dark:text-sustain-text-dark">
                  {hero?.secondaryCta?.label ?? hero?.secondaryCta ?? 'Who we help'}
                </Link>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={0.1} className="w-full">
            <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-white/40 bg-sustain-green/5 shadow-xl">
              <Image
                src={heroImageSrc}
                alt={heroImageAlt}
                width={960}
                height={960}
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-sustain-text/20 via-transparent to-white/10" aria-hidden />
            </div>
          </RevealSection>
        </div>
      </Section>

      <Section>
        <RevealSection>
          <div className="rounded-card rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-md md:p-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-semibold text-sustain-text">For China–UK corporate leaders</h2>
              <p className="text-base leading-relaxed text-slate-700">
                If you lead a China-invested business in the UK and feel pulled between head office and local realities, there is
                a quiet place to talk it through.
              </p>
              <div>
                <Link href="/corporate" className="ss-btn-primary">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </RevealSection>
      </Section>

      <Section id="who-we-work-with">
        <RevealSection className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">
            {audienceSection?.eyebrow ?? 'Who coaching is for'}
          </p>
          <h2 className="text-h2">{audienceSection?.title ?? 'People who find this space helpful'}</h2>
          {audienceSection?.description ? (
            <p className="text-body">{audienceSection.description}</p>
          ) : null}
        </RevealSection>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whoCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <RevealSection key={card.title} delay={index * 0.1}>
                <Card
                  title={card.title}
                  subtitle={card.description}
                  icon={IconComponent ? <IconComponent className="h-6 w-6" aria-hidden /> : null}
                  footer={
                    card.href ? (
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-2 font-semibold text-sustain-green"
                      >
                        {card.linkLabel ?? 'Read the detailed guide'}
                        <span aria-hidden>→</span>
                      </Link>
                    ) : null
                  }
                />
              </RevealSection>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[coachingIsBullets, coachingIsNotBullets].map((list, index) => (
            <RevealSection key={index} delay={index * 0.1}>
              <Card
                title={
                  index === 0
                    ? coachingDefinition?.isTitle ?? 'What coaching is'
                    : coachingDefinition?.isNotTitle ?? 'What coaching isn’t'
                }
                icon={<Icon name={index === 0 ? 'spark' : 'info'} />}
              >
                <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                  {list.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sustain-green" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealSection>
          ))}
        </div>
      </Section>

      <Section background="muted">
        <RevealSection className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">
            {process?.eyebrow ?? 'How we work together'}
          </p>
          <h2 className="text-h2">{process?.title ?? 'A calm structure for reflective work'}</h2>
          {process?.description ? <p className="text-body">{process.description}</p> : null}
        </RevealSection>
        <RevealSection delay={0.1} className="mt-8">
          <StepList steps={processCards} />
        </RevealSection>
      </Section>

      <RevealSection>
        <TopicsHero
          eyebrow={recogniseContent?.eyebrow ?? 'Areas we can explore together'}
          title={recogniseContent?.title ?? 'Coaching topics we cover'}
          description={
            recogniseContent?.intro ??
            'Surface the themes that matter—career transitions, leadership, belonging, and boundaries.'
          }
          ctaLabel="See topics"
          ctaHref="#topics"
          backgroundImage={recogniseContent?.image?.src ?? '/images/coach-topics.jpg'}
          backgroundAlt={
            recogniseContent?.image?.alt ?? recogniseContent?.title ?? 'Coaching topics background'
          }
        />
      </RevealSection>

      <Section id="topics">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topicItems.map((item, index) => (
            <RevealSection key={item?.title ?? item ?? index} delay={(index % 4) * 0.1}>
              <Card title={item?.title ?? item}>
                <p className="text-sm text-slate-700">{item?.description ?? item}</p>
              </Card>
            </RevealSection>
          ))}
        </div>
      </Section>

      {serviceCards.length ? (
        <Section>
          <RevealSection className="space-y-4 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">
              {services?.eyebrow ?? 'Coaching pathways'}
            </p>
            <h2 className="text-h2">{services?.title ?? 'Services to match your stage'}</h2>
            {services?.description ? <p className="text-body">{services.description}</p> : null}
          </RevealSection>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.slice(0, 3).map((card, index) => {
              const IconComponent = getIconComponent(card.icon);
              return (
                <RevealSection key={card.href ?? card.title} delay={(index % 3) * 0.1}>
                  <Card
                    title={card.title}
                    subtitle={card.description}
                    icon={IconComponent ? <IconComponent className="h-6 w-6" aria-hidden /> : null}
                    footer={
                      card.href ? (
                        <Link href={card.href} className="inline-flex items-center gap-2 font-semibold text-sustain-green">
                          {card.linkLabel ?? 'Explore service'}
                          <span aria-hidden>→</span>
                        </Link>
                      ) : null
                    }
                  />
                </RevealSection>
              );
            })}
          </div>
        </Section>
      ) : null}

      {boundaryItems.length ? (
        <Section>
          <RevealSection className="space-y-4 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">{boundaries?.eyebrow}</p>
            <h2 className="text-h2">{boundaries?.title}</h2>
            {boundaries?.description ? <p className="text-body">{boundaries.description}</p> : null}
          </RevealSection>
          <RevealSection delay={0.1} className="mt-8">
            <div className="rounded-card rounded-2xl border border-slate-100 bg-white p-4 shadow-md">
              <FAQAccordion items={boundaryItems} />
            </div>
          </RevealSection>
        </Section>
      ) : null}

      <Section>
        <RevealSection>
          <div className="rounded-card rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-md md:p-10">
            <h2 className="text-h2">{faqContent.title}</h2>
            <p className="mt-4 text-body">{faqContent.body}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={faqContent.ctaHref} className="ss-btn-secondary">
                {faqContent.ctaLabel}
              </Link>
              <Link href="/contact" className="ss-btn-primary">
                Book a 20-minute chat
              </Link>
            </div>
          </div>
        </RevealSection>
      </Section>

      <Section>
        <RevealSection>
          <Testimonials items={testimonials ?? []} />
        </RevealSection>
      </Section>
    </main>
  );
}

Home.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    services: PropTypes.object,
    process: PropTypes.object,
    boundaries: PropTypes.object,
    faqTeaser: PropTypes.object,
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      attribution: PropTypes.string,
    })
  ),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};

Home.getLayout = function getLayout(page) {
  const seo = page.props?.content?.seo ?? {};
  return (
    <MainLayout
      seo={{
        title: seo.title,
        description: seo.description,
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en-GB' }) {
  const content = loadJSON('home', locale);
  const testimonials = loadJSON('testimonials', locale);
  const fallbackNotice =
    typeof content?.fallbackNotice === 'string' && content.fallbackNotice.length > 0
      ? content.fallbackNotice
      : null;
  const isEnglishLocale = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
  const showFallbackNotice = !isEnglishLocale && Boolean(fallbackNotice);

  return toSerializable({
    props: {
      content,
      testimonials,
      showFallbackNotice,
      fallbackNotice,
      ...(await serverSideTranslations(locale, ['common', 'nav', 'home', 'faq'])),
    },
  });
}
