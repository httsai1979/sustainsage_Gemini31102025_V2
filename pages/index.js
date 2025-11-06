import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import { Reveal, HoverLift } from '@/components/ui/Motion';
import ICFNotice from '@/components/legal/ICFNotice';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

export default function Home() {
  const { t } = useTranslation(['common', 'home']);
  const whoItems = t('who.items', { ns: 'home', returnObjects: true }) || [];
  const steps = t('how.steps', { ns: 'home', returnObjects: true }) || [];

  return (
    <MainLayout
      title="SustainSage | Coaching"
      desc={t('hero.subtitle', { ns: 'home' })}
      jsonLd={{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'SustainSage' }}
    >
      <Hero
        image="/hero/home.svg"
        priority
        title={t('hero.title', { ns: 'home' })}
        subtitle={t('hero.subtitle', { ns: 'home' })}
      >
        <Link href="/contact" className="rounded-lg bg-[#4A6C56] px-4 py-2 text-white">
          {t('cta.book', { ns: 'common' })}
        </Link>
        <a href="#how-it-works" className="rounded-lg border px-4 py-2">
          {t('cta.how', { ns: 'common' })}
        </a>
      </Hero>

      <section className="py-10">
        <Reveal>
          <h2 className="text-xl font-semibold">{t('who.title', { ns: 'home' })}</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {whoItems.map(({ h, d }) => (
            <HoverLift key={h}>
              <div className="rounded-2xl border p-6">
                <h3 className="font-medium">{h}</h3>
                <p className="mt-2 text-sm text-neutral-600">{d}</p>
              </div>
            </HoverLift>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="py-10">
        <Reveal>
          <h2 className="text-xl font-semibold">{t('how.title', { ns: 'home' })}</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map(({ h, d }) => (
            <div key={h} className="rounded-2xl border p-6">
              <h3 className="font-medium">{h}</h3>
              <p className="mt-2 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <ICFNotice />
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
