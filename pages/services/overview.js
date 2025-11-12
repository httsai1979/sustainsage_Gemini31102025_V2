import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import { loadContent } from '@/lib/loadContent';
import { sanitizeProps } from '@/lib/toSerializable';

const ServicesOverview = dynamic(() => import('@/components/pages/services/ServicesOverview'), { ssr: true });

export default function Page({ cards = [], showFallbackNotice = false, fallbackNotice = null } = {}) {
  const { t } = useTranslation('services');
  const seo = t('seo', { returnObjects: true });

  return (
    <MainLayout
      seo={{
        title: seo?.title ?? 'Services — Overview',
        description: seo?.description ?? 'Placeholder',
      }}
    >
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServicesOverview cards={cards} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  const currentLocale = locale ?? 'en-GB';
  const { data, locale: usedLocale } = loadContent('content/services/index.{locale}.json', currentLocale, 'en-GB');
  const isFallbackLocale = Boolean(usedLocale && usedLocale !== currentLocale);
  const rawCards = Array.isArray(data?.pathways) && data.pathways.length > 0 ? data.pathways : data?.cards;

  const cards = (Array.isArray(rawCards) ? rawCards : [])
    .filter(Boolean)
    .slice(0, 3)
    .map((card) => ({
      slug: card.slug,
      title: card.title,
      eyebrow: card.eyebrow,
      excerpt: card.excerpt ?? card.description ?? '',
      ctaLabel: card.ctaLabel ?? card.cta ?? card.buttonLabel ?? null,
    }))
    .filter((card) => card.slug && card.title);

  const fallbackNotice = typeof data?.fallbackNotice === 'string' ? data.fallbackNotice : null;

  const props = {
    cards,
    showFallbackNotice: isFallbackLocale,
    fallbackNotice,
    ...(await serverSideTranslations(currentLocale, ['common', 'services'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
