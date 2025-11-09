import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactForm from '@/components/Sections/ContactForm';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';

function BulletHighlights({ items, title }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      {title ? <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{title}</p> : null}
      <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function JourneyCard({ item, index }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-sm font-semibold text-emerald-700">
        {index + 1}
      </div>
      <div className="space-y-2 text-sm leading-6 text-slate-700">
        <h3 className="text-base font-semibold text-slate-900">{item.summary}</h3>
        {item.detail ? <p>{item.detail}</p> : null}
      </div>
    </div>
  );
}

function FAQItem({ item }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation('contact');

  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const journey = t('journey', { returnObjects: true });
  const miniFaq = t('miniFaq', { returnObjects: true });
  const faqLink = t('faqLink', { returnObjects: true });

  return (
    <MainLayout>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
      </Head>

      <section className="bg-emerald-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-6 px-6 text-center md:text-left">
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero?.title}</h1>
          {hero?.body ? <p className="text-base leading-7 text-slate-600">{hero.body}</p> : null}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-8 px-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{journey?.title}</h2>
            {journey?.intro ? <p className="text-base leading-7 text-slate-600">{journey.intro}</p> : null}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {journey?.items?.map((item, index) => (
              <JourneyCard key={item.summary} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10">
            <BulletHighlights items={hero?.bullets} title={hero?.bulletsTitle} />
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-8 px-6">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{miniFaq?.title}</h2>
            {miniFaq?.intro ? <p className="text-base leading-7 text-slate-600">{miniFaq.intro}</p> : null}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {miniFaq?.items?.map((item) => (
              <FAQItem key={item.question} item={item} />
            ))}
          </div>
        </div>
      </section>

      {faqLink?.label ? (
        <div className="bg-emerald-50/70 py-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-6 text-center text-sm leading-6 text-slate-700">
            <p>{faqLink?.text}</p>
            <Link href={faqLink.href} className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:underline">
              {faqLink.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      ) : null}

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
