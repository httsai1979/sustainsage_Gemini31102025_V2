import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '../../components/layout/MainLayout';
import { fetchBlogPosts } from '../../lib/contentful';

export default function BlogIndexPage({ posts = [], error = null }) {
  const { t } = useTranslation('blog');
  const { locale } = useRouter();

  return (
    <MainLayout>
      <NextSeo title={t('pageTitle')} description={t('pageDescription')} />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('hero.subtitle')}
            </p>
            {error && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {t('errorMessage', { message: error })}
              </p>
            )}
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {(!posts || posts.length === 0) && !error ? (
              <p className="text-gray-600">{t('emptyState')}</p>
            ) : (
              posts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                >
                  {post.featuredImage?.fields?.file?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https:${post.featuredImage.fields.file.url}`}
                      alt={post.title}
                      className="absolute inset-0 -z-10 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 -z-10 bg-gray-300" />
                  )}

                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    {post.publishedDate && (
                      <time dateTime={post.publishedDate} className="mr-8">
                        {new Date(post.publishedDate).toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    )}
                    {post.author?.name && (
                      <div className="-ml-4 flex items-center gap-x-4">
                        <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                          <circle cx={1} cy={1} r={1} />
                        </svg>
                        <div className="flex gap-x-2.5">{post.author.name}</div>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm leading-6 text-gray-300">{post.excerpt}</p>
                  )}
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  try {
    const posts = await fetchBlogPosts();
    const translations = await serverSideTranslations(locale, ['common', 'blog']);

    return {
      props: {
        posts,
        ...translations,
      },
      revalidate: 60,
    };
  } catch (e) {
    console.error('Failed to load blog posts:', e);
    const translations = await serverSideTranslations(locale, ['common', 'blog']);
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';

    return {
      props: {
        posts: [],
        error: errorMessage,
        ...translations,
      },
      revalidate: 30,
    };
  }
}
