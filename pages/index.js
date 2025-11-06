import MainLayout from '@/components/layout/MainLayout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';

export default function Home() {
  const { t } = useTranslation(['home', 'common']);
  return (
    <MainLayout
      title="SustainSage — Coaching for real-life change"
      desc={t('hero.lead', 'Clear, calm coaching for real-life change.')}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "SustainSage — Home"
      }}
    >
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            {t('hero.title', 'Clear, calm coaching for real-life change')}
          </h1>
          <p className="text-slate-600">
            {t('hero.lead', 'We help mid-career professionals, newcomers and graduates find traction—without hype.')}
          </p>
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'], nextI18NextConfig)),
    },
  };
}
