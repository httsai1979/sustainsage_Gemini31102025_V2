import { z } from 'zod';

import type { HomePageContent } from '@/types/home';

const ctaSchema = z.object({
  href: z.string().min(1, 'CTA href is required'),
  label: z.string().optional(),
});

const imageSchema = z.object({
  src: z.string().min(1, 'Image src is required'),
  alt: z.string().optional(),
});

const heroSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().min(1, 'Hero title is required'),
    subtitle: z.string().optional(),
    chips: z.array(z.string()).optional(),
    primaryCta: ctaSchema.optional(),
    secondaryLink: ctaSchema.optional(),
    secondaryText: z.string().optional(),
    image: imageSchema.optional(),
  })
  .strict();

const personaCardSchema = z
  .object({
    id: z.string().optional(),
    iconName: z.string().optional(),
    title: z.string().min(1, 'Persona title is required'),
    summary: z.array(z.string()).optional(),
    href: z.string().optional(),
    ctaLabel: z.string().optional(),
  })
  .strict();

const comparisonCardSchema = z
  .object({
    iconName: z.string().optional(),
    title: z.string().min(1, 'Comparison title is required'),
    bullets: z.array(z.string()).optional(),
  })
  .strict();

const stepItemSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(1, 'Step title is required'),
    description: z.string().optional(),
    iconName: z.string().optional(),
    stepNumber: z.number().optional(),
  })
  .strict();

const topicCardSchema = z
  .object({
    id: z.string().optional(),
    iconName: z.string().optional(),
    title: z.string().min(1, 'Topic title is required'),
    summary: z.array(z.string()).optional(),
  })
  .strict();

const serviceCardSchema = z
  .object({
    id: z.string().optional(),
    iconName: z.string().optional(),
    title: z.string().min(1, 'Service title is required'),
    summary: z.array(z.string()).optional(),
    href: z.string().optional(),
    ctaLabel: z.string().optional(),
  })
  .strict();

const splitItemSchema = z
  .object({
    id: z.string().optional(),
    iconName: z.string().optional(),
    title: z.string().optional(),
    summary: z.string().optional(),
    meta: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const splitColumnSchema = z
  .object({
    eyebrow: z.string().optional(),
    title: z.string().min(1, 'Column title is required'),
    description: z.array(z.string()).optional(),
    items: z.array(splitItemSchema).optional(),
    link: ctaSchema.optional(),
  })
  .strict();

const faqItemSchema = z
  .object({
    id: z.string().optional(),
    question: z.string().min(1, 'FAQ question is required'),
    answer: z.union([z.array(z.string()), z.string()]).optional(),
  })
  .strict();

const baseSectionSchema = z
  .object({
    id: z.string().optional(),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
  })
  .strict();

const personasSectionSchema = baseSectionSchema.extend({
  type: z.literal('personas'),
  intro: z.array(z.string()).optional(),
  cards: z.array(personaCardSchema).optional(),
});

const promoSectionSchema = baseSectionSchema.extend({
  type: z.literal('promo'),
  body: z.array(z.string()).optional(),
  cta: ctaSchema.optional(),
});

const comparisonSectionSchema = baseSectionSchema.extend({
  type: z.literal('comparison'),
  intro: z.array(z.string()).optional(),
  leftCard: comparisonCardSchema.optional(),
  rightCard: comparisonCardSchema.optional(),
});

const stepsSectionSchema = baseSectionSchema.extend({
  type: z.literal('steps'),
  intro: z.array(z.string()).optional(),
  steps: z.array(stepItemSchema).optional(),
});

const topicsSectionSchema = baseSectionSchema.extend({
  type: z.literal('topics'),
  intro: z.array(z.string()).optional(),
  cards: z.array(topicCardSchema).optional(),
});

const servicesSectionSchema = baseSectionSchema.extend({
  type: z.literal('services'),
  intro: z.array(z.string()).optional(),
  cards: z.array(serviceCardSchema).optional(),
});

const splitSectionSchema = baseSectionSchema.extend({
  type: z.literal('split'),
  left: splitColumnSchema.optional(),
  right: splitColumnSchema.optional(),
});

const accordionSectionSchema = baseSectionSchema.extend({
  type: z.literal('accordion'),
  intro: z.array(z.string()).optional(),
  faqs: z.array(faqItemSchema).optional(),
});

const faqCtaSectionSchema = baseSectionSchema.extend({
  type: z.literal('faq-cta'),
  body: z.array(z.string()).optional(),
  primaryCta: ctaSchema.optional(),
  secondaryCta: ctaSchema.optional(),
});

const softCtaSectionSchema = baseSectionSchema.extend({
  type: z.literal('cta'),
  body: z.array(z.string()).optional(),
  primaryCta: ctaSchema.optional(),
  secondaryLink: ctaSchema.optional(),
});

const homeSectionSchema = z.discriminatedUnion('type', [
  personasSectionSchema,
  promoSectionSchema,
  comparisonSectionSchema,
  stepsSectionSchema,
  topicsSectionSchema,
  servicesSectionSchema,
  splitSectionSchema,
  accordionSectionSchema,
  faqCtaSectionSchema,
  softCtaSectionSchema,
]);

export const homePageSchema = z
  .object({
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    hero: heroSchema,
    sections: z.array(homeSectionSchema).min(1, 'At least one section is required'),
    testimonialsSection: z
      .object({
        title: z.string().optional(),
      })
      .optional(),
    fallbackNotice: z.string().optional(),
  })
  .strict();

export function validateHomeContent(content: unknown, locale?: string): HomePageContent {
  const parsed = homePageSchema.safeParse(content);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
      .join('\n');
    const localeLabel = locale ?? 'unknown locale';
    throw new Error(`Invalid home content for ${localeLabel}:\n${issues}`);
  }

  return parsed.data;
}
