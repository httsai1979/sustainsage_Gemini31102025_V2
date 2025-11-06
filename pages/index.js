import Hero from '@/components/layout/Hero';
import { Reveal, HoverLift } from '@/components/ui/Motion';
import ICFNotice from '@/components/legal/ICFNotice';
import StickyCTA from '@/components/StickyCTA';
import FAQ from '@/components/faq/FAQ';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';
import MainLayout from '@/components/layout/MainLayout';

function HomePage() {
  const { t } = useTranslation('common');
  const who = t('home.who_items', { returnObjects: true }) || [];
  const steps = t('home.how_steps', { returnObjects: true }) || [];
  const faqItems = t('home.faq_items', { returnObjects: true }) || [];

  return (
    <>
      <Hero image="/hero/default.svg" priority title={t('home.hero_title')} subtitle={t('home.hero_subtitle')}>
        <Link href="/contact" className="rounded-lg bg-[#4A6C56] px-4 py-2 text-white">{t('cta.book')}</Link>
        <a href="#how-it-works" className="rounded-lg border px-4 py-2 bg-white/10 text-white">{t('cta.how')}</a>
      </Hero>

      <section className="py-10">
        <Reveal><h2 className="text-xl font-semibold">{t('home.who_title')}</h2></Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {who.map((item) => (
            <HoverLift key={item.h}>
              <div className="rounded-2xl border bg-white p-6 h-full">
                <h3 className="font-medium">{item.h}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.d}</p>
              </div>
            </HoverLift>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="py-10 bg-[#F0F2F4]">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal><h2 className="text-xl font-semibold">{t('home.how_title')}</h2></Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.h} className="rounded-2xl border bg-white p-6 h-full">
                <h3 className="font-medium">{item.h}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <FAQ title={t('home.faq_title')} items={faqItems} />
        <ICFNotice />
      </div>

      <StickyCTA />
    </>
  );
}

HomePage.getLayout = (page) => (
  <MainLayout
    title="SustainSage | Clear, calm coaching"
    desc=""
    jsonLd={{ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'SustainSage' }}
  >
    {page}
  </MainLayout>
);

export default HomePage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig))
    }
  };
}
