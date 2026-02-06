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

/**
 * Standard Narrative Structure for Case Studies
 */
export interface CaseItem {
    slug?: string;
    title: string;
    context: string;          // 背景 (Context)
    challenge: string;        // 挑戰 (Challenge)
    action: string;           // 行動 (Action)
    coaching_pivot: string;   // 教練介入點 (Coaching Pivot)
    results: string;          // 成果 (Results)
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
    title?: string;
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
