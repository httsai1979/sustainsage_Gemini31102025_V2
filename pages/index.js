// pages/blog/index.js
// [ ! ] 最終還原：重新啟用 MainLayout 和 NextSeo

import MainLayout from '../../components/layout/MainLayout'; // <-- [!] 還原匯入 (使用 ../../)
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo'; // <-- [!] 還原匯入
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchBlogPosts } from '../../lib/contentful';

export default function BlogIndexPage({ posts }) {
  const { t } = useTranslation('common');
  const { locale } = useRouter(); 

  return (
    <MainLayout> {/* <-- [!] 還原 MainLayout */}
      {/* [ ! ] 已修復：移除了錯誤的內部註解 */}
      <NextSeo
        title={t('blog.heroTitle')}
        description={t('blog.heroSubtitle')}
      />
      
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('blog.heroTitle')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('blog.heroSubtitle')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {!posts || posts.length === 0 ? (
              <p className="text-gray-600">No blog posts found.</p>
            ) : (
              posts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                >
                  {post.featuredImage && post.featuredImage.fields && post.featuredImage.fields.file ? (
                    <img 
                      src={`https_:${post.featuredImage.fields.file.url}`} 
                      alt={post.title} 
                      className="absolute inset-0 -z-10 h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="absolute inset-0 -z-10 bg-gray-300" />
                  )}

                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime={post.publishedDate} className="mr-8">
                      {new Date(post.publishedDate).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <div className="flex gap-x-2.5">
                        {post.author?.name}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    {post.excerpt}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  const posts = await fetchBlogPosts();
  const translations = await serverSideTranslations(locale, ['common']);

  return {
    props: {
      posts,
      ...translations,
    },
    revalidate: 60, 
  };
}