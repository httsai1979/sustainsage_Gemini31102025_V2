import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import RevealSection from '@/components/common/RevealSection';
import Tag from '@/components/ui/Tag';
import { loadJSON } from '@/lib/content';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

const DEFAULT_RESOURCES = [
  {
    id: 'self-reflection-questions',
    title: 'Self-reflection questions',
    desc: 'Gentle prompts to help you untangle thoughts before or after a coaching session.',
    icon: 'spark',
    href: '/blog',
    actionLabel: 'View questions',
  },
  {
    id: 'time-audit-sheet',
    title: 'Time audit sheet',
    desc: 'A one-page worksheet to notice where energy goes during a typical week.',
    icon: 'clock',
    href: '/blog',
    actionLabel: 'Download sheet',
  },
  {
    id: 'values-map',
    title: 'Values map',
    desc: 'Plot what steadies you when work or life shifts. Use it to guide decisions.',
    icon: 'map',
    href: '/blog',
    actionLabel: 'View map',
  },
];

export default function ResourcesPage({ items = [] }) {
  const resourceItems = dedupeBy(items, (item) => item.id ?? item.title);
  const resolvedResources = resourceItems.length ? resourceItems : DEFAULT_RESOURCES;
  return (
    <main className="ss-container">
      <section className="ss-section">
        <RevealSection className="max-w-3xl space-y-4 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-green/80">Resources</p>
          <h1 className="text-4xl font-semibold text-sustain-text">Tools to use between sessions</h1>
          <p className="text-base text-slate-700">
            Print-friendly A4 PDFs and simple worksheets. Use them on your own or alongside coaching conversations.
          </p>
        </RevealSection>
      </section>
      <section className="ss-section">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {resolvedResources.map((item, index) => {
            const actionHref = !item.comingSoon ? item.href || item.download || '/blog' : null;
            const actionLabel = !item.comingSoon
              ? item.actionLabel || (item.download ? 'Download' : 'View resource')
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
                    {item.comingSoon ? (
                      <div className="absolute inset-0 bg-sustain-text/20" aria-hidden />
                    ) : null}
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
                    <Tag>Coming soon</Tag>
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

            if (actionHref && !item.comingSoon) {
              return (
                <RevealSection key={item.id} delay={(index % 3) * 0.1}>
                  <Link href={actionHref} className="block h-full" aria-label={actionLabel ?? item.title}>
                    {card}
                  </Link>
                </RevealSection>
              );
            }

            return (
              <RevealSection key={item.id} delay={(index % 3) * 0.1}>
                <div className="block h-full">{card}</div>
              </RevealSection>
            );
          })}
        </div>
      </section>

      <section className="ss-section">
        <RevealSection>
          <div className="rounded-card rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-md">
            <h2 className="text-3xl font-semibold text-sustain-text">Need more personalised support?</h2>
            <p className="mt-4 text-base text-slate-700">
              Coaching conversations help you translate these tools into real-life experiments.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="ss-btn-primary">
                Book a 20-minute chat
              </Link>
              <Link href="/services" className="ss-btn-secondary">
                Explore coaching
              </Link>
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
        title: 'Resources',
        description: 'Print-friendly A4 PDFs to support your coaching sessions or self-development.',
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale }) {
  const items = loadJSON('resources', locale);
  return toSerializable({
    props: {
      items,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  });
}
