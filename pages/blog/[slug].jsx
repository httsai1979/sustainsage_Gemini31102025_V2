import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import Container from '@/components/ui/Container';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Section from '@/components/ui/Section';
import { getAllPosts, getPostRendered } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';

export default function BlogPost({ fm, html }) {
  return (
    <Section>
      <Container>
        <article className="prose prose-slate mx-auto max-w-3xl">
          <h1>{fm.title}</h1>
          {fm.hero ? (
            <ResponsiveImage
              src={fm.hero}
              alt={fm.alt || fm.title || ''}
              width={1600}
              height={900}
              className="my-6"
              priority
            />
          ) : null}
          <div dangerouslySetInnerHTML={{ __html: html }} />
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
