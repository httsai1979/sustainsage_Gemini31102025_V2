export interface SEO {
    title?: string;
    description?: string;
    keywords?: string[];
}

export interface CTA {
    label: string;
    href: string;
    target?: string;
}

export interface Hero {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    primaryCta?: CTA;
    secondaryCta?: CTA;
    image?: {
        src: string;
        alt?: string;
    };
}

export interface FeatureItem {
    title: string;
    description?: string;
    iconName?: string;
}

export interface Features {
    title?: string;
    description?: string;
    items: FeatureItem[];
}

export interface PricingPackage {
    title: string;
    price?: string;
    duration?: string;
    highlights: string[];
    ctaLabel?: string;
}

export interface Pricing {
    title?: string;
    description?: string;
    packages: PricingPackage[];
    policies?: string[];
}

export interface FaqItem {
    question: string;
    answer: string | string[];
}

export interface FAQ {
    title?: string;
    description?: string;
    items: FaqItem[];
}

export interface CaseItem {
    slug?: string;
    title: string;
    context?: string;
    coaching_moves?: string;
    shift?: string;
    tools_used?: string[];
    disclaimer?: string;
}

export interface Cases {
    title?: string;
    description?: string;
    items: CaseItem[];
}

export interface ServiceCTA {
    title?: string;
    description?: string;
    primary?: CTA;
    secondary?: CTA;
}

export interface ServicePage {
    seo: SEO;
    hero: Hero;
    features: Features;
    pricing: Pricing;
    faq: FAQ;
    cases: Cases;
    cta: ServiceCTA;
    // Optional legacy or additional fields
    process?: {
        title?: string;
        description?: string;
        steps: string[];
    };
    readiness?: {
        checklist: string[];
        what_to_prepare: string[];
        signals: string[];
    };
}
