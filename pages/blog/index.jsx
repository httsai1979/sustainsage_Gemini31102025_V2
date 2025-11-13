import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';
import { getAllPosts } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

export default function BlogPage({ posts = [] }) {
  return (
    <Section>
      <Container>
        <div className="ssg-stack text-center md:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Blog</p>
            <h1 className="mt-2 text-3xl font-extrabold text-ink">Blog</h1>
            <p className="mt-3 text-base leading-7 text-slate-600">Short, practical notes from our coaching practice.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.slug}
                title={
                  <span className="inline-flex items-center gap-2">
                    <Icon name="arrowRight" className="h-5 w-5 text-sage" />
                    {post.title}
                  </span>
                }
                subtitle={post.description}
                footer={
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-semibold text-sage">
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
                  className="mt-2"
                />
                {post.comingSoon ? (
                  <div>
                    <Tag>Coming soon</Tag>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
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
