import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/layout/Hero';
import ICFNotice from '../components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const formats = [
  { title: '1:1 Coaching', description: '50–60 minutes. You set the agenda. We co-create goals and reflective experiments.' },
  { title: 'Small-group Clinics', description: 'Focused clinics (e.g., interviews, UK workplace norms). Shared learning; no advice-giving unless requested.' },
];

const commitments = [
  'ICF ethics, clear boundaries, and informed consent',
  'Non-directive partnership; you retain choice and responsibility',
  'Confidentiality within legal/safeguarding limits',
  'Regular review of aims, pace and usefulness',
];

const exclusions = [
  'Therapy, counselling, assessment or diagnosis',
  'Legal, immigration, medical or financial advice',
  'Guarantees of outcomes',
];

const practicalities = [
  'Online, UK time. Session notes are light and client-owned.',
  'Pricing is shared after the intro chat once scope is clear.',
  'We may use supervision; identifying details are protected.',
];

function ServicesPage() {
  return (
    <MainLayout title="Services | SustainSage" desc="ICF-aligned, client-led coaching formats.">
      <Hero
        image="/hero/services.svg"
        align="left"
        title="Services"
        subtitle="Simple formats. Clear agreements. You lead the topic; we partner with presence and curiosity."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Formats</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {formats.map((item) => (
              <article key={item.title} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What we commit to</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {commitments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What we do not do</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {exclusions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Practicalities</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {practicalities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}

export default ServicesPage;
