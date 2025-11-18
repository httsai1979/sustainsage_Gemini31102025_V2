import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContentHero from '@/components/content/ContentHero';
import RevealSection from '@/components/common/RevealSection';
import MainLayout from '@/components/layout/MainLayout';
import CardShell from '@/components/ui/CardShell';
import PageSection from '@/components/ui/PageSection';
import { getBlogIndexContent } from '@/lib/blogContent';
import { getAllPosts } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

const formatDate = (dateString, locale = 'en-GB') => {
  if (!dateString) return '';
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
};

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim().length) return [value];
  return [];
};

const buildManifestCard = (entry, post, categoryMap, categoryIconMap, locale) => {
  const summary = toArray(entry.summary).length ? toArray(entry.summary) : toArray(post?.description);
  const readingTime = entry.readingTimeMinutes
    ? `${entry.readingTimeMinutes} min read`
    : post?.readingTime ?? post?.reading_time ?? null;
  const dateSource = entry.publishedAt ?? post?.date;
  const categoryLabel = entry.categoryLabel ?? categoryMap.get(entry.categoryId) ?? post?.category ?? null;
  const iconName = entry.iconName ?? categoryIconMap.get(entry.categoryId) ?? 'book';

  return {
    slug: entry.slug,
    title: entry.title ?? post?.title ?? entry.slug,
    summary,
    category: categoryLabel,
    iconName,
    meta: formatDate(dateSource, locale),
    readingTime,
  };
};

const buildFallbackCard = (post, locale) => ({
  slug: post.slug,
  title: post.title,
  summary: toArray(post.description),
  category: post.category ?? null,
  iconName: post.iconName ?? 'book',
  meta: formatDate(post.date, locale),
  readingTime: post.readingTime ?? post.reading_time ?? null,
});

export default function BlogPage({ content, posts = [], locale = 'en-GB', isFallback = false }) {
  const hero = content?.hero ?? {};
  const categories = Array.isArray(content?.categories) ? content.categories : [];
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat.label]));
  const categoryIconMap = new Map(categories.map((cat) => [cat.id, cat.iconName]));
  const manifestPosts = Array.isArray(content?.posts) ? content.posts : [];
  const postsBySlug = new Map(posts.map((post) => [post.slug, post]));
  const manifestCards = manifestPosts.map((entry) =>
    buildManifestCard(entry, postsBySlug.get(entry.slug), categoryMap, categoryIconMap, locale),
  );
  const manifestSlugs = new Set(manifestPosts.map((entry) => entry.slug));
  const fallbackCards = posts
    .filter((post) => !manifestSlugs.has(post.slug))
    .map((post) => buildFallbackCard(post, locale));
  const displayPosts = [...manifestCards, ...fallbackCards];
  const readArticleLabel = content?.labels?.readArticle ?? 'Read article';
  const readArticleAria = content?.labels?.readArticleAria ?? 'Read {{title}}';
  const listTitle = content?.listTitle ?? 'Latest reflections';
  const cta = content?.cta ?? null;

  return (
    <main>
      <ContentHero hero={hero} showFallbackNotice={isFallback} fallbackNotice={content?.fallbackNotice} />
      <PageSection id="blog-posts" title={listTitle} className="pt-4">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayPosts.map((post, index) => (
            <RevealSection key={post.slug} delay={(index % 3) * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full focus-visible:outline-none"
                aria-label={readArticleAria.replace('{{title}}', post.title ?? post.slug)}
              >
                <CardShell
                  as="article"
                  className="h-full"
                  iconName={post.iconName}
                  eyebrow={post.category}
                  title={post.title}
                  meta={post.meta}
                >
                  {post.summary?.length ? (
                    <div className="space-y-2">
                      {post.summary.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-sustain-primary">
                    <span>{readArticleLabel}</span>
                    {post.readingTime ? (
                      <span className="text-xs font-normal uppercase tracking-wide text-sustain-textMuted">
                        {post.readingTime}
                      </span>
                    ) : null}
                  </div>
                </CardShell>
              </Link>
            </RevealSection>
          ))}
        </div>
      </PageSection>
      {cta?.title ? (
        <PageSection id="blog-cta" title={cta.title} background="paper">
          {Array.isArray(cta.body) ? (
            <div className="space-y-4 text-base leading-relaxed text-sustain-textMuted">
              {cta.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            {cta?.primaryCta?.href ? (
              <Link href={cta.primaryCta.href} className="ss-btn-primary">
                {cta.primaryCta.label ?? 'Explore services'}
              </Link>
            ) : null}
            {cta?.secondaryCta?.href ? (
              <Link href={cta.secondaryCta.href} className="ss-btn-secondary">
                {cta.secondaryCta.label ?? 'Book a 20-minute chat'}
              </Link>
            ) : null}
          </div>
        </PageSection>
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
  const blogContent = getBlogIndexContent(locale);

  return toSerializable({
    props: {
      posts,
      locale,
      content: blogContent.content,
      isFallback: blogContent.isFallback,
      usedLocale: blogContent.usedLocale,
      seo: namespaceCopy?.seo ?? null,
      ...(await serverSideTranslations(locale, ['common', 'nav', 'blog'])),
    },
  });
}
