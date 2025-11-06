import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/layout/Hero';
import CardImage from '../components/CardImage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const highlights = [
  {
    title: 'ICF-aligned ethics',
    description: 'Confidential, client-led, outcome-oriented.',
  },
  {
    title: 'Bilingual & UK-aware',
    description: 'British English and Traditional Chinese with local hiring culture in mind.',
  },
  {
    title: 'Practical experiments',
    description: 'Tiny steps, tracked weekly, reviewed kindly.',
  },
];

function AboutPage() {
  return (
    <MainLayout title="About - SustainSage" desc="Clear, calm coaching for real-life change.">
      <Hero
        image="/hero/about.svg"
        align="left"
        title="About us"
        subtitle="ICF-aligned practice. Presence, curiosity and respect—for your pace, context and choices."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="max-w-3xl text-lg text-slate-700">
            We coach in a steady, human way—no pressure, no slogans. You set the topic; we partner to deepen awareness and
            support committed action in your real context.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                <CardImage className="mb-4" alt={item.title} />
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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

export default AboutPage;
