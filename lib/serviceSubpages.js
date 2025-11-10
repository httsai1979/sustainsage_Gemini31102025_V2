import fs from 'fs';
import path from 'path';

const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');
const SUBPAGES_DIR = path.join(SERVICES_DIR, 'subpages');
const LEGAL_DIR = path.join(process.cwd(), 'content', 'legal');

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function mergeContent(defaultContent, override) {
  if (!defaultContent) {
    return override ?? null;
  }

  if (!override) {
    return defaultContent;
  }

  return { ...defaultContent, ...override };
}

function getMappedContent(dir, filename, slug) {
  const filePath = path.join(dir, filename);
  const data = readJson(filePath) ?? {};
  const key = slug ?? 'default';

  const defaultContent = data.default ?? null;
  const specific = key in data ? data[key] : null;

  return mergeContent(defaultContent, specific);
}

export function getServicePricing(slug) {
  return getMappedContent(SUBPAGES_DIR, 'pricing.json', slug);
}

export function getServiceReadiness(slug) {
  return getMappedContent(SUBPAGES_DIR, 'readiness.json', slug);
}

export function getServiceAgreement(slug) {
  return getMappedContent(LEGAL_DIR, 'service-agreements.json', slug);
}

export function getServiceFaqContent(slug) {
  const filePath = path.join(SUBPAGES_DIR, 'faq.json');
  const data = readJson(filePath) ?? {};
  const normalizedSlug = (slug ?? 'default').toLowerCase();
  const items = Array.isArray(data.items) ? data.items : [];
  const titles = data.titles ?? {};
  const descriptions = data.descriptions ?? {};

  const specificItems = [];
  const defaultItems = [];

  items.forEach((item) => {
    const value = item.slugs ?? item.slug ?? [];
    const slugs = Array.isArray(value) ? value : [value];
    const normalizedSlugs = slugs.map((slugValue) => String(slugValue).toLowerCase());

    if (normalizedSlugs.includes(normalizedSlug)) {
      specificItems.push({ question: item.question, answer: item.answer });
    } else if (normalizedSlugs.includes('default')) {
      defaultItems.push({ question: item.question, answer: item.answer });
    }
  });

  const uniqueItems = [];
  const seen = new Set();

  [specificItems, defaultItems].forEach((collection) => {
    collection.forEach((item) => {
      if (item.question && !seen.has(item.question)) {
        uniqueItems.push(item);
        seen.add(item.question);
      }
    });
  });

  return {
    title: titles[slug] ?? data.title ?? 'Frequently asked questions',
    description: descriptions[slug] ?? data.description ?? '',
    items: uniqueItems,
  };
}
