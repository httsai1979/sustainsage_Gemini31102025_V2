import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AcademicCapIcon, GlobeAltIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import Testimonials from '@/components/Testimonials';
import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import StepList from '@/components/ui/StepList';
import { getIconComponent } from '@/components/icons/map';
import { loadJSON } from '@/lib/content';
import { orderSections } from '@/lib/content/normalize';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

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
  const boundaries = content?.boundaries ?? {};
  const boundaryItems = dedupeBy(
    orderSections(Array.isArray(boundaries?.items) ? boundaries.items : []),
    (item) => item?.question ?? item?.title ?? item?.answer ?? ''
  );
  const fallbackMessage =
    fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';
  const audiences = dedupeBy(
    Array.isArray(content?.audiences) ? content.audiences : AUDIENCE_CARDS,
    (item) => item?.title ?? item?.description ?? ''
  );
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

  const recognise = content?.recognise ?? {};
  const recogniseItems = dedupeBy(
    orderSections(Array.isArray(recognise?.items) ? recognise.items : []),
    (item) => (typeof item === 'string' ? item : item?.title ?? item?.description ?? '')
  );
  const whatCoachingIs = process?.description ??
    'Sessions stay calm, structured, and paced around what is happening in your real life.';
  const whatCoachingIsNot = boundaries?.description ??
    'We hold ICF-aligned boundaries, refer to specialists when needed, and avoid one-size-fits-all advice.';

  return (
    <main className="ss-container">
      <section className="ss-section">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            {hero?.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-green/80">{hero.eyebrow}</p>
            ) : null}
            <h1 className="text-4xl font-semibold leading-tight text-sustain-text md:text-5xl">
              {hero?.title ?? hero?.headline ?? 'Grounded coaching for transitions'}
            </h1>
            {hero?.description || hero?.subheadline ? (
              <p className="text-base leading-7 text-slate-700">
                {hero?.description ?? hero?.subheadline}
              </p>
            ) : null}
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Link
                href={hero?.primaryCta?.href ?? '/contact'}
                className="ss-btn-primary"
              >
                {hero?.primaryCta?.label ?? hero?.primaryCta ?? 'Book a 20-minute chat'}
              </Link>
              <Link
                href={hero?.secondaryCta?.href ?? '/services'}
                className="ss-btn-secondary"
              >
                {hero?.secondaryCta?.label ?? hero?.secondaryCta ?? 'See services'}
              </Link>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="rounded-card border border-sustain-cardBorder bg-white p-3 shadow-card">
              <ResponsiveImage
                src={hero?.image?.src ?? hero?.imageSrc ?? '/images/placeholder-hero.jpg'}
                alt={hero?.image?.alt ?? hero?.imageAlt ?? hero?.title ?? 'Hero image'}
                width={1600}
                height={900}
                className="rounded-card"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-work-with" className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">Who this is for</p>
          <h2 className="text-3xl font-semibold text-sustain-text">People who find this space helpful</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card
                key={card.title}
                title={card.title}
                subtitle={card.description}
                icon={IconComponent ? <IconComponent className="h-6 w-6" aria-hidden /> : null}
              />
            );
          })}
        </div>
      </section>

      <section className="ss-section">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card title="What coaching is">
            <p>{whatCoachingIs}</p>
            {process?.note ? <p className="mt-3 text-sm text-slate-600">{process.note}</p> : null}
          </Card>
          <Card title="What coaching is not">
            <p>{whatCoachingIsNot}</p>
            {boundaries?.note ? <p className="mt-3 text-sm text-slate-600">{boundaries.note}</p> : null}
          </Card>
        </div>
      </section>

      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">
            {process?.eyebrow ?? 'How we work together'}
          </p>
          <h2 className="text-3xl font-semibold text-sustain-text">
            {process?.title ?? 'A calm structure for reflective work'}
          </h2>
          {process?.description ? (
            <p className="text-base text-slate-700">{process.description}</p>
          ) : null}
        </div>
        <div className="mt-8">
          <StepList steps={processCards} className="mx-auto max-w-3xl md:mx-0" />
        </div>
      </section>

      <section className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">
            {recognise?.eyebrow ?? 'Coaching topics'}
          </p>
          <h2 className="text-3xl font-semibold text-sustain-text">
            {recognise?.title ?? 'Common coaching topics'}
          </h2>
          {recognise?.intro ? <p className="text-base text-slate-700">{recognise.intro}</p> : null}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recogniseItems.map((item, index) => (
            <Card key={item?.title ?? item ?? index} title={item?.title}>
              <p>{item?.description ?? item}</p>
            </Card>
          ))}
        </div>
      </section>

      {serviceCards.length ? (
        <section className="ss-section">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">
              {services?.eyebrow ?? 'Coaching pathways'}
            </p>
            <h2 className="text-3xl font-semibold text-sustain-text">
              {services?.title ?? 'Services to match your stage'}
            </h2>
            {services?.description ? <p className="text-base text-slate-700">{services.description}</p> : null}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.slice(0, 3).map((card) => {
              const IconComponent = getIconComponent(card.icon);
              return (
                <Card
                  key={card.href ?? card.title}
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
              );
            })}
          </div>
        </section>
      ) : null}

      {boundaryItems.length ? (
        <section className="ss-section">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">{boundaries?.eyebrow}</p>
            <h2 className="text-3xl font-semibold text-sustain-text">{boundaries?.title}</h2>
            {boundaries?.description ? <p className="text-base text-slate-700">{boundaries.description}</p> : null}
          </div>
          <div className="mt-8 rounded-card border border-sustain-cardBorder bg-white p-4 shadow-card">
            <FAQAccordion items={boundaryItems} />
          </div>
        </section>
      ) : null}

      <section className="ss-section">
        <div className="rounded-card border border-sustain-cardBorder bg-white p-6 text-center shadow-card md:p-10">
          <h2 className="text-3xl font-semibold text-sustain-text">{faqContent.title}</h2>
          <p className="mt-4 text-base text-slate-700">{faqContent.body}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={faqContent.ctaHref} className="ss-btn-secondary">
              {faqContent.ctaLabel}
            </Link>
            <Link href="/contact" className="ss-btn-primary">
              Book a conversation
            </Link>
          </div>
        </div>
      </section>

      <section className="ss-section">
        <Testimonials items={testimonials ?? []} />
      </section>
    </main>
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
