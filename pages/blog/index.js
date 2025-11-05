import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BlogCard from '@/components/blog/BlogCard';
import { fetchBlogPosts } from '@/lib/contentful';
import nextI18NextConfig from '@/next-i18next.config.js';
import { getFallbackPostsFromTranslations } from '@/lib/blogFallback';

export default function BlogIndex({ posts = [], error = null }) {
  const { t } = useTranslation('blog');
  const fallbackPosts = getFallbackPostsFromTranslations(t);
  const hasCmsPosts = Array.isArray(posts) && posts.length > 0;
  const visiblePosts = hasCmsPosts
    ? posts.filter(Boolean)
    : fallbackPosts.map((item) => ({
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

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            {t('hero.title')}
          </h1>
          <p className="mt-3 text-lg text-gray-600">{t('hero.subtitle')}</p>
          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              Contentful error: {error}
            </p>
          )}
        </header>

        {visiblePosts.length === 0 ? (
          <p className="text-gray-600">{t('emptyState')}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug || post.id} post={post} />
            ))}
          </div>
        )}

        {!hasCmsPosts && fallbackPosts.length > 0 && (
          <p className="mt-12 text-center text-sm text-gray-500">
            {t('fallbackNotice', 'These articles are shared directly by our team while the CMS content is loading.')}
          </p>
        )}

        <div className="mt-16 text-center">
          <Link href="/contact" className="text-sm font-semibold text-primary hover:text-primary-dark">
            {t('contactCta', 'Looking for a specific topic? Reach out to us →')}
          </Link>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const posts = await fetchBlogPosts();

    return {
      props: {
        posts,
        ...(await serverSideTranslations(locale, ['common', 'blog'], nextI18NextConfig)),
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        posts: [],
        error: String(e),
        ...(await serverSideTranslations(locale, ['common', 'blog'], nextI18NextConfig)),
      },
      revalidate: 30,
    };
  }
}
