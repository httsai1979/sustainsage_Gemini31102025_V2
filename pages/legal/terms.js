import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

function Terms() {
  return (
    <>
      <Hero image="/hero/default.svg" title="Terms" subtitle="Clear scope, responsibilities and limits." />
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-4 text-neutral-800">
        <p>Coaching is a non-directive, client-led partnership. It is not therapy, counselling, medical, legal, or financial advice.</p>
        <p>We will agree goals, boundaries, confidentiality limits, and fees before we begin. You remain responsible for your choices.</p>
      </div>
    </>
  );
}

Terms.getLayout = (page) => <MainLayout title="Terms | SustainSage">{page}</MainLayout>;
export default Terms;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)) } };
}
