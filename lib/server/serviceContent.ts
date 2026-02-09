import fs from 'fs';
import path from 'path';

import { loadJSON } from '@/lib/loadContent';
import type { ServiceContent, ServiceSlug } from '@/lib/serviceContentTypes';

type LoadResult = {
  service: ServiceContent;
  showFallbackNotice: boolean;
};

export async function loadServiceContent(
  slug: string,
  requestedLocale: string
): Promise<LoadResult | null> {
  const { data, usedLocale, isFallback } = loadJSON<Partial<ServiceContent>>(`content/services/${slug}.{locale}.json`, requestedLocale);

  if (!data) {
    return null;
  }

  // Base data merge for legacy structures
  const basePath = path.join(process.cwd(), 'content', 'services', `${slug}.json`);
  const baseData = fs.existsSync(basePath)
    ? (JSON.parse(fs.readFileSync(basePath, 'utf-8')) as Partial<ServiceContent>)
    : {};

  const service: ServiceContent = {
    slug,
    ...baseData,
    ...data,
  } as ServiceContent;

  return { service, showFallbackNotice: isFallback };
}
