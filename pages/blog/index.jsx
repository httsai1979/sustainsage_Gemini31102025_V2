import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import RevealSection from '@/components/common/RevealSection';
import Tag from '@/components/ui/Tag';
import { getAllPosts } from '@/lib/content';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

const DEFAULT_POSTS = [
  {
    slug: 'career-transitions-with-care',
    title: 'Career transitions with care',
    description: 'How to make space for experimentation when routines shift faster than confidence.',
    category: 'Career transitions',
    readingTime: '5 min read',
  },
  {
    slug: 'living-in-the-uk',
    title: 'Living in the UK, rebuilding rhythm',
    description: 'Ideas for settling into new systems, finding anchors, and trusting your pace.',
    category: 'Living in the UK',
    readingTime: '4 min read',
  },
  {
    slug: 'working-as-a-parent',
    title: 'Working as a parent without burning out',
    description: 'What boundaries and experiments help when caregiving overlaps with career shifts.',
    category: 'Working as a parent',
    readingTime: '6 min read',
  },
];

const formatDate = (dateString) => {
  if (!dateString) return '';
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function BlogPage({ posts = [] }) {
  const blogPosts = dedupeBy(posts, (post) => post.slug ?? post.title);
  const resolvedPosts = blogPosts.length ? blogPosts : DEFAULT_POSTS;
  return (
    <main className="ss-container">
      <section className="ss-section">
        <RevealSection className="max-w-3xl text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-green/80">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold text-sustain-text">Notes from our coaching practice</h1>
          <p className="mt-4 text-base text-slate-700">Short reflections on transitions, coaching craft, and grounded tools.</p>
        </RevealSection>
      </section>
      <section className="ss-section">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {resolvedPosts.map((post, index) => {
            const href = `/blog/${post.slug}`;
            const dateLabel = formatDate(post.date);
            const author = post.author ?? 'SustainSage';
            return (
              <RevealSection key={post.slug} delay={(index % 3) * 0.1}>
                <Link href={href} className="block h-full" aria-label={`Read ${post.title}`}>
                  <article className="ss-card h-full overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                      <Image
                        src={post.img ?? post.hero ?? '/images/placeholder-hero.jpg'}
                        alt={post.alt ?? post.title}
                        fill
                        sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-5 space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        {dateLabel ? <span>{dateLabel}</span> : null}
                        <span>• {author}</span>
                      </div>
                      {post.category ? <Tag>{post.category}</Tag> : null}
                      <h2 className="text-lg font-semibold text-sustain-text">{post.title}</h2>
                      <p className="text-sm text-slate-600">{post.description}</p>
                      <div className="flex items-center gap-2 text-sm font-semibold text-sustain-green">
                        <span>Read article</span>
                        {post.readingTime || post.reading_time ? (
                          <span className="text-xs font-normal text-slate-500">{post.readingTime ?? post.reading_time}</span>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Link>
              </RevealSection>
            );
          })}
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
