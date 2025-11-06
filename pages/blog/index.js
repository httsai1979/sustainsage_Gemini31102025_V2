import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

function BlogIndex() {
  const posts = [1, 2, 3, 4].map((i) => ({
    title: `Post title ${i}`,
    summary: 'A brief, non-directive exploration with questions you can try.'
  }));

  return (
    <>
      <Hero image="/hero/default.svg" title="Blog" subtitle="Short reads with reflective prompts and simple structures you can adapt." />
      <section className="mx-auto max-w-6xl px-4 py-8 grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <article key={p.title} className="rounded-2xl border bg-white p-6">
            <h3 className="font-medium">{p.title}</h3>
            <p className="mt-2 text-sm text-neutral-600">{p.summary}</p>
            <a className="mt-4 inline-block rounded border px-3 py-1.5">Read</a>
          </article>
        ))}
      </section>
      <ICFNotice />
    </>
  );
}

BlogIndex.getLayout = (page) => <MainLayout title="Blog | SustainSage">{page}</MainLayout>;
export default BlogIndex;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)) } };
}
