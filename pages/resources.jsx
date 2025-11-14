import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import RevealSection from '@/components/common/RevealSection';
import Tag from '@/components/ui/Tag';
import { loadJSON } from '@/lib/content';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

export default function ResourcesPage({ downloads = [], interactiveTools = [] }) {
  const { t } = useTranslation('resources');
  const hero = t('hero', { returnObjects: true }) ?? {};
  const featured = t('featured', { returnObjects: true }) ?? {};
  const disclaimer = t('disclaimer', { returnObjects: true }) ?? {};
  const ctaCopy = t('cta', { returnObjects: true }) ?? {};
  const labels = t('labels', { returnObjects: true }) ?? {};
  const actions = t('actions', { returnObjects: true }) ?? {};
  const interactiveCopy = t('interactive', { returnObjects: true }) ?? {};

  const curatedResources = Array.isArray(featured?.tools)
    ? featured.tools.map((tool) => ({
        id: tool.id,
        title: tool.title,
        desc: tool.summary,
        href: tool.href,
        download: tool.download,
        comingSoon: tool.status === 'Coming soon' || tool.comingSoon,
        img: tool.image,
        alt: tool.alt ?? tool.title,
        type: tool.format,
        actionLabel: tool.cta ?? featured?.defaultCta,
      }))
    : [];

  const resourceItems = dedupeBy(downloads, (item) => item.id ?? item.title);
  const resolvedResources = resourceItems.length ? resourceItems : curatedResources;
  const interactiveItems = dedupeBy(interactiveTools, (item) => item.id ?? item.title);

  const renderResourceCard = (item, index) => {
    const actionHref = !item.comingSoon ? item.href || item.download || '/blog' : null;
    const actionLabel = !item.comingSoon
      ? item.actionLabel || (item.download ? actions?.download : actions?.view)
      : null;
    const badge = item.type ?? item.tag ?? item.category ?? (item.download ? 'Download' : null);
    const card = (
      <article className="ss-card h-full overflow-hidden bg-white">
        <div className="relative">
          <div className="relative h-48 w-full overflow-hidden rounded-2xl">
            <Image
              src={item.img ?? '/images/placeholder-hero.jpg'}
              alt={item.alt ?? item.title}
              fill
              sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
            {item.comingSoon ? <div className="absolute inset-0 bg-sustain-text/20" aria-hidden /> : null}
          </div>
          {badge ? (
            <span className="absolute right-4 top-4 rounded-full bg-sustain-green px-3 py-1 text-xs font-semibold text-white">
              {badge}
            </span>
          ) : null}
        </div>
        <div className="mt-5 space-y-3">
          <h3 className="text-lg font-semibold text-sustain-text">{item.title}</h3>
          <p className="text-sm text-slate-600">{item.desc}</p>
          {item.comingSoon ? (
            <Tag>{labels?.comingSoon ?? 'Coming soon'}</Tag>
          ) : (
            actionHref && (
              <div className="inline-flex items-center gap-2 font-semibold text-sustain-green">
                {actionLabel}
                <span aria-hidden>→</span>
              </div>
            )
          )}
        </div>
      </article>
    );

    const delay = (index % 3) * 0.1;

    if (actionHref && !item.comingSoon) {
      return (
        <RevealSection key={`${item.id ?? item.title}-${index}`} delay={delay}>
          <Link href={actionHref} className="block h-full" aria-label={actionLabel ?? item.title}>
            {card}
          </Link>
        </RevealSection>
      );
    }

    return (
      <RevealSection key={`${item.id ?? item.title}-${index}`} delay={delay}>
        <div className="block h-full">{card}</div>
      </RevealSection>
    );
  };
  return (
    <main className="ss-container">
      <section className="ss-section">
        <RevealSection className="max-w-3xl space-y-4 text-center md:text-left">
          {hero?.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-green/80">{hero.eyebrow}</p>
          ) : null}
          <h1 className="text-4xl font-semibold text-sustain-text">{hero?.title ?? 'Resources'}</h1>
          {hero?.subtitle ? <p className="text-base text-slate-700">{hero.subtitle}</p> : null}
        </RevealSection>
      </section>
      <section className="ss-section">
        <RevealSection className="space-y-4 text-center md:text-left">
          {featured?.title ? (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sustain-green/80">{featured.title}</p>
          ) : null}
          {featured?.intro ? <p className="text-base text-slate-700">{featured.intro}</p> : null}
        </RevealSection>
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {resolvedResources.map((item, index) => renderResourceCard(item, index))}
        </div>
      </section>

      {interactiveItems.length ? (
        <section className="ss-section">
          <RevealSection className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-sustain-text">
              {interactiveCopy?.title ?? 'Interactive tools'}
            </h2>
            {interactiveCopy?.intro ? <p className="text-base text-slate-700">{interactiveCopy.intro}</p> : null}
          </RevealSection>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {interactiveItems.map((item, index) => renderResourceCard(item, index))}
          </div>
        </section>
      ) : null}

      <section className="ss-section">
        <RevealSection>
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-md">
            {disclaimer?.title ? (
              <h2 className="text-2xl font-semibold text-sustain-text">{disclaimer.title}</h2>
            ) : null}
            {disclaimer?.body ? <p className="mt-4 text-base text-slate-700">{disclaimer.body}</p> : null}
            {Array.isArray(disclaimer?.points) && disclaimer.points.length ? (
              <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {disclaimer.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </RevealSection>
      </section>

      <section className="ss-section">
        <RevealSection>
          <div className="rounded-card rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-md">
            <h2 className="text-3xl font-semibold text-sustain-text">{ctaCopy?.title ?? 'Need more personalised support?'}</h2>
            {ctaCopy?.body ? <p className="mt-4 text-base text-slate-700">{ctaCopy.body}</p> : null}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {ctaCopy?.primaryHref ? (
                <Link href={ctaCopy.primaryHref} className="ss-btn-primary">
                  {ctaCopy?.primaryCta ?? 'Book a 20-minute chat'}
                </Link>
              ) : null}
              {ctaCopy?.secondaryHref ? (
                <Link href={ctaCopy.secondaryHref} className="ss-btn-secondary">
                  {ctaCopy?.secondaryCta ?? 'Explore coaching'}
                </Link>
              ) : null}
            </div>
          </div>
        </RevealSection>
      </section>
    </main>
  );
}

ResourcesPage.getLayout = function getLayout(page) {
  return (
    <MainLayout
      seo={{
        title: page.props?.seo?.title ?? 'Resources',
        description: page.props?.seo?.description,
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale }) {
  const data = loadJSON('resources', locale);
  const downloads = Array.isArray(data)
    ? data
    : Array.isArray(data?.downloads)
    ? data.downloads
    : [];
  const interactiveTools = !Array.isArray(data) && Array.isArray(data?.interactiveTools) ? data.interactiveTools : [];
  const { loadNamespace } = await import('@/lib/server/loadNamespace');
  const namespaceCopy = loadNamespace(locale, 'resources');
  return toSerializable({
    props: {
      downloads,
      interactiveTools,
      seo: namespaceCopy?.seo ?? null,
      ...(await serverSideTranslations(locale, ['common', 'resources'])),
    },
  });
}
