import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainLayout from '@/components/layout/MainLayout';
import { getAllPosts, getPostRendered } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

export default function BlogPost({ fm, html }) {
  const { title, description, hero } = fm || {};

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
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <article className="prose prose-slate mx-auto max-w-3xl">
          <h1>{fm.title}</h1>
          {fm.hero && (
            <figure className="overflow-hidden rounded-xl border border-slate-200">
              <Image src={fm.hero} alt={fm.alt || ''} width={1600} height={900} priority />
            </figure>
          )}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </MainLayout>
  );
}

BlogPost.getLayout = (page) => page;

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
      ...(await serverSideTranslations(locale, ['common'])),
    },
  });
}
