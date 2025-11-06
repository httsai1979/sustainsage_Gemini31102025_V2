import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import Hero from '../../components/layout/Hero';
import CardImage from '../../components/CardImage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const articles = {
  'career-change': {
    title: 'Navigating a career change with steadiness',
    excerpt: 'Questions and reflective prompts to help you sense next steps without pressure.',
    paragraphs: [
      'Career change rarely happens in one leap. Give yourself permission to explore possibilities in smaller experiments.',
      'Begin by naming the conditions you need to feel safe enough to move. Then co-design the smallest action that honours those needs.',
    ],
  },
  'uk-workplace': {
    title: 'Finding your footing in the UK workplace',
    excerpt: 'Decode culture, expectations, and communication styles with curiosity, not perfectionism.',
    paragraphs: [
      'Notice the unwritten rules by observing meetings, emails, and how decisions are made. Ask colleagues you trust what “good” looks like.',
      'When something feels unclear, frame questions around shared goals. Most people appreciate context and clarity.',
    ],
  },
};

function BlogPostPage({ post, slug }) {
  if (!post) {
    return (
      <MainLayout title="Article not found | SustainSage" desc="The article you requested could not be found.">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-lg font-semibold text-slate-900">We could not find that article.</p>
          <p className="mt-3 text-sm text-slate-600">
            It may have been moved. Please browse the blog for other reflective resources.
          </p>
          <Link href="/blog" className="mt-6 inline-block rounded border border-emerald-400 px-3 py-1.5 text-sm">
            Back to blog
          </Link>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`${post.title} | SustainSage`} desc={post.excerpt}>
      <Hero image="/hero/blog.svg" align="left" title={post.title} subtitle={post.excerpt} />
      <article className="prose prose-slate mx-auto max-w-3xl px-6 py-16">
        <CardImage className="mb-6" alt={post.title} />
        {post.paragraphs.map((paragraph, index) => (
          <p key={`${slug}-paragraph-${index}`}>{paragraph}</p>
        ))}
        <p>
          <Link href="/blog">Back to blog</Link>
        </p>
      </article>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(articles).map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const post = articles[params.slug] || null;

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      slug: params.slug,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}

export default BlogPostPage;
