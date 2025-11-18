import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RevealSection from '@/components/common/RevealSection';
import Testimonials from '@/components/Testimonials';
import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import CardShell from '@/components/ui/CardShell';
import PageSection from '@/components/ui/PageSection';
import StepList from '@/components/ui/StepList';
import Icon from '@/components/ui/Icon';
import { loadJSON } from '@/lib/content';
import { getHomePageContent } from '@/lib/homeContent';
import { toSerializable } from '@/lib/toSerializable';

const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

const CARD_PARAGRAPH_CLASS = 'text-sm leading-relaxed text-sustain-textMuted';

const SECTION_COMPONENTS = {
  personas: PersonasSection,
  promo: PromoSection,
  comparison: ComparisonSection,
  steps: StepsSection,
  topics: TopicsSection,
  services: ServicesSection,
  split: SplitSection,
  accordion: AccordionSection,
  'faq-cta': FaqCtaSection,
  cta: SoftCTASection,
};

export default function Home({
  content = {},
  testimonials = [],
  showFallbackNotice = false,
  fallbackNotice = null,
} = {}) {
  const hero = content?.hero ?? {};
  const sections = Array.isArray(content?.sections) ? content.sections : [];
  const fallbackMessage = fallbackNotice ?? content?.fallbackNotice ?? DEFAULT_NOTICE;

  return (
    <main>
      <HomeHero hero={hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackMessage} />
      {sections.map((section, index) => {
        const Component = SECTION_COMPONENTS[section?.type];
        if (!Component) {
          return null;
        }
        return <Component key={section?.id ?? section?.title ?? `home-section-${index}`} section={section} />;
      })}
      {Array.isArray(testimonials) && testimonials.length ? (
        <PageSection id="testimonials" title={content?.testimonialsSection?.title}>
          <RevealSection>
            <Testimonials items={testimonials} />
          </RevealSection>
        </PageSection>
      ) : null}
    </main>
  );
}

Home.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    sections: PropTypes.arrayOf(PropTypes.object),
    testimonialsSection: PropTypes.object,
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    fallbackNotice: PropTypes.string,
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

function HomeHero({ hero = {}, showFallbackNotice = false, fallbackNotice = DEFAULT_NOTICE }) {
  const chips = arrayify(hero?.chips);
  return (
    <section id="home-hero" className="ssg-section bg-sustain-pageBg">
      <div className="ssg-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
        <RevealSection>
          <div className="space-y-5">
            {hero?.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-primary/80">{hero.eyebrow}</p>
            ) : null}
            {hero?.title ? <h1 className="text-4xl font-semibold text-sustain-textMain md:text-5xl">{hero.title}</h1> : null}
            {hero?.subtitle ? (
              <p className="text-base leading-7 text-sustain-textMuted">{hero.subtitle}</p>
            ) : null}
            {chips.length ? (
              <div className="flex flex-wrap gap-3">
                {chips.map((chip, index) => (
                  <span
                    key={`${chip}-${index}`}
                    className="rounded-full border border-sustain-cardBorder bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sustain-textMuted"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Link href={hero?.primaryCta?.href ?? '/contact'} className="ss-btn-primary">
                {hero?.primaryCta?.label ?? 'Book a 20-minute chat'}
              </Link>
              {hero?.secondaryLink?.href ? (
                <Link href={hero.secondaryLink.href} className="ss-btn-secondary">
                  {hero.secondaryLink.label ?? 'Learn more'}
                </Link>
              ) : null}
            </div>
            {hero?.secondaryText ? (
              <p className="text-sm font-medium text-sustain-textMuted">{hero.secondaryText}</p>
            ) : null}
            {showFallbackNotice ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sustain-textMuted">{fallbackNotice}</p>
            ) : null}
          </div>
        </RevealSection>
        <RevealSection delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white shadow-xl">
            <Image
              src={hero?.image?.src ?? '/images/hero/main.jpg'}
              alt={hero?.image?.alt ?? hero?.title ?? 'Coach and client in a calm conversation'}
              width={960}
              height={960}
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sustain-text/10 via-transparent to-white/30"
              aria-hidden="true"
            />
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function PersonasSection({ section }) {
  const intro = arrayify(section?.intro);
  const cards = Array.isArray(section?.cards) ? section.cards : [];
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      {intro.length ? <div className="max-w-3xl space-y-3 text-base leading-7 text-sustain-textMuted">{renderParagraphs(intro, section?.id)}</div> : null}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, index) => (
          <RevealSection key={card?.id ?? card?.title ?? index} delay={(index % 3) * 0.08}>
            <CardShell iconName={card?.iconName} title={card?.title} className="h-full">
              {renderParagraphs(arrayify(card?.summary), `${card?.id}-summary`, { className: CARD_PARAGRAPH_CLASS })}
              {card?.href ? (
                <div className="mt-4">
                  <Link href={card.href} className="inline-flex items-center gap-2 font-semibold text-sustain-primary">
                    {card?.ctaLabel ?? 'Learn more'}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              ) : null}
            </CardShell>
          </RevealSection>
        ))}
      </div>
    </PageSection>
  );
}

function PromoSection({ section }) {
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      <RevealSection>
        <CardShell className="bg-white/95">
          {renderParagraphs(arrayify(section?.body), `${section?.id}-body`, { className: CARD_PARAGRAPH_CLASS })}
          {section?.cta?.href ? (
            <div className="mt-4">
              <Link href={section.cta.href} className="ss-btn-primary">
                {section?.cta?.label ?? 'Learn more'}
              </Link>
            </div>
          ) : null}
        </CardShell>
      </RevealSection>
    </PageSection>
  );
}

function ComparisonSection({ section }) {
  const intro = arrayify(section?.intro);
  const cards = [section?.leftCard, section?.rightCard].filter(Boolean);
  return (
    <PageSection id={section?.id} title={section?.title}>
      {intro.length ? <div className="max-w-3xl space-y-3 text-base leading-7 text-sustain-textMuted">{renderParagraphs(intro, `${section?.id}-intro`)}</div> : null}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((card, index) => (
          <RevealSection key={card?.title ?? index} delay={index * 0.08}>
            <CardShell iconName={card?.iconName} title={card?.title}>
              <ul className="space-y-2">
                {arrayify(card?.bullets).map((bullet, bulletIndex) => (
                  <li key={`${card?.title ?? 'card'}-bullet-${bulletIndex}`} className="flex gap-3 text-sm leading-relaxed text-sustain-textMuted">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sustain-primary" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </CardShell>
          </RevealSection>
        ))}
      </div>
    </PageSection>
  );
}

function StepsSection({ section }) {
  const intro = arrayify(section?.intro);
  const steps = Array.isArray(section?.steps)
    ? section.steps.map((step, index) => ({
        title: step?.title,
        description: step?.description,
        icon: step?.iconName,
        stepNumber: index + 1,
      }))
    : [];
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      {intro.length ? <div className="max-w-3xl space-y-3 text-base leading-7 text-sustain-textMuted">{renderParagraphs(intro, `${section?.id}-intro`)}</div> : null}
      <div className="mt-8">
        <RevealSection>
          <StepList steps={steps} />
        </RevealSection>
      </div>
    </PageSection>
  );
}

function TopicsSection({ section }) {
  const cards = Array.isArray(section?.cards) ? section.cards : [];
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      {section?.intro ? <div className="max-w-3xl space-y-3 text-base leading-7 text-sustain-textMuted">{renderParagraphs(arrayify(section.intro), `${section?.id}-intro`)}</div> : null}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, index) => (
          <RevealSection key={card?.id ?? card?.title ?? index} delay={(index % 4) * 0.08}>
            <CardShell iconName={card?.iconName} title={card?.title} className="h-full">
              {renderParagraphs(arrayify(card?.summary), `${card?.id}-summary`, { className: CARD_PARAGRAPH_CLASS })}
            </CardShell>
          </RevealSection>
        ))}
      </div>
    </PageSection>
  );
}

function ServicesSection({ section }) {
  const intro = arrayify(section?.intro);
  const cards = Array.isArray(section?.cards) ? section.cards : [];
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      {intro.length ? <div className="max-w-3xl space-y-3 text-base leading-7 text-sustain-textMuted">{renderParagraphs(intro, `${section?.id}-intro`)}</div> : null}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <RevealSection key={card?.id ?? card?.title ?? index} delay={(index % 3) * 0.08}>
            <CardShell iconName={card?.iconName} title={card?.title} className="h-full">
              {renderParagraphs(arrayify(card?.summary), `${card?.id}-summary`, { className: CARD_PARAGRAPH_CLASS })}
              {card?.href ? (
                <div className="mt-4">
                  <Link href={card.href} className="inline-flex items-center gap-2 font-semibold text-sustain-primary">
                    {card?.ctaLabel ?? 'Explore service'}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              ) : null}
            </CardShell>
          </RevealSection>
        ))}
      </div>
    </PageSection>
  );
}

function SplitSection({ section }) {
  const columns = [section?.left, section?.right].filter(Boolean);
  return (
    <PageSection id={section?.id} title={section?.title}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {columns.map((column, index) => (
          <RevealSection key={column?.title ?? index} delay={index * 0.08}>
            <CardShell eyebrow={column?.eyebrow} title={column?.title}>
              {renderParagraphs(arrayify(column?.description), `${section?.id}-${index}-description`, { className: CARD_PARAGRAPH_CLASS })}
              {Array.isArray(column?.items) && column.items.length ? (
                <div className="mt-4 space-y-3">
                  {column.items.map((item, itemIndex) => (
                    <div
                      key={item?.id ?? item?.title ?? itemIndex}
                      className="flex gap-3 rounded-2xl border border-sustain-cardBorder bg-white/90 p-3"
                    >
                      <Icon name={item?.iconName} />
                      <div className="flex-1">
                        <p className="font-semibold text-sustain-textMain">{item?.title}</p>
                        {item?.summary ? (
                          <p className="text-sm text-sustain-textMuted">{item.summary}</p>
                        ) : null}
                        {item?.meta ? (
                          <p className="text-xs text-sustain-textMuted">{item.meta}</p>
                        ) : null}
                      </div>
                      {item?.href ? (
                        <Link href={item.href} className="inline-flex items-center gap-1 text-sm font-semibold text-sustain-primary">
                          Open
                          <span aria-hidden>→</span>
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
              {column?.link?.href ? (
                <div className="mt-5">
                  <Link href={column.link.href} className="ss-btn-secondary">
                    {column.link.label ?? 'Learn more'}
                  </Link>
                </div>
              ) : null}
            </CardShell>
          </RevealSection>
        ))}
      </div>
    </PageSection>
  );
}

function AccordionSection({ section }) {
  const intro = arrayify(section?.intro);
  const items = Array.isArray(section?.faqs)
    ? section.faqs.map((item) => ({
        question: item?.question,
        answer: Array.isArray(item?.answer) ? item.answer.join(' ') : item?.answer,
      }))
    : [];
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      {intro.length ? <div className="max-w-3xl space-y-3 text-base leading-7 text-sustain-textMuted">{renderParagraphs(intro, `${section?.id}-intro`)}</div> : null}
      <div className="mt-8">
        <RevealSection>
          <FAQAccordion items={items} />
        </RevealSection>
      </div>
    </PageSection>
  );
}

function FaqCtaSection({ section }) {
  return (
    <PageSection id={section?.id}>
      <RevealSection>
        <div className="rounded-3xl border border-sustain-cardBorder bg-white p-6 text-center shadow-sm md:p-8">
          {section?.title ? <h2 className="text-2xl font-semibold text-sustain-textMain">{section.title}</h2> : null}
          {renderParagraphs(arrayify(section?.body), `${section?.id}-body`)}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {section?.primaryCta?.href ? (
              <Link href={section.primaryCta.href} className="ss-btn-secondary">
                {section.primaryCta.label ?? 'Read more'}
              </Link>
            ) : null}
            {section?.secondaryCta?.href ? (
              <Link href={section.secondaryCta.href} className="ss-btn-primary">
                {section.secondaryCta.label ?? 'Contact us'}
              </Link>
            ) : null}
          </div>
        </div>
      </RevealSection>
    </PageSection>
  );
}

function SoftCTASection({ section }) {
  return (
    <PageSection id={section?.id} background="paper" title={section?.title}>
      <RevealSection>
        <div className="rounded-3xl border border-sustain-cardBorder bg-white/95 p-6 shadow-sm md:p-8">
          {renderParagraphs(arrayify(section?.body), `${section?.id}-body`)}
          <div className="mt-6 flex flex-wrap gap-3">
            {section?.primaryCta?.href ? (
              <Link href={section.primaryCta.href} className="ss-btn-primary">
                {section.primaryCta.label ?? 'Book a chat'}
              </Link>
            ) : null}
            {section?.secondaryLink?.href ? (
              <Link href={section.secondaryLink.href} className="ss-btn-secondary">
                {section.secondaryLink.label ?? 'Read more'}
              </Link>
            ) : null}
          </div>
        </div>
      </RevealSection>
    </PageSection>
  );
}

function arrayify(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [value];
  return [];
}

function renderParagraphs(paragraphs = [], keyPrefix = 'paragraph', options = {}) {
  if (!Array.isArray(paragraphs) || !paragraphs.length) return null;
  const className = options?.className ?? 'text-base leading-7 text-sustain-textMuted';
  return paragraphs.map((paragraph, index) => (
    <p key={`${keyPrefix}-${index}`} className={className}>
      {paragraph}
    </p>
  ));
}

export async function getStaticProps({ locale = 'en-GB' }) {
  const { content, isFallback } = getHomePageContent(locale);
  const testimonials = loadJSON('testimonials', locale);

  return toSerializable({
    props: {
      content,
      testimonials,
      showFallbackNotice: isFallback,
      fallbackNotice: content?.fallbackNotice ?? null,
      ...(await serverSideTranslations(locale, ['common', 'nav', 'home', 'faq'])),
    },
  });
}
