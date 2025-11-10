import fs from 'fs';
import path from 'path';

const SERVICES_DIR = path.join(process.cwd(), 'content', 'services');

function readJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

export function getServiceSlugs() {
  if (!fs.existsSync(SERVICES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(SERVICES_DIR)
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => filename.replace(/\.json$/, ''));
}

export function getServiceData(slug) {
  const filePath = path.join(SERVICES_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Service content not found for slug: ${slug}`);
  }

  const data = readJsonFile(filePath);

  return {
    slug,
    ...data,
  };
}

export function getAllServices() {
  return getServiceSlugs().map((slug) => getServiceData(slug));
}

export function getServiceCards() {
  return getAllServices()
    .map((service) => ({
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
      icon: card.icon,
      benefits: Array.isArray(card.benefits) ? card.benefits : [],
      benefitIcon: card.benefitIcon,
    }));
}
