import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import { getAllPosts } from '@/lib/content';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

export default function BlogPage({ posts = [] }) {
  const blogPosts = dedupeBy(posts, (post) => post.slug ?? post.title);
  return (
    <main className="ss-container">
      <section className="ss-section">
        <div className="max-w-3xl text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-green/80">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold text-sustain-text">Notes from our coaching practice</h1>
          <p className="mt-4 text-base text-slate-700">Short reflections on transitions, coaching craft, and grounded tools.</p>
        </div>
      </section>
      <section className="ss-section">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card
              key={post.slug}
              title={post.title}
              subtitle={post.description}
              footer={
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-semibold text-sustain-green">
                  Read article
                  <span aria-hidden>→</span>
                </Link>
              }
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-sustain-green">
                {post.category ? <Tag>{post.category}</Tag> : null}
                {post.readingTime || post.reading_time ? (
                  <span className="text-slate-500">{post.readingTime ?? post.reading_time}</span>
                ) : null}
              </div>
              {post.comingSoon ? (
                <div className="mt-3">
                  <Tag>Coming soon</Tag>
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </section>
    </main>
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
