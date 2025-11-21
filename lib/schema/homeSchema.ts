import type {
  AccordionSection,
  ComparisonSection,
  FaqCtaSection,
  FaqItem,
  HomePageContent,
  HomeSection,
  PersonaCard,
  PersonasSection,
  PromoSection,
  ServiceCard,
  ServicesSection,
  SoftCTASection,
  SplitColumn,
  SplitItem,
  StepsSection,
  TopicsSection,
} from '@/types/home';

type Issue = { path: (string | number)[]; message: string };

type SafeParseSuccess<T> = { success: true; data: T };
type SafeParseFailure = { success: false; error: { issues: Issue[] } };
type SafeParseResult<T> = SafeParseSuccess<T> | SafeParseFailure;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function pushIssue(issues: Issue[], path: (string | number)[], message: string) {
  issues.push({ path, message });
}

function validateCTA(value: unknown, path: (string | number)[], issues: Issue[]) {
  if (!isRecord(value)) {
    pushIssue(issues, path, 'CTA must be an object');
    return;
  }

  if (typeof value.href !== 'string' || value.href.trim().length === 0) {
    pushIssue(issues, [...path, 'href'], 'CTA href is required');
  }

  if (value.label !== undefined && typeof value.label !== 'string') {
    pushIssue(issues, [...path, 'label'], 'CTA label must be a string');
  }
}

function validateImage(value: unknown, path: (string | number)[], issues: Issue[]) {
  if (!isRecord(value)) {
    pushIssue(issues, path, 'Image must be an object');
    return;
  }

  if (typeof value.src !== 'string' || value.src.trim().length === 0) {
    pushIssue(issues, [...path, 'src'], 'Image src is required');
  }

  if (value.alt !== undefined && typeof value.alt !== 'string') {
    pushIssue(issues, [...path, 'alt'], 'Image alt must be a string');
  }
}

function validateHero(hero: unknown, issues: Issue[]) {
  if (!isRecord(hero)) {
    pushIssue(issues, ['hero'], 'Hero must be an object');
    return;
  }

  if (typeof hero.title !== 'string' || hero.title.trim().length === 0) {
    pushIssue(issues, ['hero', 'title'], 'Hero title is required');
  }

  if (hero.eyebrow !== undefined && typeof hero.eyebrow !== 'string') {
    pushIssue(issues, ['hero', 'eyebrow'], 'Hero eyebrow must be a string');
  }

  if (hero.subtitle !== undefined && typeof hero.subtitle !== 'string') {
    pushIssue(issues, ['hero', 'subtitle'], 'Hero subtitle must be a string');
  }

  if (hero.chips !== undefined && !isStringArray(hero.chips)) {
    pushIssue(issues, ['hero', 'chips'], 'Hero chips must be an array of strings');
  }

  if (hero.primaryCta !== undefined) {
    validateCTA(hero.primaryCta, ['hero', 'primaryCta'], issues);
  }

  if (hero.secondaryLink !== undefined) {
    validateCTA(hero.secondaryLink, ['hero', 'secondaryLink'], issues);
  }

  if (hero.secondaryText !== undefined && typeof hero.secondaryText !== 'string') {
    pushIssue(issues, ['hero', 'secondaryText'], 'Hero secondaryText must be a string');
  }

  if (hero.image !== undefined) {
    validateImage(hero.image, ['hero', 'image'], issues);
  }
}

function validateStringList(value: unknown, path: (string | number)[], issues: Issue[]) {
  if (value === undefined) return;
  if (!isStringArray(value)) {
    pushIssue(issues, path, 'Must be an array of strings');
  }
}

function validateBaseSection(section: unknown, issues: Issue[], path: (string | number)[]) {
  if (!isRecord(section)) {
    pushIssue(issues, path, 'Section must be an object');
    return false;
  }

  if (section.id !== undefined && typeof section.id !== 'string') {
    pushIssue(issues, [...path, 'id'], 'Section id must be a string');
  }

  if (section.eyebrow !== undefined && typeof section.eyebrow !== 'string') {
    pushIssue(issues, [...path, 'eyebrow'], 'Section eyebrow must be a string');
  }

  if (section.title !== undefined && typeof section.title !== 'string') {
    pushIssue(issues, [...path, 'title'], 'Section title must be a string');
  }

  return true;
}

function validatePersonaCard(card: PersonaCard, issues: Issue[], path: (string | number)[]) {
  if (!isRecord(card)) {
    pushIssue(issues, path, 'Persona card must be an object');
    return;
  }

  if (card.title !== undefined && card.title.trim().length === 0) {
    pushIssue(issues, [...path, 'title'], 'Persona title is required');
  }

  validateStringList(card.summary, [...path, 'summary'], issues);
}

function validateComparisonCard(card: ComparisonCard, issues: Issue[], path: (string | number)[]) {
  if (!isRecord(card)) {
    pushIssue(issues, path, 'Comparison card must be an object');
    return;
  }

  if (card.title !== undefined && card.title.trim().length === 0) {
    pushIssue(issues, [...path, 'title'], 'Comparison title is required');
  }

  validateStringList(card.bullets, [...path, 'bullets'], issues);
}

function validateStepItem(step: unknown, issues: Issue[], path: (string | number)[]) {
  if (!isRecord(step)) {
    pushIssue(issues, path, 'Step must be an object');
    return;
  }

  if (step.title !== undefined && step.title.trim().length === 0) {
    pushIssue(issues, [...path, 'title'], 'Step title is required');
  }

  if (step.description !== undefined && typeof step.description !== 'string') {
    pushIssue(issues, [...path, 'description'], 'Step description must be a string');
  }

  if (step.iconName !== undefined && typeof step.iconName !== 'string') {
    pushIssue(issues, [...path, 'iconName'], 'Step iconName must be a string');
  }

  if (step.stepNumber !== undefined && typeof step.stepNumber !== 'number') {
    pushIssue(issues, [...path, 'stepNumber'], 'Step number must be a number');
  }
}

function validateTopicCard(card: unknown, issues: Issue[], path: (string | number)[]) {
  if (!isRecord(card)) {
    pushIssue(issues, path, 'Topic card must be an object');
    return;
  }

  if (card.title !== undefined && card.title.trim().length === 0) {
    pushIssue(issues, [...path, 'title'], 'Topic title is required');
  }

  validateStringList(card.summary, [...path, 'summary'], issues);
}

function validateServiceCard(card: ServiceCard, issues: Issue[], path: (string | number)[]) {
  if (!isRecord(card)) {
    pushIssue(issues, path, 'Service card must be an object');
    return;
  }

  if (card.title !== undefined && card.title.trim().length === 0) {
    pushIssue(issues, [...path, 'title'], 'Service title is required');
  }

  validateStringList(card.summary, [...path, 'summary'], issues);
}

function validateSplitItem(item: SplitItem, issues: Issue[], path: (string | number)[]) {
  if (!isRecord(item)) {
    pushIssue(issues, path, 'Split item must be an object');
    return;
  }

  if (item.title !== undefined && typeof item.title !== 'string') {
    pushIssue(issues, [...path, 'title'], 'Split item title must be a string');
  }

  if (item.summary !== undefined && typeof item.summary !== 'string') {
    pushIssue(issues, [...path, 'summary'], 'Split item summary must be a string');
  }
}

function validateSplitColumn(column: SplitColumn, issues: Issue[], path: (string | number)[]) {
  if (!isRecord(column)) {
    pushIssue(issues, path, 'Split column must be an object');
    return;
  }

  if (column.title !== undefined && column.title.trim().length === 0) {
    pushIssue(issues, [...path, 'title'], 'Column title is required');
  }

  validateStringList(column.description, [...path, 'description'], issues);

  if (Array.isArray(column.items)) {
    column.items.forEach((item, index) => validateSplitItem(item, issues, [...path, 'items', index]));
  } else if (column.items !== undefined) {
    pushIssue(issues, [...path, 'items'], 'Split column items must be an array');
  }

  if (column.link !== undefined) {
    validateCTA(column.link, [...path, 'link'], issues);
  }
}

function validateFaqItem(item: FaqItem, issues: Issue[], path: (string | number)[]) {
  if (!isRecord(item)) {
    pushIssue(issues, path, 'FAQ must be an object');
    return;
  }

  if (item.question !== undefined && item.question.trim().length === 0) {
    pushIssue(issues, [...path, 'question'], 'FAQ question is required');
  }

  if (
    item.answer !== undefined &&
    !(typeof item.answer === 'string' || isStringArray(item.answer))
  ) {
    pushIssue(issues, [...path, 'answer'], 'FAQ answer must be a string or array of strings');
  }
}

function validateSection(section: HomeSection, issues: Issue[], index: number) {
  const path: (string | number)[] = ['sections', index];

  if (!validateBaseSection(section, issues, path)) {
    return;
  }

  if (!isRecord(section) || typeof section.type !== 'string') {
    pushIssue(issues, [...path, 'type'], 'Section type is required');
    return;
  }

  switch (section.type) {
    case 'personas': {
      const personas = section as PersonasSection;
      validateStringList(personas.intro, [...path, 'intro'], issues);
      if (Array.isArray(personas.cards)) {
        personas.cards.forEach((card, cardIndex) =>
          validatePersonaCard(card, issues, [...path, 'cards', cardIndex])
        );
      } else if (personas.cards !== undefined) {
        pushIssue(issues, [...path, 'cards'], 'Personas cards must be an array');
      }
      break;
    }
    case 'promo': {
      const promo = section as PromoSection;
      validateStringList(promo.body, [...path, 'body'], issues);
      if (promo.cta !== undefined) {
        validateCTA(promo.cta, [...path, 'cta'], issues);
      }
      break;
    }
    case 'comparison': {
      const comparison = section as ComparisonSection;
      validateStringList(comparison.intro, [...path, 'intro'], issues);
      if (comparison.leftCard !== undefined) {
        validateComparisonCard(comparison.leftCard, issues, [...path, 'leftCard']);
      }
      if (comparison.rightCard !== undefined) {
        validateComparisonCard(comparison.rightCard, issues, [...path, 'rightCard']);
      }
      break;
    }
    case 'steps': {
      const stepsSection = section as StepsSection;
      validateStringList(stepsSection.intro, [...path, 'intro'], issues);
      if (Array.isArray(stepsSection.steps)) {
        stepsSection.steps.forEach((step, stepIndex) =>
          validateStepItem(step, issues, [...path, 'steps', stepIndex])
        );
      } else if (stepsSection.steps !== undefined) {
        pushIssue(issues, [...path, 'steps'], 'Steps must be an array');
      }
      break;
    }
    case 'topics': {
      const topics = section as TopicsSection;
      validateStringList(topics.intro, [...path, 'intro'], issues);
      if (Array.isArray(topics.cards)) {
        topics.cards.forEach((card, cardIndex) =>
          validateTopicCard(card, issues, [...path, 'cards', cardIndex])
        );
      } else if (topics.cards !== undefined) {
        pushIssue(issues, [...path, 'cards'], 'Topics cards must be an array');
      }
      break;
    }
    case 'services': {
      const services = section as ServicesSection;
      validateStringList(services.intro, [...path, 'intro'], issues);
      if (Array.isArray(services.cards)) {
        services.cards.forEach((card, cardIndex) =>
          validateServiceCard(card, issues, [...path, 'cards', cardIndex])
        );
      } else if (services.cards !== undefined) {
        pushIssue(issues, [...path, 'cards'], 'Services cards must be an array');
      }
      break;
    }
    case 'split': {
      const split = section as SoftCTASection;
      if (split.left !== undefined) {
        validateSplitColumn(split.left, issues, [...path, 'left']);
      }
      if (split.right !== undefined) {
        validateSplitColumn(split.right, issues, [...path, 'right']);
      }
      break;
    }
    case 'accordion': {
      const accordion = section as AccordionSection;
      validateStringList(accordion.intro, [...path, 'intro'], issues);
      if (Array.isArray(accordion.faqs)) {
        accordion.faqs.forEach((faq, faqIndex) =>
          validateFaqItem(faq, issues, [...path, 'faqs', faqIndex])
        );
      } else if (accordion.faqs !== undefined) {
        pushIssue(issues, [...path, 'faqs'], 'FAQs must be an array');
      }
      break;
    }
    case 'faq-cta': {
      const faqCta = section as FaqCtaSection;
      validateStringList(faqCta.body, [...path, 'body'], issues);
      if (faqCta.primaryCta !== undefined) {
        validateCTA(faqCta.primaryCta, [...path, 'primaryCta'], issues);
      }
      if (faqCta.secondaryCta !== undefined) {
        validateCTA(faqCta.secondaryCta, [...path, 'secondaryCta'], issues);
      }
      break;
    }
    case 'cta': {
      const softCta = section as SoftCTASection;
      validateStringList(softCta.body, [...path, 'body'], issues);
      if (softCta.primaryCta !== undefined) {
        validateCTA(softCta.primaryCta, [...path, 'primaryCta'], issues);
      }
      if (softCta.secondaryLink !== undefined) {
        validateCTA(softCta.secondaryLink, [...path, 'secondaryLink'], issues);
      }
      break;
    }
    default:
      pushIssue(issues, [...path, 'type'], `Unsupported section type "${section.type}"`);
  }
}

function runValidation(content: unknown): SafeParseResult<HomePageContent> {
  const issues: Issue[] = [];

  if (!isRecord(content)) {
    pushIssue(issues, [], 'Home content must be an object');
    return { success: false, error: { issues } };
  }

  validateHero(content.hero, issues);

  if (!Array.isArray(content.sections) || content.sections.length === 0) {
    pushIssue(issues, ['sections'], 'At least one section is required');
  } else {
    content.sections.forEach((section, index) => validateSection(section as HomeSection, issues, index));
  }

  if (content.testimonialsSection !== undefined && !isRecord(content.testimonialsSection)) {
    pushIssue(issues, ['testimonialsSection'], 'Testimonials section must be an object');
  }

  if (issues.length > 0) {
    return { success: false, error: { issues } };
  }

  return { success: true, data: content as HomePageContent };
}

export const homePageSchema = {
  parse(value: unknown): HomePageContent {
    const parsed = runValidation(value);
    if (!parsed.success) {
      const messages = parsed.error.issues
        .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
        .join('\n');
      throw new Error(messages);
    }
    return parsed.data;
  },
  safeParse(value: unknown): SafeParseResult<HomePageContent> {
    return runValidation(value);
  },
};

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
