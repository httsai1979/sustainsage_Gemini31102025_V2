import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import { fetchBlogPostBySlug } from '@/lib/contentful';
import { resolveFallbackKey } from '@/lib/blogFallback.server';

import nextI18NextConfig from '@/next-i18next.config.js';

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

function FallbackArticle({ fallbackData, t }) {
  const nodes = buildFallbackNodes(fallbackData.article);
  const publishedLabel = fallbackData.meta?.date || formatPublishedDate(fallbackData.publishedDate);

  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-16">
      {fallbackData.category && (
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{fallbackData.category}</p>
      )}
      <h1>{fallbackData.title}</h1>
      {publishedLabel && <p className="text-sm text-slate-500">{publishedLabel}</p>}
      {fallbackData.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={fallbackData.image} alt={fallbackData.title} className="my-6 w-full rounded-xl" />
      )}
      {fallbackData.excerpt && <p className="lead text-slate-600">{fallbackData.excerpt}</p>}
      {nodes.length > 0 ? (
        nodes.map((node, index) => {
          if (node.type === 'heading') {
            return <h2 key={`heading-${index}`}>{node.text}</h2>;
          }
          if (node.type === 'list') {
            return (
              <ul key={`list-${index}`}>
                {node.items.map((item, itemIndex) => (
                  <li key={`list-${index}-item-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            );
          }
          if (node.type === 'quote') {
            return <blockquote key={`quote-${index}`}>{node.text}</blockquote>;
          }
          return <p key={`paragraph-${index}`}>{node.text}</p>;
        })
      ) : (
        <p className="text-sm text-slate-600">{t('missingBody')}</p>
      )}
      <p className="mt-12">
        <Link href="/blog" className="text-emerald-700 underline">
          {t('backToList')}
        </Link>
      </p>
    </article>
  );
}

function CmsArticle({ post, t }) {
  const cover =
    post.cover || (post.featuredImage?.fields?.file?.url ? `https:${post.featuredImage.fields.file.url}` : null);
  const publishedLabel = formatPublishedDate(post.publishedDate);

  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-16">
      {post.category && <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{post.category}</p>}
      <h1>{post.title}</h1>
      {publishedLabel && <p className="text-sm text-slate-500">{publishedLabel}</p>}
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt={post.title} className="my-6 w-full rounded-xl" />
      )}
      {typeof post.content === 'string' && post.content.trim().length > 0 ? (
        <p>{post.content}</p>
      ) : (
        <p className="text-sm text-slate-600">{t('missingBody')}</p>
      )}
      <p className="mt-12">
        <Link href="/blog" className="text-emerald-700 underline">
          {t('backToList')}
        </Link>
      </p>
    </article>
  );
}

function BlogPost({ post = null, error = null, fallbackKey = null }) {
  const { t } = useTranslation('blog');
  const fallbackData = fallbackKey ? t(fallbackKey, { returnObjects: true }) : null;

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</p>
        <p className="mt-6 text-sm text-slate-600">{t('errorDetail')}</p>
        <p className="mt-8">
          <Link href="/blog" className="text-emerald-700 underline">
            {t('backToList')}
          </Link>
        </p>
      </section>
    );
  }

  if (post) {
    return (
      <>
        <CmsArticle post={post} t={t} />
        <div className="px-6 pb-16">
          <ICFNotice className="mx-auto max-w-4xl" />
        </div>
      </>
    );
  }

  if (fallbackData) {
    return (
      <>
        <FallbackArticle fallbackData={fallbackData} t={t} />
        <div className="px-6 pb-16">
          <ICFNotice className="mx-auto max-w-4xl" />
        </div>
      </>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-slate-600">{t('notFound')}</p>
      <p className="mt-4">
        <Link href="/blog" className="text-emerald-700 underline">
          {t('backToList')}
        </Link>
      </p>
    </section>
  );
}

BlogPost.getLayout = function getLayout(page) {
  const { post } = page.props || {};
  const metaTitle = post?.title ? `${post.title} | SustainSage` : 'Blog | SustainSage';
  const metaDesc = post?.excerpt || 'Short, reflective reads with prompts grounded in coaching ethics.';

  return (
    <MainLayout title={metaTitle} desc={metaDesc}>
      {page}
    </MainLayout>
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params, locale = 'en' }) {
  try {
    const { slug } = params;
    const post = await fetchBlogPostBySlug(slug);

    if (!post) {
      const fallbackKey = resolveFallbackKey(locale, slug);
      return {
        props: {
          post: null,
          fallbackKey,
          ...(await serverSideTranslations(locale, ['common', 'blog'], nextI18NextConfig)),
        },
        revalidate: 60,
      };
    }

    return {
      props: {
        post,
        fallbackKey: null,
        ...(await serverSideTranslations(locale, ['common', 'blog'], nextI18NextConfig)),
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        post: null,
        fallbackKey: null,
        error: String(error),
        ...(await serverSideTranslations(locale, ['common', 'blog'], nextI18NextConfig)),
      },
      revalidate: 30,
    };
  }
}

export default BlogPost;
