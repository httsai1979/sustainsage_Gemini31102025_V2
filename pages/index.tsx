import type { GetStaticProps, NextPage } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RevealSection from '@/components/common/RevealSection';
import Testimonials from '@/components/Testimonials';
import FAQAccordion from '@/components/faq/FAQAccordion';
import MainLayout from '@/components/layout/MainLayout';
import CardShell from '@/components/ui/CardShell';
import Button from '@/components/ui/Button';
import HeroShell from '@/components/ui/HeroShell';
import PageSection from '@/components/ui/PageSection';
import StepList from '@/components/ui/StepList';
import Icon from '@/components/ui/Icon';
import { loadJSON } from '@/lib/content';
import { getHomePageContent } from '@/lib/homeContent';
import { toSerializable } from '@/lib/toSerializable';
import type {
  AccordionSection as AccordionSectionData,
  ComparisonSection as ComparisonSectionData,
  FaqCtaSection as FaqCtaSectionData,
  HomeHero,
  HomePageContent,
  HomeSection,
  PersonasSection as PersonasSectionData,
  PromoSection as PromoSectionData,
  SectionComponentMap,
  ServicesSection as ServicesSectionData,
  SoftCTASection as SoftCTASectionData,
  SplitSection as SplitSectionData,
  StepsSection as StepsSectionData,
  Testimonial,
  TopicsSection as TopicsSectionData,
} from '@/types/home';

const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

const CARD_PARAGRAPH_CLASS = 'text-base leading-relaxed text-ink/70';

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement<P>) => ReactElement;
};

type HomePageProps = {
  content: HomePageContent;
  testimonials: Testimonial[];
  showFallbackNotice: boolean;
  fallbackNotice: string | null;
};

const SECTION_COMPONENTS: SectionComponentMap = {
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

const Home: NextPageWithLayout<HomePageProps> = ({
  content,
  testimonials,
  showFallbackNotice,
  fallbackNotice,
}) => {
  const hero: HomeHero = content?.hero ?? {};
  const sections: HomeSection[] = Array.isArray(content?.sections) ? content.sections : [];
  const fallbackMessage = fallbackNotice ?? content?.fallbackNotice ?? DEFAULT_NOTICE;

  return (
    <main>
      <HomeHero
        hero={hero}
        showFallbackNotice={showFallbackNotice}
        fallbackNotice={fallbackMessage}
      />
      {sections.map((section, index) => {
        const Component = SECTION_COMPONENTS[section.type];
        return (
          <Component
            key={section?.id ?? section?.title ?? `home-section-${index}`}
            section={section}
          />
        );
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
};

Home.getLayout = function getLayout(page: ReactElement<HomePageProps>) {
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

type HomeHeroProps = {
  hero?: HomeHero;
  showFallbackNotice?: boolean;
  fallbackNotice?: string | null;
};

function HomeHero({ hero, showFallbackNotice = false, fallbackNotice = DEFAULT_NOTICE }: HomeHeroProps) {
  const chips = arrayify(hero?.chips);
  return (
    <HeroShell
      eyebrow={hero?.eyebrow}
      title={hero?.title}
      subtitle={hero?.subtitle}
      chips={chips}
      primaryCta={hero?.primaryCta ?? { href: '/contact', label: 'Book a 20-minute chat' }}
      secondaryCta={hero?.secondaryLink}
      meta={hero?.secondaryText}
      notice={showFallbackNotice ? fallbackNotice : null}
      image={hero?.image ?? { src: '/images/hero/main.jpg', alt: hero?.title }}
    />
  );
}

type SectionProps<T extends HomeSection> = {
  section: T;
};

function PersonasSection({ section }: SectionProps<PersonasSectionData>) {
  const intro = arrayify(section?.intro);
  const cards = Array.isArray(section?.cards) ? section.cards : [];
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      {intro.length ? (
        <div className="max-w-3xl space-y-3 text-base leading-relaxed text-ink/70">
          {renderParagraphs(intro, section?.id)}
        </div>
      ) : null}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, index) => (
          <RevealSection key={card?.id ?? card?.title ?? index} delay={(index % 3) * 0.08}>
            <CardShell iconName={card?.iconName} title={card?.title} className="h-full">
              {renderParagraphs(arrayify(card?.summary), `${card?.id}-summary`, {
                className: CARD_PARAGRAPH_CLASS,
              })}
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

function PromoSection({ section }: SectionProps<PromoSectionData>) {
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      <RevealSection>
        <CardShell className="bg-white/95">
          {renderParagraphs(arrayify(section?.body), `${section?.id}-body`, { className: CARD_PARAGRAPH_CLASS })}
          {section?.cta?.href ? (
            <div className="mt-4">
              <Button href={section.cta.href}>
                {section?.cta?.label ?? 'Learn more'}
              </Button>
            </div>
          ) : null}
        </CardShell>
      </RevealSection>
    </PageSection>
  );
}

function ComparisonSection({ section }: SectionProps<ComparisonSectionData>) {
  const intro = arrayify(section?.intro);
  const cards = [section?.leftCard, section?.rightCard].filter(Boolean);
  return (
    <PageSection id={section?.id} title={section?.title}>
      {intro.length ? (
        <div className="max-w-3xl space-y-3 text-base leading-relaxed text-ink/70">
          {renderParagraphs(intro, `${section?.id}-intro`)}
        </div>
      ) : null}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((card, index) => (
          <RevealSection key={card?.title ?? index} delay={index * 0.08}>
            <CardShell iconName={card?.iconName} title={card?.title}>
              <ul className="space-y-2">
                {arrayify(card?.bullets).map((bullet, bulletIndex) => (
                  <li
                    key={`${card?.title ?? 'card'}-bullet-${bulletIndex}`}
                    className="flex gap-3 text-base leading-relaxed text-ink/70"
                  >
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

function StepsSection({ section }: SectionProps<StepsSectionData>) {
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
      {intro.length ? (
        <div className="max-w-3xl space-y-3 text-base leading-relaxed text-ink/70">
          {renderParagraphs(intro, `${section?.id}-intro`)}
        </div>
      ) : null}
      <div className="mt-8">
        <RevealSection>
          <StepList steps={steps} />
        </RevealSection>
      </div>
    </PageSection>
  );
}

function TopicsSection({ section }: SectionProps<TopicsSectionData>) {
  const cards = Array.isArray(section?.cards) ? section.cards : [];
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      {section?.intro ? (
        <div className="max-w-3xl space-y-3 text-base leading-relaxed text-ink/70">
          {renderParagraphs(arrayify(section.intro), `${section?.id}-intro`)}
        </div>
      ) : null}
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

function ServicesSection({ section }: SectionProps<ServicesSectionData>) {
  const intro = arrayify(section?.intro);
  const cards = Array.isArray(section?.cards) ? section.cards : [];
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      {intro.length ? (
        <div className="max-w-3xl space-y-3 text-base leading-relaxed text-ink/70">
          {renderParagraphs(intro, `${section?.id}-intro`)}
        </div>
      ) : null}
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

function SplitSection({ section }: SectionProps<SplitSectionData>) {
  const columns = [section?.left, section?.right].filter(Boolean);
  return (
    <PageSection id={section?.id} title={section?.title}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {columns.map((column, index) => (
          <RevealSection key={column?.title ?? index} delay={index * 0.08}>
            <CardShell eyebrow={column?.eyebrow} title={column?.title}>
              {renderParagraphs(arrayify(column?.description), `${section?.id}-${index}-description`, {
                className: CARD_PARAGRAPH_CLASS,
              })}
              {Array.isArray(column?.items) && column.items.length ? (
                <div className="mt-4 space-y-3">
                  {column.items.map((item, itemIndex) => (
                    <div
                      key={item?.id ?? item?.title ?? itemIndex}
                      className="flex gap-3 rounded-2xl border border-sustain-cardBorder bg-white/90 p-3"
                    >
                      <Icon name={item?.iconName} />
                      <div className="flex-1">
                        <p className="font-semibold text-ink">{item?.title}</p>
                        {item?.summary ? <p className="text-base text-ink/70">{item.summary}</p> : null}
                        {item?.meta ? <p className="text-xs text-ink/60">{item.meta}</p> : null}
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
                  <Button href={column.link.href} variant="secondary">
                    {column.link.label ?? 'Learn more'}
                  </Button>
                </div>
              ) : null}
            </CardShell>
          </RevealSection>
        ))}
      </div>
    </PageSection>
  );
}

function AccordionSection({ section }: SectionProps<AccordionSectionData>) {
  const intro = arrayify(section?.intro);
  const items = Array.isArray(section?.faqs)
    ? section.faqs.map((item) => ({
        question: item?.question,
        answer: Array.isArray(item?.answer) ? item.answer.join(' ') : item?.answer,
      }))
    : [];
  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title}>
      {intro.length ? (
        <div className="max-w-3xl space-y-3 text-base leading-relaxed text-ink/70">
          {renderParagraphs(intro, `${section?.id}-intro`)}
        </div>
      ) : null}
      <div className="mt-8">
        <RevealSection>
          <FAQAccordion items={items} />
        </RevealSection>
      </div>
    </PageSection>
  );
}

function FaqCtaSection({ section }: SectionProps<FaqCtaSectionData>) {
  return (
    <PageSection id={section?.id}>
      <RevealSection>
        <div className="rounded-[32px] border border-white/70 bg-white/95 p-8 text-center shadow-card">
          {section?.title ? <h2 className="text-3xl font-semibold text-ink">{section.title}</h2> : null}
          {renderParagraphs(arrayify(section?.body), `${section?.id}-body`)}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {section?.primaryCta?.href ? (
              <Button href={section.primaryCta.href} variant="secondary">
                {section.primaryCta.label ?? 'Read more'}
              </Button>
            ) : null}
            {section?.secondaryCta?.href ? (
              <Button href={section.secondaryCta.href}>
                {section.secondaryCta.label ?? 'Contact us'}
              </Button>
            ) : null}
          </div>
        </div>
      </RevealSection>
    </PageSection>
  );
}

function SoftCTASection({ section }: SectionProps<SoftCTASectionData>) {
  return (
    <PageSection id={section?.id} background="paper" title={section?.title}>
      <RevealSection>
        <div className="rounded-[32px] border border-white/70 bg-white/95 p-8 shadow-card">
          {renderParagraphs(arrayify(section?.body), `${section?.id}-body`)}
          <div className="mt-6 flex flex-wrap gap-3">
            {section?.primaryCta?.href ? (
              <Button href={section.primaryCta.href}>
                {section.primaryCta.label ?? 'Book a chat'}
              </Button>
            ) : null}
            {section?.secondaryLink?.href ? (
              <Button href={section.secondaryLink.href} variant="secondary">
                {section.secondaryLink.label ?? 'Read more'}
              </Button>
            ) : null}
          </div>
        </div>
      </RevealSection>
    </PageSection>
  );
}

function arrayify(value?: string | string[] | null): string[] {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [value];
  return [];
}

function renderParagraphs(paragraphs: string[], keyPrefix = 'paragraph', options: { className?: string } = {}) {
  if (!Array.isArray(paragraphs) || !paragraphs.length) return null;
  const className = options?.className ?? 'text-base leading-relaxed text-ink/70';
  return paragraphs.map((paragraph, index) => (
    <p key={`${keyPrefix}-${index}`} className={className}>
      {paragraph}
    </p>
  ));
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale = 'en-GB' }) => {
  const { content, isFallback } = getHomePageContent(locale);
  const typedContent = (content ?? {}) as HomePageContent;
  const testimonials = (loadJSON('testimonials', locale) ?? []) as Testimonial[];

  return toSerializable({
    props: {
      content: typedContent,
      testimonials,
      showFallbackNotice: isFallback,
      fallbackNotice: typedContent?.fallbackNotice ?? null,
      ...(await serverSideTranslations(locale ?? 'en-GB', ['common', 'nav', 'home', 'faq'])),
    },
  });
};

export default Home;
