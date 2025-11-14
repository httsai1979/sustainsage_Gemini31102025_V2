import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Tag from '@/components/ui/Tag';
import { loadJSON } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

export default function ResourcesPage({ items = [] }) {
  return (
    <main className="ss-container">
      <section className="ss-section">
        <div className="max-w-3xl text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-green/80">Resources</p>
          <h1 className="mt-3 text-4xl font-semibold text-sustain-text">Tools to use between sessions</h1>
          <p className="mt-4 text-base text-slate-700">
            Print-friendly A4 PDFs and simple worksheets. Use them on your own or alongside coaching conversations.
          </p>
        </div>
      </section>
      <section className="ss-section">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const actionHref = !item.comingSoon ? item.href || item.download : null;
            const actionLabel = !item.comingSoon ? (item.href ? 'Open resource' : 'Download') : null;
            return (
              <Card
                key={item.id}
                title={item.title}
                subtitle={item.desc}
                icon={<Icon name={item.icon ?? 'spark'} />}
                footer={
                  actionHref ? (
                    <Link href={actionHref} className="inline-flex items-center gap-2 font-semibold text-sustain-green">
                      {actionLabel}
                      <span aria-hidden>→</span>
                    </Link>
                  ) : null
                }
              >
                {item.comingSoon ? (
                  <div>
                    <Tag>Coming soon</Tag>
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
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
