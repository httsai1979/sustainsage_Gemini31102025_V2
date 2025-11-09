import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';

import nextI18NextConfig from '../next-i18next.config.js';

function Section({ title, items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="border-b border-emerald-100 py-12 last:border-b-0">
      <div className="mx-auto max-w-4xl px-5 md:px-0">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-emerald-100 bg-white/95 p-5 text-slate-700 transition hover:border-emerald-200"
            >
              <summary className="cursor-pointer text-lg font-semibold text-slate-900 marker:content-none">
                <span className="inline-flex items-center justify-between gap-4">{item.question}</span>
              </summary>
              <div className="mt-3 space-y-3 text-sm leading-6">
                <p>{item.answer}</p>
                {item.links?.length ? (
                  <ul className="flex flex-wrap gap-3 text-sm font-semibold text-emerald-700">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="inline-flex items-center gap-1 hover:underline">
                          {link.label}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FAQPage() {
  const { t } = useTranslation('faqPage');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const sections = t('sections', { returnObjects: true }) ?? [];
  const cta = t('cta', { returnObjects: true });

  return (
    <MainLayout title={seo?.title} desc={seo?.description}>
      <div className="bg-emerald-950/5 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-0">
          {hero?.kicker ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{hero.kicker}</p>
          ) : null}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero?.title}</h1>
          {hero?.body ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{hero.body}</p>
          ) : null}
          {hero?.links?.length ? (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {hero.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="mx-auto max-w-5xl">
          {sections.map((section) => (
            <Section key={section.title} title={section.title} items={section.items} />
          ))}
        </div>
      </div>

      <div className="bg-emerald-950/5 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{cta?.title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{cta?.body}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              {cta?.primary ?? 'Book a call'}
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              {cta?.secondary ?? 'Explore coaching packages'}
            </Link>
          </div>
        </div>
      </div>
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
