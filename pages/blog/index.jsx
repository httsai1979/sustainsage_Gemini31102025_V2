import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import CardGrid from '@/components/ui/CardGrid';
import Icon from '@/components/ui/Icon';
import PageSection from '@/components/ui/PageSection';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Tag from '@/components/ui/Tag';
import { getAllPosts } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

export default function BlogPage({ posts = [] }) {
  return (
    <>
      <PageSection background="paper">
        <div className="max-w-3xl text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink">Notes from our coaching practice</h1>
          <p className="mt-4 text-base text-ink/80">Short reflections on transitions, coaching craft, and grounded tools.</p>
        </div>
      </PageSection>
      <PageSection>
        <CardGrid columns={{ base: 1, md: 2, lg: 3 }}>
          {posts.map((post) => (
            <Card
              key={post.slug}
              title={
                <span className="inline-flex items-center gap-2">
                  <Icon name="arrowRight" className="h-5 w-5 text-primary" />
                  {post.title}
                </span>
              }
              subtitle={post.description}
              footer={
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-semibold text-primary">
                  Read
                  <span aria-hidden>→</span>
                </Link>
              }
              className="flex h-full flex-col gap-4"
            >
              <ResponsiveImage
                src={post.img ?? '/images/placeholder-hero.jpg'}
                alt={post.alt || post.title || ''}
                width={1200}
                height={675}
                className="mt-2 rounded-2xl"
              />
              {post.comingSoon ? (
                <div>
                  <Tag>Coming soon</Tag>
                </div>
              ) : null}
            </Card>
          ))}
        </CardGrid>
      </PageSection>
    </>
  );
}

BlogPage.getLayout = function getLayout(page) {
  return (
    <MainLayout
      seo={{
        title: 'Blog',
        description: 'Practical notes and insights from our coaching practice.',
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale }) {
  const posts = getAllPosts(locale);
  return toSerializable({
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  });
}
