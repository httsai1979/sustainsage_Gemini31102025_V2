import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AcademicCapIcon, ArrowsRightLeftIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

import Testimonials from '@/components/Testimonials';
import FAQAccordion from '@/components/faq/FAQAccordion';
import TopicsHero from '@/components/sections/TopicsHero';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
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
  },
  {
    title: 'Career changers',
    description:
      'Those translating experience between countries or industries and needing calm structure to test new directions.',
    icon: ArrowsRightLeftIcon,
  },
  {
    title: 'Purpose-driven individuals',
    description:
      'Graduates, working parents, and community builders who want support aligning their work with their values.',
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
  const recognise = content?.recognise ?? {};
  const boundaries = content?.boundaries ?? {};

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
    Array.isArray(content?.audiences) && content.audiences.length
      ? content.audiences
      : DEFAULT_WHO_CARDS,
    (item) => item?.title ?? item?.description ?? ''
  );

  const whoCards = DEFAULT_WHO_CARDS.map((card, index) => ({
    ...card,
    description: audiences[index]?.description ?? card.description,
  }));

  const processCards = (processSteps.length ? processSteps : [
    {
      title: 'Initial conversation',
      description:
        'A short chat to understand what is changing and share the boundaries we work within.',
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
  ]).slice(0, 4);

  const recogniseItems = dedupeBy(
    orderSections(Array.isArray(recognise?.items) ? recognise.items : []),
    (item, index) => (typeof item === 'string' ? item : item?.title ?? item?.description ?? index)
  );

  const coachingIsBullets = [process?.description, process?.note, hero?.subheadline]
    .filter(Boolean)
    .slice(0, 3);
  const coachingIsNotBullets = [boundaries?.description, boundaries?.note]
    .filter(Boolean)
    .slice(0, 3);

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
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
            <ResponsiveImage
              src={hero?.image?.src ?? hero?.imageSrc ?? '/images/placeholder-hero.jpg'}
              alt={hero?.image?.alt ?? hero?.imageAlt ?? hero?.title ?? 'SustainSage coaching hero'}
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-sustain-text text-white">
            <ResponsiveImage
              src={hero?.image?.src ?? hero?.imageSrc ?? '/images/placeholder-hero.jpg'}
              alt=""
              width={1600}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-sustain-text/90" aria-hidden />
            <div className="relative flex h-full flex-col gap-6 p-8 md:p-10">
              {hero?.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{hero.eyebrow}</p>
              ) : null}
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                  {hero?.title ?? hero?.headline ?? 'Space for life’s turning points'}
                </h1>
                {hero?.description || hero?.subheadline ? (
                  <p className="text-base leading-relaxed text-white/90">
                    {hero?.description ?? hero?.subheadline}
                  </p>
                ) : null}
                {showFallbackNotice ? (
                  <p className="text-xs font-medium text-white/80">{fallbackMessage}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={hero?.primaryCta?.href ?? '/contact'} className="ss-btn-primary">
                  {hero?.primaryCta?.label ?? hero?.primaryCta ?? 'Book a chat'}
                </Link>
                <Link href={hero?.secondaryCta?.href ?? '/services'} className="ss-btn-secondary text-sustain-text">
                  {hero?.secondaryCta?.label ?? hero?.secondaryCta ?? 'Explore services'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-work-with" className="ss-section">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">Who coaching is for</p>
          <h2 className="text-3xl font-semibold text-sustain-text">People who find this space helpful</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whoCards.map((card) => {
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
          <Card title="What coaching is" icon={<Icon name="spark" />}>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
              {coachingIsBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sustain-green" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="What coaching isn’t" icon={<Icon name="info" />}>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
              {coachingIsNotBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sustain-green" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
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
          <StepList steps={processCards} />
        </div>
      </section>

      <TopicsHero
        eyebrow={recognise?.eyebrow ?? 'Areas we can explore together'}
        title={recognise?.title ?? 'Coaching topics we cover'}
        description={recognise?.intro ?? 'Surface the themes that matter—career transitions, leadership, belonging, and boundaries.'}
        ctaLabel="See topics"
        ctaHref="#topics"
        backgroundImage={recognise?.image?.src ?? '/images/coach-topics.jpg'}
        backgroundAlt={recognise?.image?.alt ?? recognise?.title ?? 'Coaching topics background'}
      />

      <section id="topics" className="ss-section">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recogniseItems.map((item, index) => (
            <Card key={item?.title ?? item ?? index} title={item?.title ?? item}>
              <p className="text-sm text-slate-700">{item?.description ?? item}</p>
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
            {services?.description ? (
              <p className="text-base text-slate-700">{services.description}</p>
            ) : null}
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
            {boundaries?.description ? (
              <p className="text-base text-slate-700">{boundaries.description}</p>
            ) : null}
          </div>
          <div className="mt-8 rounded-card rounded-2xl border border-slate-100 bg-white p-4 shadow-md">
            <FAQAccordion items={boundaryItems} />
          </div>
        </section>
      ) : null}

      <section className="ss-section">
        <div className="rounded-card rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-md md:p-10">
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
      ...(await serverSideTranslations(locale, ['common', 'home', 'faq'])),
    },
  });
}
