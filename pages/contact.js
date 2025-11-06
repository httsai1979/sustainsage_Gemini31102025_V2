import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ContactPage() {
  const { t } = useTranslation('contact');

  return (
    <MainLayout
      title="Contact - SustainSage"
      desc={t('hero.lead', { defaultValue: 'Get in touch. Bilingual, practical, no-hype coaching.' })}
      jsonLd={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact - SustainSage' }}
    >
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">
            {t('hero.title', { defaultValue: 'Contact us' })}
          </h1>
          <p className="text-lg text-[#555] mb-10">
            {t('hero.lead', { defaultValue: 'Send a message and we’ll reply within 1-2 business days.' })}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border bg-white p-5">
              <h2 className="font-medium mb-2">{t('ways.email_title', { defaultValue: 'Email' })}</h2>
              <p className="text-sm text-[#666] mb-3">{t('ways.email_note', { defaultValue: 'Best for detailed questions or sharing context.' })}</p>
              <a className="inline-block px-3 py-2 rounded-md bg-[#4A6C56] text-white" href="mailto:hc.tsai@sustainsage-group.com">
                hc.tsai@sustainsage-group.com
              </a>
            </div>
            <div className="rounded-xl border bg-white p-5">
              <h2 className="font-medium mb-2">{t('ways.intro_title', { defaultValue: 'Book an intro' })}</h2>
              <p className="text-sm text-[#666] mb-3">
                {t('ways.intro_note', { defaultValue: 'Free 20-minute intro call. No pressure, just clarity.' })}
              </p>
              <Link className="inline-block rounded-md border px-3 py-2" href="/contact">
                {t('ways.intro_cta', { defaultValue: 'See availability' })}
              </Link>
            </div>
          </div>

          <div className="mt-10 text-sm text-[#666]">
            {t('disclaimer', { defaultValue: 'We’re UK-based (UTC). Responses within business hours.' })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

ContactPage.getLayout = (page) => <MainLayout title="Contact | SustainSage">{page}</MainLayout>;
export default ContactPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  };
}
