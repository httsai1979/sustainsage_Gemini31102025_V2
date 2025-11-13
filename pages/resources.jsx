import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';
import { loadJSON } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

export default function ResourcesPage({ items = [] }) {
  return (
    <Section>
      <Container>
        <div className="ssg-stack text-center md:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Resources</p>
            <h1 className="mt-2 text-3xl font-extrabold text-ink">Resources</h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Print-friendly A4 PDFs. Use them solo or alongside coaching.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const actionHref = !item.comingSoon ? item.href || item.download : null;
              const actionLabel = !item.comingSoon ? (item.href ? 'Open resource' : 'Download') : null;
              return (
                <Card
                  key={item.id}
                  title={
                    <span className="inline-flex items-center gap-2">
                      <Icon name="spark" className="h-5 w-5 text-sage" />
                      {item.title}
                    </span>
                  }
                  subtitle={item.desc}
                  footer={
                    actionHref ? (
                      <Link href={actionHref} className="inline-flex items-center gap-2 font-semibold text-sage">
                        {actionLabel}
                        <span aria-hidden>→</span>
                      </Link>
                    ) : null
                  }
                  className="flex h-full flex-col gap-4"
                >
                  <ResponsiveImage
                    src={item.img ?? '/images/placeholder-hero.jpg'}
                    alt={item.alt || item.title || ''}
                    width={1200}
                    height={675}
                    className="mt-2"
                  />
                  {item.comingSoon ? (
                    <div>
                      <Tag>Coming soon</Tag>
                    </div>
                  ) : null}
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
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
