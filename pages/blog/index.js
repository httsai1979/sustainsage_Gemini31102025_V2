import { useMemo, useState } from 'react';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { Reveal } from '@/components/ui/Motion';
import BlogCard from '@/components/blog/BlogCard';
import FAQSection from '@/components/Sections/FAQSection';
import { fetchBlogPosts } from '@/lib/contentful';
import { getFallbackPostsFromTranslations } from '@/lib/blogFallback';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '@/next-i18next.config.js';

function FilterBar({ filters, active, onChange }) {
  if (!filters || filters.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = filter.value === active;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              isActive
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:text-emerald-700'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

function BlogIndex({ posts = [], error = null }) {
  const { t } = useTranslation('blog');
  const filters = t('filters', { returnObjects: true });
  const fallbackPosts = useMemo(() => getFallbackPostsFromTranslations(t), [t]);
  const hasCmsPosts = Array.isArray(posts) && posts.length > 0;
  const basePosts = useMemo(() => {
    if (hasCmsPosts) {
      return posts.filter(Boolean);
    }

    return fallbackPosts.map((item) => ({
      id: item.slug,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      cover: item.cover,
      category: item.category,
      publishedDate: item.publishedDate,
      displayDate: item.displayDate,
      readingTime: item.readingTime,
    }));
  }, [hasCmsPosts, posts, fallbackPosts]);

  const defaultFilter = filters?.[0]?.value ?? 'all';
  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') return basePosts;
    return basePosts.filter((post) => post.category === activeFilter);
  }, [activeFilter, basePosts]);

  const articleCta = t('articleCta', { returnObjects: true });

  return (
    <>
      <Hero image="/hero/blog.svg" align="left" title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm leading-6 text-emerald-900">
            {t('notice')}
          </p>

          {error && (
            <p className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              {t('error', {
                defaultValue:
                  'We could not load the latest posts just now. Showing our curated stories instead.',
              })}
              <span className="block text-xs text-red-500">{error}</span>
            </p>
          )}

          <Reveal>
            <h2 className="mt-10 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('listTitle')}
            </h2>
          </Reveal>

          <FilterBar filters={filters} active={activeFilter} onChange={setActiveFilter} />

          {filteredPosts.length === 0 ? (
            <p className="mt-6 text-sm text-slate-600">{t('emptyState')}</p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug || post.id} post={post} />
              ))}
            </div>
          )}

          {!hasCmsPosts && fallbackPosts.length > 0 && (
            <p className="mt-12 text-sm text-slate-500">{t('fallbackNotice')}</p>
          )}

          {articleCta?.title && (
            <div className="mt-16 rounded-3xl border border-emerald-100 bg-white/90 p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{articleCta.title}</h3>
              {articleCta.body && <p className="mt-3 text-sm leading-6 text-slate-700">{articleCta.body}</p>}
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href={articleCta.primaryHref || '/services'}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  {articleCta.primary || 'Explore services'}
                </a>
                <a
                  href={articleCta.secondaryHref || '/contact'}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100"
                >
                  {articleCta.secondary || 'Book an intro call'}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <FAQSection categories={['blog']} limit={2} />

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

BlogIndex.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale = 'en' }) {
  try {
    const posts = await fetchBlogPosts();

    return {
      props: {
        posts,
        ...(await serverSideTranslations(locale, ['common', 'blog', 'faq'], nextI18NextConfig)),
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        posts: [],
        error: String(e),
        ...(await serverSideTranslations(locale, ['common', 'blog', 'faq'], nextI18NextConfig)),
      },
      revalidate: 30,
    };
  }
}

export default BlogIndex;
