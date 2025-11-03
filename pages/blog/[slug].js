import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function BlogPostPlaceholder({ slug = '' }) {
  const { t } = useTranslation('common');

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <p className="mb-6 text-sm text-gray-500">
        <Link href="/blog" className="underline">
          {t('blog.backToIndex', '← Back to Blog')}
        </Link>
      </p>
      <h1 className="text-3xl font-semibold text-gray-900">
        {t('blog.placeholderTitle', 'Blog post coming soon')}
      </h1>
      <p className="mt-4 text-gray-700">
        {t(
          'blog.placeholderBody',
          'We have not published this article yet. Please check back later for more insights.'
        )}
      </p>
      {slug ? (
        <p className="mt-6 text-sm text-gray-500">
          {t('blog.requestedSlug', 'Requested slug')}: <span className="font-mono">{slug}</span>
        </p>
      ) : null}
    </main>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const post = await fetchBlogPostBySlug(params?.slug);
    if (!post) return { notFound: true };
    return { props: { post }, revalidate: 60 };
  } catch (e) {
    console.error('Failed to load blog post:', e);
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return { props: { post: null, error: errorMessage }, revalidate: 30 };
  }
}
