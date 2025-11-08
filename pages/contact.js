import Hero from '@/components/layout/Hero';
import Head from 'next/head';
import FAQSection from '@/components/Sections/FAQSection';
import ContactForm from '@/components/Sections/ContactForm';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function ContactPage() {
  const { t } = useTranslation('contact');

  const introBullets = t('intro.bullets', { returnObjects: true });
  const processBullets = t('process.bullets', { returnObjects: true });
  const assuranceBullets = t('assurance.bullets', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Head>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/contact.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Illustration of a calendar and message' })}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{t('intro.title')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{t('intro.description')}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {introBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{t('process.title')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{t('process.description')}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {processBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{t('assurance.title')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{t('assurance.description')}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {assuranceBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <ContactForm />
      </section>

      <FAQSection categories={['contact']} limit={3} />

      <div className="px-6 pb-20">
        <ICFNotice id="icf" className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact', 'faq'], nextI18NextConfig)),
    },
  };
}

export default ContactPage;
