import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/layout/Hero';

export default function Home() {
  return (
    <MainLayout
      title="Calm, client-led coaching for real-life change"
      desc="We help mid-career professionals, newcomers and graduates find traction—without hype."
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'SustainSage Coaching'
      }}
    >
      <Hero
        title="Calm, client-led coaching for real-life change"
        subtitle="We help mid-career professionals, newcomers and graduates find traction—without hype."
        align="left"
        image="/hero/home.svg"
        priority
      />
      <section className="py-10">
        <h2 className="text-xl font-semibold">Who we work with</h2>
        <p className="mt-4 max-w-3xl text-gray-700">
          Mid-career professionals, newcomers to the UK, graduates and parents
          returning to work who want steady, ethical support to think clearly
          and move on real decisions.
        </p>
      </section>
    </MainLayout>
  );
}
