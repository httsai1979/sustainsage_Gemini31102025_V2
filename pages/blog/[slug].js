import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchBlogPostBySlug } from '@/lib/contentful';
import nextI18NextConfig from '@/next-i18next.config.js';
import { resolveFallbackKey } from '@/lib/blogFallback.server';

function formatPublishedDate(dateString) {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function buildFallbackNodes(article) {
  if (!article || typeof article !== 'object') {
    return [];
  }

  const nodes = [];
  const pushParagraphs = (items) => {
    if (!Array.isArray(items)) return;
    items.filter(Boolean).forEach((text) => {
      nodes.push({ type: 'paragraph', text });
    });
  };

  pushParagraphs(article.paragraphs);

  if (Array.isArray(article.sections)) {
    article.sections.forEach((section) => {
      if (!section) return;
      if (section.heading) {
        nodes.push({ type: 'heading', text: section.heading });
      }
      pushParagraphs(section.paragraphs);
      if (Array.isArray(section.list)) {
        nodes.push({ type: 'list', items: section.list.filter(Boolean) });
      }
    });
  }

  if (article.quote) {
    nodes.push({ type: 'quote', text: article.quote });
  }

  pushParagraphs(article.outro);
  pushParagraphs(article.additional);

  if (Array.isArray(article.list)) {
    nodes.push({ type: 'list', items: article.list.filter(Boolean) });
  }

  return nodes;
}

export default function BlogPost({ post = null, error = null, fallbackKey = null }) {
  const { t } = useTranslation('blog');
  const fallbackData = fallbackKey ? t(fallbackKey, { returnObjects: true }) : null;

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Head>
          <title>{t('pageTitle')}</title>
          <meta name="description" content={t('pageDescription')} />
        </Head>
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">Contentful error: {error}</p>
        <p className="mt-4">
          <Link href="/blog" className="text-primary underline">
            {t('backToList', 'Back to all posts')}
          </Link>
        </p>
      </section>
    );
  }

  if (post) {
    const cover =
      post.cover || (post.featuredImage?.fields?.file?.url ? `https:${post.featuredImage.fields.file.url}` : null);
    const publishedLabel = formatPublishedDate(post.publishedDate);

    return (
      <>
        <Head>
          <title>{post.title}</title>
          {post.excerpt ? <meta name="description" content={post.excerpt} /> : null}
        </Head>
        <article className="prose prose-gray mx-auto max-w-3xl px-6 py-16">
          <p className="text-sm text-primary">{post.category}</p>
          <h1>{post.title}</h1>
          {publishedLabel && <p className="text-sm text-gray-500">{publishedLabel}</p>}
          {cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt={post.title} className="my-6 w-full rounded-lg" />
          )}
          {typeof post.content === 'string' && post.content.trim().length > 0 ? (
            <p>{post.content}</p>
          ) : (
            <p className="text-gray-600">{t('missingBody', 'This article is being prepared. Please check back soon.')}</p>
          )}
          <p className="mt-12">
            <Link href="/blog" className="text-primary underline">
              {t('backToList', 'Back to all posts')}
            </Link>
          </p>
        </article>
      </>
    );
  }

  if (!fallbackData) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Head>
          <title>{t('pageTitle')}</title>
          <meta name="description" content={t('pageDescription')} />
        </Head>
        <p className="text-gray-600">{t('notFound', 'The requested article could not be found.')}</p>
        <p className="mt-4">
          <Link href="/blog" className="text-primary underline">
            {t('backToList', 'Back to all posts')}
          </Link>
        </p>
      </section>
    );
  }

  const nodes = buildFallbackNodes(fallbackData.article);
  const publishedLabel = fallbackData.meta?.date || formatPublishedDate(fallbackData.publishedDate);

  return (
    <>
      <Head>
        <title>{fallbackData.title}</title>
        {fallbackData.excerpt ? <meta name="description" content={fallbackData.excerpt} /> : null}
      </Head>
      <article className="prose prose-gray mx-auto max-w-3xl px-6 py-16">
        {fallbackData.category && <p className="text-sm font-semibold uppercase tracking-wide text-primary">{fallbackData.category}</p>}
        <h1>{fallbackData.title}</h1>
        {publishedLabel && <p className="text-sm text-gray-500">{publishedLabel}</p>}
        {fallbackData.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fallbackData.image} alt={fallbackData.title} className="my-6 w-full rounded-lg" />
        )}
        {fallbackData.excerpt && <p className="lead text-gray-600">{fallbackData.excerpt}</p>}
        {nodes.length > 0 ? (
          nodes.map((node, index) => {
            if (node.type === 'heading') {
              return (
                <h2 key={`heading-${index}`} className="mt-10">
                  {node.text}
                </h2>
              );
            }
            if (node.type === 'quote') {
              return (
                <blockquote key={`quote-${index}`}>{node.text}</blockquote>
              );
            }
            if (node.type === 'list') {
              return (
                <ul key={`list-${index}`}>
                  {node.items.map((item, itemIndex) => (
                    <li key={`list-${index}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              );
            }
            return <p key={`paragraph-${index}`}>{node.text}</p>;
          })
        ) : (
          <p className="text-gray-600">{t('missingBody', 'This article is being prepared. Please check back soon.')}</p>
        )}
        <p className="mt-12">
          <Link href="/blog" className="text-primary underline">
            {fallbackData.backButton || t('backToList', 'Back to all posts')}
          </Link>
        </p>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params, locale }) {
  try {
    const post = await fetchBlogPostBySlug(params?.slug);

    if (post) {
      return {
        props: {
          post,
          ...(await serverSideTranslations(locale, ['common', 'blog'], nextI18NextConfig)),
        },
        revalidate: 60,
      };
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      props: {
        post: null,
        error: String(error),
        ...(await serverSideTranslations(locale, ['common', 'blog'], nextI18NextConfig)),
      },
      revalidate: 30,
    };
  }

  let fallbackKey = resolveFallbackKey(locale, params?.slug);
  if (!fallbackKey && locale !== 'en') {
    fallbackKey = resolveFallbackKey('en', params?.slug);
  }

  if (!fallbackKey) {
    return { notFound: true };
  }

  return {
    props: {
      post: null,
      fallbackKey,
      ...(await serverSideTranslations(locale, ['common', 'blog'], nextI18NextConfig)),
    },
    revalidate: 300,
  };
}
