// [SSG BLOG + BRAND] Added article wrapper, card layout, new colour tokens, and logo usage.
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import Container from '@/components/ui/Container';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Section from '@/components/ui/Section';
import { getAllPosts, getPostRendered } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

export default function BlogPost({ fm, html, services = [] }) {
  const heroImage = fm.heroImage || fm.hero || '/images/blog/article-default.svg';
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

        {/* Service Recommendation Block */}
        <section className="mt-20 border-t border-slate-100 pt-16">
          <div className="mb-10 space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Recommended Professional Pathways</h2>
            <p className="text-slate-500">Based on the themes in this article, these coaching services may support your next steps.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter(s => {
                const blogTags = (fm.tags || []).map(t => t.toLowerCase());
                const serviceWords = (s.title + ' ' + (s.id || '')).toLowerCase();
                const blogAudience = (fm.targetAudience || []).map(a => a.toLowerCase());

                return blogTags.some(tag => serviceWords.includes(tag)) ||
                  blogAudience.some(aud => serviceWords.includes(aud));
              })
              .slice(0, 3)
              .map(service => (
                <div key={service.id} className="group relative flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md hover:ring-emerald-200">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{service.title}</h3>
                  <div className="mt-4 flex-1 space-y-3">
                    {(service.body || []).map((p, i) => (
                      <p key={i} className="text-sm leading-relaxed text-slate-500 line-clamp-3">{p}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-emerald-600">
                    <span>Explore Pathway</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <a href={service.href} className="absolute inset-0 rounded-3xl"><span className="sr-only">View {service.title}</span></a>
                </div>
              ))}
          </div>
        </section>
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
  const { loadJSON } = require('@/lib/content');
  const servicesData = loadJSON('services', locale);
  const services = servicesData.whoThisIsForCards || [];

  return toSerializable({
    props: {
      fm: frontmatter,
      html,
      services,
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
