import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

export default function Services() {
  return (
    <MainLayout title="Services | SustainSage" desc="ICF-aligned, client-led coaching formats.">
      <Hero
        image="/hero/services.svg"
        title="Services"
        subtitle="Simple formats. Clear agreements. You lead the topic; we partner with presence and curiosity."
      />
      <section className="py-8">
        <h2 className="text-xl font-semibold">Formats</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <h3 className="font-medium">1:1 Coaching</h3>
            <p className="mt-2 text-sm text-neutral-600">
              50-60 minutes. You set the agenda. We co-create goals and reflective experiments.
            </p>
          </div>
          <div className="rounded-2xl border p-6">
            <h3 className="font-medium">Small-group Clinics</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Focused clinics such as interviews or UK workplace norms. Shared learning; no advice unless requested.
            </p>
          </div>
        </div>
      </section>
      <ICFNotice />
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
