import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import ContactForm from '@/components/Sections/ContactForm';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/85 p-5 shadow-sm transition hover:shadow-md';

function ContactPage() {
  const { t } = useTranslation('contact');
  const expectItems = t('expect.items', { returnObjects: true });
  const languages = t('expect.languages', { returnObjects: true });
  const noteLines = t('formNote.lines', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        note={t('hero.note')}
        image="/hero/contact.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Calendar illustration' })}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <ContactForm />
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 text-sm leading-6 text-emerald-900">
                {noteLines.map((line, index) => (
                  <p key={line} className={index > 0 ? 'mt-3' : undefined}>
                    {line.includes('{privacyLink}') ? (
                      <>
                        {line.split('{privacyLink}')[0]}
                        <Link
                          href={t('formNote.privacyHref')}
                          className="font-semibold text-emerald-800 underline-offset-4 transition hover:text-emerald-900"
                        >
                          {t('formNote.privacyLabel')}
                        </Link>
                        {line.split('{privacyLink}')[1]}
                      </>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Reveal>
                <HoverLift>
                  <div className={`${CARD_BASE_CLASS} bg-white text-left`}>
                    <h2 className="text-lg font-semibold text-slate-900">{t('expect.title')}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{t('expect.subtitle')}</p>
                    <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                      {expectItems.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </HoverLift>
              </Reveal>

              <Reveal className="reveal-1">
                <HoverLift>
                  <div className={`${CARD_BASE_CLASS} bg-emerald-50/70 text-left`}>
                    <h3 className="text-sm font-semibold text-emerald-900">{t('expect.languageTitle')}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-900">
                      {languages.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </HoverLift>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

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
