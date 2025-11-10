import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactForm from '@/components/Sections/ContactForm';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import { toSerializable } from '@/lib/toSerializable';

function BulletHighlights({ items, title, description }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      {title ? <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{title}</p> : null}
      {description ? <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p> : null}
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
  const [hasBoundaryConsent, setHasBoundaryConsent] = useState(false);

  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const journey = t('journey', { returnObjects: true });
  const miniFaq = t('miniFaq', { returnObjects: true });
  const faqLink = t('faqLink', { returnObjects: true });
  const whatYouGet = t('what_you_get', { returnObjects: true });
  const whatWeDontDo = t('what_we_dont_do', { returnObjects: true });
  const consent = t('consent', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
      </Head>

      <section className="bg-emerald-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:text-left">
          <div className="typography flex flex-col gap-4">
            <h1>{hero?.title}</h1>
            {hero?.body ? <p>{hero.body}</p> : null}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="typography flex flex-col gap-4">
            <h2>{journey?.title}</h2>
            {journey?.intro ? <p>{journey.intro}</p> : null}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {journey?.items?.map((item, index) => (
              <JourneyCard key={item.summary} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          {whatYouGet?.items?.length || whatWeDontDo?.items?.length ? (
            <div className="mb-10 space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <BulletHighlights
                  items={whatYouGet?.items}
                  title={whatYouGet?.title}
                  description={whatYouGet?.description}
                />
                <BulletHighlights
                  items={whatWeDontDo?.items}
                  title={whatWeDontDo?.title}
                  description={whatWeDontDo?.description}
                />
              </div>
              <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <input
                    id="coaching-consent"
                    name="coaching-consent"
                    type="checkbox"
                    checked={hasBoundaryConsent}
                    onChange={(event) => setHasBoundaryConsent(event.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                  />
                  <label htmlFor="coaching-consent" className="text-sm leading-6 text-slate-700">
                    <Trans
                      t={t}
                      i18nKey="consent.label"
                      components={{
                        Link: (
                          <Link
                            href="/legal/coaching-boundaries"
                            className="font-semibold text-emerald-700 underline-offset-2 hover:underline"
                          />
                        ),
                      }}
                    />
                  </label>
                </div>
                {consent?.helper ? (
                  <p className="mt-3 text-xs leading-6 text-slate-500">{consent.helper}</p>
                ) : null}
              </div>
            </div>
          ) : null}
          <div className="mb-10">
            <BulletHighlights items={hero?.bullets} title={hero?.bulletsTitle} />
          </div>
          <ContactForm hasBoundaryConsent={hasBoundaryConsent} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="typography max-w-3xl flex flex-col gap-4">
            <h2>{miniFaq?.title}</h2>
            {miniFaq?.intro ? <p>{miniFaq.intro}</p> : null}
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
    </>
  );
}

ContactPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale }) {
  return toSerializable({
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  });
}
