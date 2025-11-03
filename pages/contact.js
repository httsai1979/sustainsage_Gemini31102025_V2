import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactForm from '../components/Sections/ContactForm';

export default function ContactPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('contact.heroTitle')}</title>
        <meta name="description" content={t('contact.heroSubtitle')} />
      </Head>

      <section className="bg-white py-16">
        <div className="content-container text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            {t('contact.heroTitle')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t('contact.heroSubtitle')}</p>
        </div>
      </section>

      <div className="py-12">
        <ContactForm />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
