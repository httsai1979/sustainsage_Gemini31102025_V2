import fs from 'fs';
import path from 'path';

import { loadJSON } from './loadContent';

const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');
const SERVICE_FILE_PATTERN = /^(.+?)\.[A-Za-z]{2}-[A-Za-z]{2}\.json$/;

function normalizeIconKey(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim().toLowerCase();

  return trimmed ? trimmed : null;
}

export function getServiceSlugs() {
  if (!fs.existsSync(SERVICES_DIR)) {
    return [];
  }

  const entries = fs.readdirSync(SERVICES_DIR, { withFileTypes: true });
  const slugs = new Set();

  entries.forEach((entry) => {
    if (!entry.isFile()) {
      return;
    }

    const match = entry.name.match(SERVICE_FILE_PATTERN);

    if (match) {
      slugs.add(match[1]);
    }
  });

  return Array.from(slugs);
}

export function getServiceData(slug, locale = 'en-GB') {
  const { data, usedLocale } = loadJSON(`content/services/${slug}.{locale}.json`, locale);

  if (!data) {
    throw new Error(`Service content not found for slug: ${slug}`);
  }

  const service = {
    slug,
    ...data,
  };

  return {
    service,
    usedLocale,
    isFallback: Boolean(usedLocale && usedLocale !== locale),
  };
}

export function getServiceOverview(slug, locale = 'en-GB') {
  const result = loadJSON(`content/services/${slug}.{locale}.json`, locale);
  const candidate = result.data;

  if (candidate && (candidate.hero || candidate.key_points || candidate.cases || candidate.title || candidate.description)) {
    const service = {
      slug,
      ...candidate,
    };

    return {
      service,
      usedLocale: result.usedLocale,
      isFallback: Boolean(result.usedLocale && result.usedLocale !== locale),
    };
  }

  const basePath = path.join(SERVICES_DIR, `${slug}.json`);

  if (!fs.existsSync(basePath)) {
    throw new Error(`Service overview content not found for slug: ${slug}`);
  }

  const fallbackLocale = 'en-GB';
  const baseData = JSON.parse(fs.readFileSync(basePath, 'utf-8'));
  const service = {
    slug,
    ...baseData,
  };

  return {
    service,
    usedLocale: fallbackLocale,
    isFallback: locale !== fallbackLocale,
  };
}

export function getAllServices(locale = 'en-GB') {
  return getServiceSlugs().map((slug) => getServiceData(slug, locale).service);
}

export function getServiceCards(locale = 'en-GB') {
  const slugResults = getServiceSlugs().map((slug) => ({ slug, ...getServiceData(slug, locale) }));

  const fallbackUsed = slugResults.some((result) => result.isFallback);

  const cards = slugResults
    .map(({ service }) => ({
      slug: service.slug,
      card: service.card ?? {
        eyebrow: service.hero?.eyebrow ?? '',
        title: service.title ?? '',
        description: service.hero?.subtitle ?? '',
        benefits: service.audience?.items?.map((item) => item.title).filter(Boolean) ?? [],
        order: 0,
      },
    }))
    .sort((a, b) => {
      const orderA = typeof a.card.order === 'number' ? a.card.order : Number.MAX_SAFE_INTEGER;
      const orderB = typeof b.card.order === 'number' ? b.card.order : Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    })
    .map(({ slug, card }) => ({
      slug,
      eyebrow: card.eyebrow,
      title: card.title,
      description: card.description,
      icon: normalizeIconKey(card.icon),
      benefits: Array.isArray(card.benefits) ? card.benefits : [],
      benefitIcon: normalizeIconKey(card.benefitIcon),
    }));

  return { cards, fallbackUsed };
}
