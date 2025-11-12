import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import { loadJSON } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

export default function ResourcesPage({ items }) {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-5 md:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">Resources</h1>
      <p className="mt-2 text-slate-600">Print-friendly A4 PDFs. Use them solo or alongside coaching.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            desc={item.desc}
            href={!item.comingSoon ? item.href || item.download : null}
            cta={!item.comingSoon ? (item.href ? 'Open resource' : 'Download') : null}
          >
            <figure className="mt-3 overflow-hidden rounded-xl border border-slate-200">
              <Image src={item.img} alt={item.alt || ''} width={1200} height={675} loading="lazy" />
            </figure>
            {item.comingSoon && (
              <div className="mt-3">
                <Tag>Coming soon</Tag>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
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
