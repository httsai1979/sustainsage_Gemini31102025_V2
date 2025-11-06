import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

export default function Blog() {
  return (
    <MainLayout title="Blog | SustainSage" desc="Short, reflective reads.">
      <Hero
        image="/hero/blog.svg"
        title="Blog"
        subtitle="Short reads with reflective prompts and simple structures you can adapt."
      />
      <section className="grid gap-4 py-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <article key={item} className="rounded-2xl border p-6">
            <h3 className="font-medium">Post title {item}</h3>
            <p className="mt-2 text-sm text-neutral-600">
              A brief, non-directive exploration with questions you can try.
            </p>
            <a className="mt-4 inline-block rounded border px-3 py-1.5" href="#">
              Read
            </a>
          </article>
        ))}
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}
