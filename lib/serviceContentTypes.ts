export const SERVICE_SLUGS = ['career-return', 'immigrant-job', 'graduate-start'] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceCaseItem = {
  slug?: string;
  title?: string;
  context?: string;
  coaching_moves?: string;
  shift?: string;
  tools_used?: string[];
  disclaimer?: string;
};

export type ServiceProcessStep = {
  title?: string;
  description?: string;
};

export type ServicePricingPackage = {
  name?: string;
  title?: string;
  duration?: string;
  scope?: string;
  description?: string;
  price_note?: string;
  price?: string;
};

export type ServicePricingPolicy = {
  title?: string;
  body?: string;
};

export type ServiceFaqItem = {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
};

export type ServiceContent = {
  slug: ServiceSlug;
  title?: string;
  fallbackNotice?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  };
  pricing?: {
    title?: string;
    description?: string;
    note?: string;
    packages?: ServicePricingPackage[];
    plans?: ServicePricingPackage[];
    policies?: ServicePricingPolicy[];
    notes?: string[];
    intro?: string;
  };
  readiness?: {
    title?: string;
    description?: string;
    checklist?: string[];
    what_to_prepare?: string[];
    signals?: string[];
  };
  process?: {
    title?: string;
    description?: string;
    steps?: ServiceProcessStep[];
    note?: string;
  };
  agreement?: {
    title?: string;
    description?: string;
    sections?: {
      heading?: string;
      title?: string;
      label?: string;
      body?: string;
      description?: string;
      paragraphs?: string[];
    }[];
  };
  faq?: {
    title?: string;
    description?: string;
    items?: ServiceFaqItem[];
  };
  cases?: {
    title?: string;
    description?: string;
    items?: ServiceCaseItem[];
  };
};
