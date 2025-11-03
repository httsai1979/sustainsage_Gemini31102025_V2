import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BlogCard from '../../components/blog/BlogCard';
import { fetchBlogPosts } from '../../lib/contentful';

export default function BlogIndex({ posts = [], error = null }) {
  const { t } = useTranslation('blog');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="mt-3 text-gray-600">{t('hero.subtitle')}</p>
          {error && (
            <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              Contentful error: {error}
            </p>
          )}
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-600">{t('empty', 'No posts yet.')}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
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
        ...(await serverSideTranslations(locale, ['common', 'blog'])),
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        posts: [],
        error: String(e),
        ...(await serverSideTranslations(locale, ['common', 'blog'])),
      },
      revalidate: 30,
    };
  }
}
