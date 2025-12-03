import type { CTA, ImageWithAlt, SeoMeta } from '@/types/home';

export type ResourcesHero = {
  eyebrow?: string;
  title: string;
  lead?: string;
  intro?: string[];
  chips?: string[];
  image?: ImageWithAlt;
};

export type ResourceTool = {
  id: string;
  slug?: string;
  title: string;
  eyebrow?: string;
  iconName?: string;
  summary: string[];
  href?: string;
  ctaLabel?: string;
  openInNewTab?: boolean;
};

export type ResourceBaseSection = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
};

export type ToolsSection = ResourceBaseSection & {
  type: 'tools';
  style?: 'cards';
  ctaLabel?: string;
  tools: ResourceTool[];
};

export type ResourceCard = {
  id?: string;
  iconName?: string;
  eyebrow?: string;
  title: string;
  body?: string[];
  bullets?: string[];
  meta?: string;
  href?: string;
  target?: string;
  rel?: string;
  ctaLabel?: string;
};

export type ResourceStep = {
  id?: string;
  title: string;
  body: string[];
  iconName?: string;
  stepNumber?: number;
};

export type ResourceServicesSection =
  | (ResourceBaseSection & {
      type: 'services';
      style: 'cards';
      columns?: number;
      cards: ResourceCard[];
    })
  | (ResourceBaseSection & {
      type: 'services';
      style: 'prose';
      body: string[];
    })
  | (ResourceBaseSection & {
      type: 'services';
      style: 'steps';
      steps: ResourceStep[];
    })
  | (ResourceBaseSection & {
      type: 'services';
      style: 'cta';
      body: string[];
      primaryCta?: CTA;
      secondaryCta?: CTA;
    });

export type ResourcesSection = ToolsSection | ResourceServicesSection;

export type ResourcesPageContent = {
  seo?: SeoMeta;
  hero: ResourcesHero;
  sections: ResourcesSection[];
  fallbackNotice?: string;
};
