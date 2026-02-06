import { z } from 'zod';
import type {
    ServicePage,
} from '@/types/service';

const nonEmptyString = z.string().trim().min(1);

const ctaSchema = z.object({
    label: nonEmptyString,
    href: nonEmptyString,
    target: z.string().optional(),
});

const seoSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
});

const heroSchema = z.object({
    eyebrow: z.string().optional(),
    title: nonEmptyString,
    subtitle: z.string().optional(),
    primaryCta: ctaSchema.optional(),
    secondaryCta: ctaSchema.optional(),
    image: z.object({
        src: nonEmptyString,
        alt: z.string().optional(),
    }).optional(),
});

const featureItemSchema = z.object({
    title: nonEmptyString,
    description: z.string().optional(),
    iconName: z.string().optional(),
});

const featuresSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    items: z.array(featureItemSchema),
});

const pricingPackageSchema = z.object({
    title: nonEmptyString,
    price: z.string().optional(),
    duration: z.string().optional(),
    highlights: z.array(z.string()),
    ctaLabel: z.string().optional(),
});

const pricingSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    packages: z.array(pricingPackageSchema),
    policies: z.array(z.string()).optional(),
});

const faqItemSchema = z.object({
    question: nonEmptyString,
    answer: z.union([z.string(), z.array(z.string())]),
});

const faqSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    items: z.array(faqItemSchema),
});

const caseItemSchema = z.preprocess((val: any) => {
    if (val && typeof val === 'object') {
        // Map legacy fields if new ones are missing
        if (!val.challenge) val.challenge = val.context || "";
        if (!val.action) val.action = val.coaching_moves || "";
        if (!val.coaching_pivot) val.coaching_pivot = val.coaching_moves || "";
        if (!val.results) val.results = val.shift || val.outcome || "";
    }
    return val;
}, z.object({
    slug: z.string().optional(),
    title: nonEmptyString,
    context: z.string(),
    challenge: z.string(),
    action: z.string(),
    coaching_pivot: z.string(),
    results: z.string(),
    tools_used: z.array(z.string()).optional(),
    disclaimer: z.string().optional(),
}));

const casesSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    items: z.array(caseItemSchema),
});

const serviceCtaSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    primary: ctaSchema.optional(),
    secondary: ctaSchema.optional(),
});

export const servicePageSchema = z.preprocess((val: any) => {
    // Map legacy keys to new Unified Schema keys
    if (val && typeof val === 'object') {
        if (val.key_points && !val.features) {
            val.features = val.key_points;
        }
    }
    return val;
}, z.object({
    seo: seoSchema.optional(),
    hero: heroSchema,
    features: featuresSchema,
    pricing: pricingSchema.optional(),
    faq: faqSchema.optional(),
    cases: casesSchema.optional(),
    cta: serviceCtaSchema.optional(),
    process: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        steps: z.array(z.string()),
    }).optional(),
    readiness: z.object({
        checklist: z.array(z.string()),
        what_to_prepare: z.array(z.string()),
        signals: z.array(z.string()),
    }).optional(),
}));

export const localizedServiceSchema = z.object({
    'en-GB': servicePageSchema,
    'zh-TW': servicePageSchema,
});

export function validateServiceContent(content: unknown, locale?: string): ServicePage {
    const result = servicePageSchema.safeParse(content);

    if (!result.success) {
        const issues = result.error.issues
            .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
            .join('\n');
        const localeLabel = locale ?? 'unknown locale';
        throw new Error(`Invalid service content for ${localeLabel}:\n${issues}`);
    }

    return result.data as ServicePage;
}
