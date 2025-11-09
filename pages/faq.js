import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function FAQItem({ item }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
      {Array.isArray(item.links) && item.links.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-emerald-700">
          {item.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-flex items-center gap-1 hover:underline">
                {link.label}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FAQGroup({ group }) {
  if (!group?.items?.length) {
    return null;
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{group.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {group.items.map((item) => (
            <FAQItem key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQPage() {
  const { t } = useTranslation('faqPage');
  const groups = t('groups', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/services.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Illustration of frequently asked questions' })}
      />

      {groups.map((group) => (
        <FAQGroup key={group.title} group={group} />
      ))}

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">{t('cta.body')}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=faq"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              {t('cta.primary')}
            </Link>
            <Link
              href="/contact?from=faq"
              className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'faqPage'], nextI18NextConfig)),
    },
  };
}

export default FAQPage;
