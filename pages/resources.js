import Image from 'next/image';
import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import FAQSection from '@/components/Sections/FAQSection';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { fetchResourceItems } from '@/lib/contentful';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const RESOURCE_META = {
  'values-worksheet': {
    image: '/images/resources/values-worksheet.svg',
    href: '/contact?topic=values-worksheet',
  },
  'micro-experiments': {
    image: '/images/resources/culture-checklist.svg',
    href: '/contact?topic=micro-experiments',
  },
  'culture-bridges': {
    image: '/images/resources/culture-checklist.svg',
    href: '/contact?topic=culture-bridge-checklist',
  },
  'conversation-starters': {
    image: '/images/resources/imposter-reading.svg',
    href: '/contact?topic=conversation-starters',
  },
  'grounding-audio': {
    image: '/images/resources/grounding-audio.svg',
    href: '/contact?topic=grounding-audio',
  },
  'review-journal': {
    image: '/images/resources/values-worksheet.svg',
    href: '/contact?topic=review-journal',
  },
};

function mapCmsResource(resource, fallbackCta) {
  if (!resource) return null;
  const href = resource.externalUrl || (resource.file?.fields?.file?.url ? `https:${resource.file.fields.file.url}` : null);
  return {
    id: resource.id,
    title: resource.title,
    summary: resource.summary,
    format: resource.type || resource.category || '',
    cta: resource.ctaText || fallbackCta,
    image: resource.image || '/images/resources/values-worksheet.svg',
    href: href || '/contact',
    status: resource.status || null,
  };
}

function ResourceCard({ resource }) {
  const isExternal = typeof resource.href === 'string' && /^https?:\/\//.test(resource.href);
  const ctaClassName =
    'inline-flex items-center justify-center rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800';

  return (
    <HoverLift className="h-full">
      <article className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-emerald-50">
            <Image
              src={resource.image}
              alt={resource.title}
              width={400}
              height={280}
              className="h-44 w-full object-cover"
            />
            {resource.status && (
              <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                {resource.status}
              </span>
            )}
          </div>
          <h3 className="mt-5 text-lg font-semibold text-slate-900">{resource.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{resource.summary}</p>
          {resource.format && <p className="mt-3 text-xs uppercase tracking-wide text-emerald-700">{resource.format}</p>}
        </div>
        <div className="mt-6">
          {isExternal ? (
            <a href={resource.href} className={ctaClassName} target="_blank" rel="noreferrer">
              {resource.cta}
            </a>
          ) : (
            <Link href={resource.href || '/contact'} className={ctaClassName}>
              {resource.cta}
            </Link>
          )}
        </div>
      </article>
    </HoverLift>
  );
}

function ResourcesPage({ cmsResources = [] }) {
  const { t } = useTranslation('resources');
  const tools = t('featured.tools', { returnObjects: true });
  const disclaimerPoints = t('disclaimer.points', { returnObjects: true });
  const defaultCta = t('featured.defaultCta', { defaultValue: 'Open resource' });

  const cmsMapped = cmsResources
    .map((item) => mapCmsResource(item, defaultCta))
    .filter(Boolean);

  const fallbackResources = tools.map((tool) => {
    const meta = RESOURCE_META[tool.id] || {};
    return {
      ...tool,
      image: meta.image || '/images/resources/values-worksheet.svg',
      href: meta.href || '/contact',
    };
  });

  const resources = cmsMapped.length > 0 ? cmsMapped : fallbackResources;

  return (
    <>
      <Hero image="/hero/resources.svg" align="left" title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('featured.title')}
            </h2>
          </Reveal>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('featured.intro')}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id || resource.title} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-900 py-12 text-emerald-50">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t('disclaimer.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('disclaimer.body')}</p>
          <ul className="mt-6 space-y-3 text-left text-sm leading-6 text-emerald-100">
            {disclaimerPoints.map((point) => (
              <li key={point} className="rounded-2xl border border-emerald-500/30 bg-emerald-800/40 p-4">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('cta.body')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
              {t('cta.primaryCta')}
            </Link>
            <Link href="/contact" className="btn-secondary inline-flex items-center justify-center">
              {t('cta.secondaryCta')}
            </Link>
          </div>
        </div>
      </section>

      <FAQSection categories={['resources']} limit={3} />

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

ResourcesPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale = 'en' }) {
  let cmsResources = [];
  try {
    cmsResources = await fetchResourceItems();
  } catch (error) {
    cmsResources = [];
  }

  return {
    props: {
      cmsResources,
      ...(await serverSideTranslations(locale, ['common', 'resources', 'faq'], nextI18NextConfig)),
    },
  };
}

export default ResourcesPage;
