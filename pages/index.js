import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  SparklesIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import Testimonials from '@/components/Testimonials';
import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import CardGrid from '@/components/ui/CardGrid';
import PageSection from '@/components/ui/PageSection';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { getIconComponent } from '@/components/icons/map';
import { loadJSON } from '@/lib/content';
import { orderSections } from '@/lib/content/normalize';
import { toSerializable } from '@/lib/toSerializable';

const BUTTON_PRIMARY =
  'inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
const BUTTON_SECONDARY =
  'inline-flex items-center justify-center rounded-full border border-primary/30 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

const AUDIENCE_CARDS = [
  {
    title: 'Mid-career professionals who feel stuck',
    description:
      'You have built a career, but something no longer fits. You want space to explore options without burning everything down.',
    icon: UserCircleIcon,
  },
  {
    title: 'Immigrants and new residents in the UK',
    description:
      'You are navigating a new system, translating skills, and working out how to belong at work again.',
    icon: GlobeAltIcon,
  },
  {
    title: 'Graduates and young adults',
    description:
      'You are finishing university or entering work. Everyone asks “what’s next?” but the answer still feels foggy.',
    icon: AcademicCapIcon,
  },
];

const WHY_CARDS = [
  {
    title: 'Slow, not rushed',
    description: 'We prioritise sustainable change over dramatic declarations. The pace matches your real life.',
    icon: SparklesIcon,
  },
  {
    title: 'Space to think',
    description: 'Sessions are calm and private. You can say the uncertain, unpolished thoughts without needing to perform.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: 'Lived experience of transition',
    description: 'This practice is built from lived experience of immigration, career shifts, and restarting after pauses.',
    icon: GlobeAltIcon,
  },
];

export default function Home({
  content = {},
  testimonials = [],
  showFallbackNotice = false,
  fallbackNotice = null,
} = {}) {
  const hero = content?.hero ?? {};
  const services = content?.services ?? {};
  const process = content?.process ?? {};
  const faqTeaser = content?.faqTeaser ?? null;
  const faqContent = {
    title: faqTeaser?.title ?? 'Questions about coaching?',
    body:
      faqTeaser?.body ??
      'Read about session rhythms, pricing, ethics, and how we tailor support for individuals and organisations.',
    ctaHref: faqTeaser?.cta?.href ?? '/faq',
    ctaLabel: faqTeaser?.cta?.label ?? 'Read the FAQs',
  };
  const serviceCards = orderSections(Array.isArray(services?.cards) ? services.cards : []);
  const processSteps = orderSections(Array.isArray(process?.steps) ? process.steps : []);
  const boundaries = content?.boundaries ?? {};
  const boundaryItems = orderSections(Array.isArray(boundaries?.items) ? boundaries.items : []);
  const keyPoints = content?.key_points ?? {};
  const keyPointItems = orderSections(Array.isArray(keyPoints?.items) ? keyPoints.items : []);
  const fallbackMessage =
    fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';
  const audiences = Array.isArray(content?.audiences)
    ? content.audiences
    : AUDIENCE_CARDS;
  const whyCards = keyPointItems.length
    ? keyPointItems.map((item) =>
        typeof item === 'string'
          ? { title: item }
          : { title: item.title ?? item.question, description: item.description ?? item.answer },
      )
    : WHY_CARDS;
  const processCards = processSteps.length
    ? processSteps.map((step, index) => ({
        title: step.title ?? `Step ${index + 1}`,
        description: step.description,
        tag: `${index + 1}`,
      }))
    : [
        {
          title: 'Brief conversation',
          description:
            'We begin with a short call to see whether coaching is the right support for this moment.',
          tag: '1',
        },
        {
          title: 'Shared focus',
          description: 'We agree what you want to explore and how often we meet.',
          tag: '2',
        },
        {
          title: 'Sessions',
          description:
            'Regular conversations, usually online, to slow down, test small experiments, and notice patterns.',
          tag: '3',
        },
        {
          title: 'Review and adjust',
          description: 'We review what helps, pause when needed, and adjust together.',
          tag: '4',
        },
      ];

  return (
    <>
      <PageSection background="paper" className="pt-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
          <div className="space-y-6">
            {hero?.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">{hero.eyebrow}</p>
            ) : null}
            <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">{hero?.title}</h1>
            {hero?.description ? <p className="text-base leading-7 text-ink/80">{hero.description}</p> : null}
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-ink/60">{fallbackMessage}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              {hero?.primaryCta?.href ? (
                <Link href={hero.primaryCta.href} className={BUTTON_PRIMARY}>
                  {hero.primaryCta.label}
                </Link>
              ) : null}
              <Link href="#who-we-work-with" className={BUTTON_SECONDARY}>
                See who we work with
              </Link>
            </div>
          </div>
          <div className="ssg-card bg-paper">
            <ResponsiveImage
              src={hero?.image?.src ?? '/images/placeholder-hero.jpg'}
              alt={hero?.image?.alt ?? hero?.title ?? 'Hero image'}
              width={1600}
              height={900}
              className="rounded-2xl"
              priority
            />
          </div>
        </div>
      </PageSection>

      <PageSection id="who-we-work-with" eyebrow="Who we work with" title="People who find this space helpful">
        <CardGrid>
          {audiences.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card
                key={card.title}
                title={card.title}
                subtitle={card.description}
                icon={IconComponent ? <IconComponent className="h-6 w-6" /> : null}
              />
            );
          })}
        </CardGrid>
      </PageSection>

      <PageSection
        eyebrow={process?.eyebrow ?? 'How coaching works'}
        title={process?.title ?? 'A calm structure for reflective work'}
        lead={process?.description}
      >
        <CardGrid columns={{ base: 1, md: 2, lg: 4 }}>
          {processCards.map((step) => (
            <Card key={step.title} title={step.title} subtitle={step.description} tag={step.tag} />
          ))}
        </CardGrid>
        {process?.note ? <p className="mt-6 text-sm text-ink/70">{process.note}</p> : null}
      </PageSection>

      <PageSection
        eyebrow="Why SustainSage"
        title={keyPoints?.title ?? 'Why people choose SustainSage'}
        lead={keyPoints?.description}
      >
        <CardGrid>
          {whyCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card
                key={card.title}
                title={card.title}
                subtitle={card.description}
                icon={IconComponent ? <IconComponent className="h-6 w-6" /> : null}
              />
            );
          })}
        </CardGrid>
      </PageSection>

      {serviceCards.length ? (
        <PageSection eyebrow={services?.eyebrow} title={services?.title} lead={services?.description}>
          <CardGrid>
            {serviceCards.slice(0, 3).map((card) => {
              const IconComponent = getIconComponent(card.icon);
              return (
                <Card
                  key={card.href}
                  title={card.title}
                  subtitle={card.description}
                  icon={IconComponent ? <IconComponent className="h-6 w-6" /> : null}
                  footer={
                    card.href ? (
                      <Link href={card.href} className="inline-flex items-center gap-2 font-semibold text-primary">
                        {card.linkLabel ?? 'Explore service'}
                        <span aria-hidden>→</span>
                      </Link>
                    ) : null
                  }
                />
              );
            })}
          </CardGrid>
        </PageSection>
      ) : null}

      {boundaryItems.length ? (
        <PageSection title={boundaries?.title} lead={boundaries?.description}>
          <div className="ssg-card">
            <FAQAccordion items={boundaryItems} className="mt-6" />
          </div>
        </PageSection>
      ) : null}

      <PageSection title={faqContent.title}>
        <div className="ssg-card">
          <p className="text-base text-ink/80">{faqContent.body}</p>
          <div className="mt-6">
            <Link href={faqContent.ctaHref} className="inline-flex items-center gap-2 font-semibold text-primary">
              {faqContent.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </PageSection>

      <PageSection className="pb-16">
        <Testimonials items={testimonials ?? []} />
      </PageSection>
    </>
  );
}

Home.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    services: PropTypes.object,
    key_points: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            icon: PropTypes.string,
          }),
        ])
      ),
    }),
    process: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      steps: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
        })
      ),
      note: PropTypes.string,
    }),
    boundaries: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string,
          answer: PropTypes.string,
        })
      ),
    }),
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
      ...(await serverSideTranslations(locale, ['common', 'home', 'faq'])),
    },
  });
}
