import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

function AboutPage() {
  const features = [
    ['ICF-aligned ethics', 'Confidential, client-led, outcome-oriented.'],
    ['Bilingual and UK-aware', 'British English and Traditional Chinese with local hiring context in mind.'],
    ['Practical experiments', 'Tiny steps, tracked weekly, reviewed kindly.']
  ];

  return (
    <>
      <Hero image="/hero/default.svg" title="Clear, calm coaching for real-life change" subtitle="We help mid-career professionals, UK newcomers, returners and graduates find traction without hype." />
      <section className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-3">
        {features.map(([h, d]) => (
          <div key={h} className="rounded-2xl border bg-white p-6">
            <h3 className="font-medium">{h}</h3>
            <p className="mt-2 text-sm text-neutral-600">{d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-xl font-semibold">What we believe</h2>
        <p className="mt-3 max-w-3xl text-neutral-700">
          Change sticks when it is practical, paced, and owned by you. We keep it honest, gentle, and doable.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-xl font-semibold">How sessions work</h2>
        <p className="mt-3 max-w-3xl text-neutral-700">
          Sessions run for 50-60 minutes. You bring context; we co-create goals, experiments, and check-ins. No slogans, just progress.
        </p>
      </section>
      <ICFNotice />
    </>
  );
}

AboutPage.getLayout = (page) => <MainLayout title="About | SustainSage">{page}</MainLayout>;
export default AboutPage;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)) } };
}
