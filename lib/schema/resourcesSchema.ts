import { z } from 'zod';

import type {
  ResourceServicesSection,
  ResourcesPageContent,
  ResourcesSection,
  ResourcesHero,
  ToolsSection,
} from '@/types/resources';

const nonEmptyString = z.string().trim().min(1);

const seoSchema = z.object({
  title: nonEmptyString.optional(),
  description: nonEmptyString.optional(),
});

const ctaSchema = z.object({
  href: nonEmptyString,
  label: nonEmptyString.optional(),
});

const imageSchema = z.object({
  src: nonEmptyString,
  alt: nonEmptyString.optional(),
});

const heroSchema: z.ZodType<ResourcesHero> = z.object({
  eyebrow: nonEmptyString.optional(),
  title: nonEmptyString,
  lead: nonEmptyString.optional(),
  intro: z.array(nonEmptyString).optional(),
  chips: z.array(nonEmptyString).optional(),
  image: imageSchema.optional(),
});

const baseSectionSchema = z.object({
  id: nonEmptyString,
  eyebrow: nonEmptyString.optional(),
  title: nonEmptyString,
  lead: nonEmptyString.optional(),
});

const toolSchema = z.object({
  id: nonEmptyString,
  slug: nonEmptyString.optional(),
  title: nonEmptyString,
  eyebrow: nonEmptyString.optional(),
  iconName: nonEmptyString.optional(),
  summary: z.array(nonEmptyString).min(1),
  href: nonEmptyString.optional(),
  ctaLabel: nonEmptyString.optional(),
  openInNewTab: z.boolean().optional(),
});

const toolsSectionSchema: z.ZodType<ToolsSection> = baseSectionSchema
  .extend({
    style: z.literal('cards').optional(),
    ctaLabel: nonEmptyString.optional(),
    tools: z.array(toolSchema).min(1),
  })
  .transform((value) => ({ ...value, type: 'tools' as const }));

const cardSchema = z.object({
  id: nonEmptyString.optional(),
  iconName: nonEmptyString.optional(),
  eyebrow: nonEmptyString.optional(),
  title: nonEmptyString,
  body: z.array(nonEmptyString).optional(),
  bullets: z.array(nonEmptyString).optional(),
  meta: nonEmptyString.optional(),
  href: nonEmptyString.optional(),
  target: nonEmptyString.optional(),
  rel: nonEmptyString.optional(),
  ctaLabel: nonEmptyString.optional(),
});

const stepSchema = z.object({
  id: nonEmptyString.optional(),
  title: nonEmptyString,
  body: z.array(nonEmptyString),
  iconName: nonEmptyString.optional(),
  stepNumber: z.number().int().positive().optional(),
});

const servicesSectionSchema: z.ZodType<ResourceServicesSection> = z.discriminatedUnion('style', [
  baseSectionSchema
    .extend({
      type: z.literal('services').optional(),
      style: z.literal('cards'),
      columns: z.number().int().min(1).max(4).optional(),
      cards: z.array(cardSchema).min(1),
    })
    .transform((value) => ({ ...value, type: 'services' as const })),
  baseSectionSchema
    .extend({
      type: z.literal('services').optional(),
      style: z.literal('prose'),
      body: z.array(nonEmptyString).min(1),
    })
    .transform((value) => ({ ...value, type: 'services' as const })),
  baseSectionSchema
    .extend({
      type: z.literal('services').optional(),
      style: z.literal('steps'),
      steps: z.array(stepSchema).min(1),
    })
    .transform((value) => ({ ...value, type: 'services' as const })),
  baseSectionSchema
    .extend({
      type: z.literal('services').optional(),
      style: z.literal('cta'),
      body: z.array(nonEmptyString).min(1),
      primaryCta: ctaSchema.optional(),
      secondaryCta: ctaSchema.optional(),
    })
    .transform((value) => ({ ...value, type: 'services' as const })),
]);

const sectionSchema: z.ZodType<ResourcesSection> = z.union([
  toolsSectionSchema,
  servicesSectionSchema,
]);

export const resourcesPageSchema: z.ZodType<ResourcesPageContent> = z.object({
  seo: seoSchema.optional(),
  hero: heroSchema,
  sections: z.array(sectionSchema).min(1),
  fallbackNotice: nonEmptyString.optional(),
});

export function validateResourcesContent(content: unknown, locale?: string): ResourcesPageContent {
  const parsed = resourcesPageSchema.safeParse(content);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
      .join('\n');
    const localeLabel = locale ?? 'unknown locale';
    throw new Error(`Invalid resources content for ${localeLabel}:\n${issues}`);
  }

  return parsed.data;
}
