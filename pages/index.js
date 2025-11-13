import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Testimonials from '@/components/Testimonials';
import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import PageSection from '@/components/ui/PageSection';
import { getIconComponent } from '@/components/icons/map';
import { loadJSON } from '@/lib/content';
import { orderSections } from '@/lib/content/normalize';
import { toSerializable } from '@/lib/toSerializable';

const BUTTON_PRIMARY =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800';
const BUTTON_SECONDARY =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100';

function ServiceCard({ card }) {
  const IconComponent = getIconComponent(card.icon);

  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/95 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          {IconComponent ? (
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <IconComponent className="h-6 w-6" />
            </span>
          ) : null}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            {card.description ? (
              <p className="text-sm leading-6 text-slate-700">{card.description}</p>
            ) : null}
          </div>
        </div>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        {card.linkLabel ?? 'Explore service'}
        <span aria-hidden className="transition group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

ServiceCard.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    href: PropTypes.string,
    linkLabel: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

function BulletList({ items = [] } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => {
        const key = typeof item === 'string' ? item : item.title ?? item.description;
        const iconKey = typeof item === 'string' ? null : item.icon;
        const IconComponent = getIconComponent(iconKey);

        return (
          <li
            key={key}
            className="flex items-start gap-4 rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-sm"
          >
            {IconComponent ? (
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <IconComponent className="h-6 w-6" />
              </span>
            ) : (
              <span aria-hidden className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-600" />
            )}
            <div className="space-y-1">
              {typeof item === 'string' ? (
                <span className="text-sm leading-6 text-slate-700">{item}</span>
              ) : (
                <>
                  {item.title ? (
                    <span className="block text-sm font-semibold text-slate-900">{item.title}</span>
                  ) : null}
                  {item.description ? (
                    <p className="text-sm leading-6 text-slate-700">{item.description}</p>
                  ) : null}
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

BulletList.propTypes = {
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
};

function StepList({ steps = [] } = {}) {
  if (!Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  return (
    <ol className="mt-8 space-y-6">
      {steps.map((step, index) => (
        <li key={step.title ?? index} className="flex gap-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
            {index + 1}
          </span>
          <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
            {step.title ? <h3 className="text-base font-semibold text-slate-900">{step.title}</h3> : null}
            {step.description ? (
              <p className="mt-2 text-sm leading-6 text-slate-700">{step.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

StepList.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

export default function Home({
  content = {},
  testimonials = [],
  showFallbackNotice = false,
  fallbackNotice = null,
} = {}) {
  const hero = content?.hero ?? {};
  const services = content?.services ?? {};
  const keyPoints = content?.key_points ?? {};
  const process = content?.process ?? {};
  const boundaries = content?.boundaries ?? {};
  const faqTeaser = content?.faqTeaser ?? {};
  const serviceCards = orderSections(Array.isArray(services?.cards) ? services.cards : []);
  const keyPointItems = orderSections(Array.isArray(keyPoints?.items) ? keyPoints.items : []);
  const processSteps = orderSections(Array.isArray(process?.steps) ? process.steps : []);
  const boundaryItems = orderSections(Array.isArray(boundaries?.items) ? boundaries.items : []);
  const fallbackMessage =
    fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return (
    <>
      <PageSection className="pt-10 md:pt-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-6">
            {hero?.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{hero.eyebrow}</p>
            ) : null}
            <h1 className="scroll-mt-28 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero?.title}</h1>
            {hero?.description ? <p className="text-base leading-7 text-slate-700">{hero.description}</p> : null}
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              {hero?.primaryCta?.href ? (
                <Link href={hero.primaryCta.href} className={BUTTON_PRIMARY}>
                  {hero.primaryCta.label}
                </Link>
              ) : null}
              {hero?.secondaryCta?.href ? (
                <Link href={hero.secondaryCta.href} className={BUTTON_SECONDARY}>
                  {hero.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
          {hero?.image?.src ? (
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-emerald-100 shadow-sm md:max-w-md">
              <Image
                src={hero.image.src}
                alt={hero.image.alt ?? ''}
                width={1600}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          ) : null}
        </div>
      </PageSection>

      {serviceCards.length ? (
        <PageSection eyebrow={services?.eyebrow} title={services?.title} lead={services?.description}>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {serviceCards.slice(0, 3).map((card) => (
              <ServiceCard key={card.href} card={card} />
            ))}
          </div>
        </PageSection>
      ) : null}

      {keyPointItems.length ? (
        <PageSection title={keyPoints?.title} lead={keyPoints?.description}>
          <div className="mt-6 rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-sm md:p-10">
            <BulletList items={keyPointItems} />
          </div>
        </PageSection>
      ) : null}

      {processSteps.length ? (
        <PageSection title={process?.title} lead={process?.description}>
          <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-8 shadow-sm md:p-10">
            <StepList steps={processSteps} />
            {process?.note ? (
              <p className="mt-6 text-xs leading-5 text-slate-500">{process.note}</p>
            ) : null}
          </div>
        </PageSection>
      ) : null}

      {boundaryItems.length ? (
        <PageSection title={boundaries?.title} lead={boundaries?.description}>
          <div className="mt-6 rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-sm md:p-10">
            <FAQAccordion items={boundaryItems} className="mt-6" />
          </div>
        </PageSection>
      ) : null}

      {faqTeaser?.title ? (
        <PageSection title={faqTeaser?.title}>
          <div className="mt-6 rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-sm md:p-10">
            <div className="space-y-4">
              {faqTeaser?.body ? <p className="text-sm leading-6 text-slate-700">{faqTeaser.body}</p> : null}
              {faqTeaser?.cta?.href ? (
                <Link
                  href={faqTeaser.cta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  {faqTeaser.cta.label}
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          </div>
        </PageSection>
      ) : null}

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
