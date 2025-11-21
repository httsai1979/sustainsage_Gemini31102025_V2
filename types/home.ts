import type { ComponentType } from 'react';

export type SeoMeta = {
  title?: string;
  description?: string;
};

export type CTA = {
  href: string;
  label?: string;
};

export type ImageWithAlt = {
  src: string;
  alt?: string;
};

export type HomeHero = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  chips?: string[];
  primaryCta?: CTA;
  secondaryLink?: CTA;
  secondaryText?: string;
  image?: ImageWithAlt;
};

export type PersonaCard = {
  id?: string;
  iconName?: string;
  title?: string;
  summary?: string[];
  href?: string;
  ctaLabel?: string;
};

export type ComparisonCard = {
  iconName?: string;
  title?: string;
  bullets?: string[];
};

export type StepItem = {
  id?: string;
  title?: string;
  description?: string;
  iconName?: string;
  stepNumber?: number;
};

export type TopicCard = {
  id?: string;
  iconName?: string;
  title?: string;
  summary?: string[];
};

export type ServiceCard = {
  id?: string;
  iconName?: string;
  title?: string;
  summary?: string[];
  href?: string;
  ctaLabel?: string;
};

export type SplitItem = {
  id?: string;
  iconName?: string;
  title?: string;
  summary?: string;
  meta?: string;
  href?: string;
};

export type SplitColumn = {
  eyebrow?: string;
  title?: string;
  description?: string[];
  items?: SplitItem[];
  link?: CTA;
};

export type FaqItem = {
  id?: string;
  question?: string;
  answer?: string | string[];
};

export type HomeBaseSection = {
  id?: string;
  eyebrow?: string;
  title?: string;
};

export type PersonasSection = HomeBaseSection & {
  type: 'personas';
  intro?: string[];
  cards?: PersonaCard[];
};

export type PromoSection = HomeBaseSection & {
  type: 'promo';
  body?: string[];
  cta?: CTA;
};

export type ComparisonSection = HomeBaseSection & {
  type: 'comparison';
  intro?: string[];
  leftCard?: ComparisonCard;
  rightCard?: ComparisonCard;
};

export type StepsSection = HomeBaseSection & {
  type: 'steps';
  intro?: string[];
  steps?: StepItem[];
};

export type TopicsSection = HomeBaseSection & {
  type: 'topics';
  intro?: string[];
  cards?: TopicCard[];
};

export type ServicesSection = HomeBaseSection & {
  type: 'services';
  intro?: string[];
  cards?: ServiceCard[];
};

export type SplitSection = HomeBaseSection & {
  type: 'split';
  left?: SplitColumn;
  right?: SplitColumn;
};

export type AccordionSection = HomeBaseSection & {
  type: 'accordion';
  intro?: string[];
  faqs?: FaqItem[];
};

export type FaqCtaSection = HomeBaseSection & {
  type: 'faq-cta';
  body?: string[];
  primaryCta?: CTA;
  secondaryCta?: CTA;
};

export type SoftCTASection = HomeBaseSection & {
  type: 'cta';
  body?: string[];
  primaryCta?: CTA;
  secondaryLink?: CTA;
};

export type HomeSection =
  | PersonasSection
  | PromoSection
  | ComparisonSection
  | StepsSection
  | TopicsSection
  | ServicesSection
  | SplitSection
  | AccordionSection
  | FaqCtaSection
  | SoftCTASection;

export type SectionComponentMap = {
  [Type in HomeSection['type']]: ComponentType<{ section: Extract<HomeSection, { type: Type }> }>;
};

export type TestimonialsSection = {
  title?: string;
};

export type HomePageContent = {
  seo?: SeoMeta;
  hero?: HomeHero;
  sections?: HomeSection[];
  testimonialsSection?: TestimonialsSection;
  fallbackNotice?: string;
};

export type Testimonial = {
  quote: string;
  attribution?: string;
};
