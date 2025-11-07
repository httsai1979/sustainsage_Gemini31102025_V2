import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import ContactForm from '@/components/Sections/ContactForm';
import { Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/80 p-4 md:p-6 shadow-sm transition hover:shadow-md';

function ContactPage() {
  const { t } = useTranslation('contact');
  const highlights = t('highlights.items', { returnObjects: true });
  const intro = t('intro');
  const nextSteps = t('afterSubmit', { returnObjects: true });
  const consentInfo = t('consent', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/contact.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Calendar illustration' })}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('highlights.title')}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('highlights.intro')}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.title} className={CARD_BASE_CLASS}>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-emerald-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <p className="text-base leading-7 text-emerald-900">{intro}</p>
          </Reveal>
        </div>
        <div className="mt-10">
          <ContactForm />
        </div>
        <div className="mx-auto mt-16 max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal className="reveal-1">
              <section className="rounded-3xl border border-emerald-100 bg-white/90 p-6 text-left shadow-sm">
                <h3 className="text-lg font-semibold text-emerald-900">{t('sidebar.title')}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {nextSteps.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
            <Reveal className="reveal-2">
              <section className="rounded-3xl border border-emerald-100 bg-white/90 p-6 text-left shadow-sm">
                <h3 className="text-lg font-semibold text-emerald-900">{consentInfo.label}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {consentInfo.points.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="px-6 pb-20">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'], nextI18NextConfig)),
    },
  };
}

export default ContactPage;
