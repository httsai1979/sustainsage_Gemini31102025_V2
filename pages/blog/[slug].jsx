// [SSG BLOG + BRAND] Added article wrapper, card layout, new colour tokens, and logo usage.
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import Container from '@/components/ui/Container';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Section from '@/components/ui/Section';
import { getAllPosts, getPostRendered } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

export default function BlogPost({ fm, html }) {
  const heroImage = fm.heroImage || fm.hero;
  const targetAudience = Array.isArray(fm.targetAudience)
    ? fm.targetAudience.join(' · ')
    : fm.targetAudience;
  const formattedDate = formatDate(fm.date);
  const hasMeta = Boolean(targetAudience || formattedDate || fm.readingTimeMinutes);
  const breadcrumb = fm.breadcrumb ?? fm.localeBreadcrumb ?? '';

  return (
    <Section className="ssg-blog-page">
      <Container className="ssg-blog-container">
        <header className="ssg-blog-hero">
          <div className="ssg-blog-hero-text">
            {breadcrumb ? <p className="ssg-blog-breadcrumb">{breadcrumb}</p> : null}
            <h1 className="ssg-blog-title">{fm.title}</h1>
            {fm.summary ? <p className="ssg-blog-summary">{fm.summary}</p> : null}
            {hasMeta ? (
              <div className="ssg-blog-meta">
                {targetAudience ? <span>{targetAudience}</span> : null}
                {formattedDate ? <span>{formattedDate}</span> : null}
                {fm.readingTimeMinutes ? <span>{fm.readingTimeMinutes} min read</span> : null}
              </div>
            ) : null}
          </div>
          <div className="ssg-blog-hero-media">
            {heroImage ? (
              <ResponsiveImage
                src={heroImage}
                alt={fm.alt || fm.title || ''}
                width={1600}
                height={900}
                className="ssg-blog-hero-image"
                priority
              />
            ) : (
              <div className="ssg-blog-hero-placeholder" aria-hidden="true" />
            )}
          </div>
        </header>
        <article className="ssg-blog-article">
          <div className="ssg-blog-article-body typography" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </Container>
    </Section>
  );
}

BlogPost.getLayout = function getLayout(page) {
  const frontmatter = page.props?.fm ?? {};
  const { title, description, hero } = frontmatter;

  return (
    <MainLayout
      seo={{
        title,
        description,
        og: {
          type: 'article',
        },
        ogImage: hero,
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticPaths({ locales }) {
  const slugs = getAllPosts('en').map((post) => post.slug);
  const paths = slugs.flatMap((slug) => locales.map((locale) => ({ params: { slug }, locale })));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const { frontmatter, html } = await getPostRendered(locale, params.slug);
  return toSerializable({
    props: {
      fm: frontmatter,
      html,
      ...(await serverSideTranslations(locale, ['common', 'nav'])),
    },
  });
}

function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
