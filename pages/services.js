import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

function ServicesPage() {
  const items = [
    ['1:1 Coaching', '50-60 minutes. You set the agenda. We co-create goals and reflective experiments.'],
    ['Small-group Clinics', 'Focused clinics (for example interviews or UK workplace norms). Shared learning; advice only if requested.']
  ];
  return (
    <>
      <Hero image="/hero/default.svg" title="Services" subtitle="Simple formats. Clear agreements. You lead; we partner with presence and curiosity." />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-xl font-semibold">Formats</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map(([h, d]) => (
            <div key={h} className="rounded-2xl border bg-white p-6">
              <h3 className="font-medium">{h}</h3>
              <p className="mt-2 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-xl font-semibold">What we commit to</h2>
        <ul className="mt-4 list-disc pl-6 text-neutral-700 space-y-2">
          <li>ICF ethics, clear boundaries, and informed consent</li>
          <li>Non-directive partnership; you retain choice and responsibility</li>
          <li>Confidentiality within legal or safeguarding limits</li>
          <li>Regular review of aims, pace, and usefulness</li>
        </ul>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-xl font-semibold">What we do not do</h2>
        <ul className="mt-4 list-disc pl-6 text-neutral-700 space-y-2">
          <li>Therapy, counselling, assessment, or diagnosis</li>
          <li>Legal, immigration, medical, or financial advice</li>
          <li>Guarantees of outcomes</li>
        </ul>
      </section>
      <ICFNotice />
    </>
  );
}

ServicesPage.getLayout = (page) => <MainLayout title="Services | SustainSage">{page}</MainLayout>;
export default ServicesPage;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)) } };
}
