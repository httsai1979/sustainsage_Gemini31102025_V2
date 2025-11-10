import fs from 'fs';
import path from 'path';

import { loadJSON } from '@/lib/loadContent';
import type { ServiceContent, ServiceSlug } from '@/lib/serviceContentTypes';

type LoadResult = {
  service: ServiceContent;
  showFallbackNotice: boolean;
};

export async function loadServiceContent(
  slug: ServiceSlug,
  requestedLocale: string
): Promise<LoadResult | null> {
  const result = loadJSON<Partial<ServiceContent>>(`content/services/${slug}.{locale}.json`, requestedLocale);

  if (!result.data) {
    return null;
  }

  const basePath = path.join(process.cwd(), 'content', 'services', `${slug}.json`);
  const baseData = fs.existsSync(basePath)
    ? (JSON.parse(fs.readFileSync(basePath, 'utf-8')) as Partial<ServiceContent>)
    : {};

  const service: ServiceContent = {
    slug,
    ...baseData,
    ...result.data,
  };

  const showFallbackNotice = Boolean(result.usedLocale && result.usedLocale !== result.requestedLocale);

  return { service, showFallbackNotice };
}
