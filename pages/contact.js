import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactForm from '@/components/Sections/ContactForm';
import ICFNotice from '@/components/legal/ICFNotice';

export default function ContactPage() {
  const { t } = useTranslation('contact');

  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const preForm = t('preForm', { returnObjects: true });
  const miniFaq = t('miniFaq', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <section className="bg-emerald-50/60 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 md:flex-row md:items-start">
          <div className="space-y-4 md:flex-1">
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero.title}</h1>
            <p className="text-base leading-7 text-slate-600">{hero.subtitle}</p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 text-sm leading-6 text-slate-700 md:w-80">
            <h2 className="text-base font-semibold text-slate-900">{preForm.title}</h2>
            <ul className="mt-4 space-y-2">
              {preForm.bullets.map((item) => (
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

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{miniFaq.title}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {miniFaq.items.map((item) => (
              <div key={item.question} className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 pb-20">
        <ICFNotice id="icf" className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  };
}
