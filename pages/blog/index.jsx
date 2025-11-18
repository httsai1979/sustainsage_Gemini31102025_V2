import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import RevealSection from '@/components/common/RevealSection';
import Tag from '@/components/ui/Tag';
import { getAllPosts } from '@/lib/content';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

const formatDate = (dateString, locale = 'en-GB') => {
  if (!dateString) return '';
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
};

function getCuratedPosts(t) {
  const curatedKeys = ['post1', 'post2', 'post3'];
  return curatedKeys
    .map((key) => t(key, { returnObjects: true }))
    .filter((post) => post && post.slug && post.title);
}

export default function BlogPage({ posts = [], locale = 'en-GB' }) {
  const { t } = useTranslation('blog');
  const hero = t('hero', { returnObjects: true }) ?? {};
  const curated = getCuratedPosts(t);
  const blogPosts = dedupeBy(posts, (post) => post.slug ?? post.title);
  const resolvedPosts = blogPosts.length ? blogPosts : curated;
  const listTitle = t('listTitle');
  const intro = t('intro');
  const notice = t('notice');
  const labels = t('labels', { returnObjects: true }) ?? {};
  const articleCta = t('articleCta', { returnObjects: true }) ?? {};
  const heroEyebrow = hero?.eyebrow ?? 'Blog';

  return (
    <main className="ss-container">
      <section className="ss-section">
        <RevealSection className="max-w-3xl space-y-3 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-green/80">{heroEyebrow}</p>
          <h1 className="text-4xl font-semibold text-sustain-text">{hero?.title ?? 'Notes from our coaching practice'}</h1>
          {hero?.subtitle ? <p className="text-base text-slate-700">{hero.subtitle}</p> : null}
          {intro ? <p className="text-base text-slate-600">{intro}</p> : null}
        </RevealSection>
        {notice ? (
          <p className="mt-6 text-center text-sm text-slate-500 md:text-left">{notice}</p>
        ) : null}
      </section>
      <section className="ss-section">
        {listTitle ? (
          <RevealSection className="mb-6 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-sustain-text">{listTitle}</h2>
          </RevealSection>
        ) : null}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {resolvedPosts.map((post, index) => {
            const href = `/blog/${post.slug}`;
            const dateLabel = formatDate(post.date, locale);
            const author = post.author ?? 'SustainSage';
            return (
              <RevealSection key={post.slug} delay={(index % 3) * 0.1}>
                <Link href={href} className="block h-full" aria-label={labels?.readArticleAria?.replace('{{title}}', post.title) ?? `Read ${post.title}`}>
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
                        <span>{labels?.readArticle ?? 'Read article'}</span>
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
      {articleCta?.title ? (
        <section className="ss-section">
          <RevealSection>
            <div className="rounded-card rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-md">
              <h2 className="text-3xl font-semibold text-sustain-text">{articleCta.title}</h2>
              {articleCta?.body ? <p className="mt-4 text-base text-slate-700">{articleCta.body}</p> : null}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {articleCta?.primaryHref ? (
                  <Link href={articleCta.primaryHref} className="ss-btn-primary">
                    {articleCta?.primary ?? 'Explore services'}
                  </Link>
                ) : null}
                {articleCta?.secondaryHref ? (
                  <Link href={articleCta.secondaryHref} className="ss-btn-secondary">
                    {articleCta?.secondary ?? 'Book a 20-minute chat'}
                  </Link>
                ) : null}
              </div>
            </div>
          </RevealSection>
        </section>
      ) : null}
    </main>
  );
}

BlogPage.getLayout = function getLayout(page) {
  return (
    <MainLayout
      seo={{
        title: page.props?.seo?.title ?? 'Blog',
        description: page.props?.seo?.description,
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale }) {
  const posts = getAllPosts(locale);
  const { loadNamespace } = await import('@/lib/server/loadNamespace');
  const namespaceCopy = loadNamespace(locale, 'blog');
  return toSerializable({
    props: {
      posts,
      locale,
      seo: namespaceCopy?.seo ?? null,
      ...(await serverSideTranslations(locale, ['common', 'nav', 'blog'])),
    },
  });
}
