import Image from 'next/image';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayout from '@/components/layout/MainLayout';
import { getAllPosts, getPostRendered } from '@/lib/content';

export default function BlogPost({ fm, html }) {
  return (
    <MainLayout>
      <Head>
        <title>{fm.title}</title>
        {fm.description && <meta name="description" content={fm.description} />}
      </Head>
      <article className="prose prose-slate mx-auto mt-10 max-w-3xl px-5 md:px-8">
        <h1>{fm.title}</h1>
        {fm.hero && (
          <figure className="overflow-hidden rounded-xl border border-slate-200">
            <Image src={fm.hero} alt={fm.alt || ''} width={1600} height={900} priority />
          </figure>
        )}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </MainLayout>
  );
}

export async function getStaticPaths({ locales }) {
  const slugs = getAllPosts('en').map((post) => post.slug);
  const paths = slugs.flatMap((slug) => locales.map((locale) => ({ params: { slug }, locale })));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const { frontmatter, html } = await getPostRendered(locale, params.slug);
  return {
    props: {
      fm: frontmatter,
      html,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
