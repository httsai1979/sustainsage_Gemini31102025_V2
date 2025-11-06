import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

export default function Terms() {
  return (
    <MainLayout title="Terms | SustainSage" desc="Our coaching agreements and boundaries.">
      <Hero image="/hero/default.svg" title="Terms" subtitle="Key agreements so we both know how the coaching partnership works." />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-neutral-800">
        <p>Coaching is a partnership focused on your goals. We agree on scope, schedule and fees before sessions begin.</p>
        <ul className="list-disc pl-6">
          <li>Confidentiality applies except where law or safety requires disclosure.</li>
          <li>Coaching is not therapy, counselling, legal, medical or financial advice.</li>
          <li>Rescheduling requires 24 hours notice wherever possible.</li>
        </ul>
        <p>Questions about these terms? Email hello@sustainsage-group.com before we start.</p>
      </div>
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
