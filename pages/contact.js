import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactForm from '@/components/Sections/ContactForm';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';

const ICON_CLASS = 'h-10 w-10 flex-shrink-0 rounded-xl bg-emerald-50 p-2 text-emerald-700';

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <path d="M6 17h5v-3h5v-3h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 7h6v3h5v3h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SummaryBullet({ item }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-emerald-100 bg-white/95 p-5 shadow-sm">
      <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
      <div className="space-y-1">
        <strong className="block text-sm font-semibold text-slate-900">{item.summary}</strong>
        {item.detail ? <p className="text-sm leading-6 text-slate-700">{item.detail}</p> : null}
      </div>
    </li>
  );
}

export default function ContactPage() {
  const { t } = useTranslation('contact');

  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const preForm = t('preForm', { returnObjects: true });
  const miniFaq = t('miniFaq', { returnObjects: true });
  const afterReachOut = t('afterReachOut', { returnObjects: true });

  return (
    <MainLayout>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <section className="bg-emerald-50/60 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 md:flex-row md:items-start">
          <div className="space-y-4 md:flex-1">
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero.title}</h1>
            <p className="text-base leading-7 text-slate-600">
              <strong className="block text-slate-900">Share what is shifting.</strong>
              {hero.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 text-sm leading-6 text-slate-700 md:w-80">
            <div className="flex items-center gap-3">
              <EnvelopeIcon />
              <h2 className="text-base font-semibold text-slate-900">{preForm.title}</h2>
            </div>
            <ul className="space-y-3">
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

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{afterReachOut.title}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                <strong className="block text-slate-900">Reduce the unknowns.</strong>
                Know what happens after you press send.
              </p>
            </div>
            <StepsIcon />
          </div>
          <ul className="mt-10 space-y-4">
            {afterReachOut.items.map((item) => (
              <SummaryBullet key={item.summary} item={item} />
            ))}
          </ul>
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
                <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  <strong className="block text-slate-900">Here is what to expect.</strong>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 pb-20">
        <ICFNotice id="icf" className="mx-auto max-w-4xl" />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  };
}
