import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

export default function About() {
  return (
    <MainLayout title="About | SustainSage" desc="ICF-aligned practice. Presence, curiosity and respect.">
      <Hero
        image="/hero/about.svg"
        title="About us"
        subtitle="ICF-aligned practice. Presence, curiosity and respect for your pace, context and choices."
      />
      <section className="py-4">
        <p className="max-w-3xl text-neutral-700">
          We coach in a steady, human way. You set the topic; we partner to deepen awareness and support committed action in
          your real context.
        </p>
        <ul className="mt-6 list-disc pl-6 text-neutral-700">
          <li>Ethical practice and clear agreements</li>
          <li>Active listening and reflective questions</li>
          <li>Gentle accountability and regular review</li>
        </ul>
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
