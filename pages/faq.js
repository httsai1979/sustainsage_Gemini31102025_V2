import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import PageSection from '@/components/ui/PageSection';
import { loadJSON } from '@/lib/content';
import { orderSections } from '@/lib/content/normalize';
import { toSerializable } from '@/lib/toSerializable';

const ICON_CLASS = 'h-12 w-12 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700';

const iconMap = {
  question: (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.75 9.75a2.25 2.25 0 114.5 0c0 1.5-2.25 2.25-2.25 2.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="16.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <path
        d="M12 4l7 3v5.5c0 4.142-3.134 7.5-7 7.5s-7-3.358-7-7.5V7l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 10.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  safety: (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <path
        d="M7 12.5a5 5 0 0110 0c0 3-2.5 5.5-5 7-2.5-1.5-5-4-5-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.5 12.25l1.5 1.5 2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" className={ICON_CLASS} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function Category({ category }) {
  if (!category?.items?.length) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
        {iconMap[category.icon] ?? iconMap.question}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{category.title}</h2>
            {category.intro ? <p className="mt-2 text-sm leading-6 text-slate-600">{category.intro}</p> : null}
          </div>
          <div className="space-y-4">
            {category.items.map((item) => (
              <div key={item.question} className="space-y-2 rounded-2xl bg-emerald-50/60 p-5 text-sm leading-6 text-slate-700">
                <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Category.propTypes = {
  category: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    intro: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default function FAQPage({
  content = {},
  showFallbackNotice = false,
  fallbackNotice = null,
} = {}) {
  const hero = content?.hero ?? {};
  const categories = content?.categories ?? [];
  const cta = content?.cta ?? {};
  const orderedCategories = orderSections(Array.isArray(categories) ? categories : []);
  const fallbackMessage =
    fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return (
    <>
      <PageSection className="bg-emerald-950/5">
        <div className="text-center">
          {hero?.kicker ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{hero.kicker}</p>
          ) : null}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero?.title}</h1>
          {hero?.body ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{hero.body}</p>
          ) : null}
          {showFallbackNotice ? (
            <p className="mt-3 text-xs font-medium text-slate-500">{fallbackMessage}</p>
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
                  <span aria-hidden>→</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </PageSection>

      <PageSection className="bg-white">
        <div className="space-y-8">
          {orderedCategories.map((category) => (
            <Category key={category.title} category={category} />
          ))}
        </div>
      </PageSection>

      <PageSection className="bg-emerald-950/5">
        <div className="rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
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
              {cta?.secondary ?? 'Explore coaching pathways'}
            </Link>
          </div>
        </div>
      </PageSection>
    </>
  );
}

FAQPage.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    categories: PropTypes.array,
    cta: PropTypes.object,
    seo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};


FAQPage.getLayout = function getLayout(page) {
  const seo = page.props?.content?.seo ?? {};
  return (
    <MainLayout
      seo={{
        title: seo.title,
        description: seo.description,
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en-GB' }) {
  const content = loadJSON('faq', locale);
  const fallbackNotice =
    typeof content?.fallbackNotice === 'string' && content.fallbackNotice.length > 0
      ? content.fallbackNotice
      : null;
  const isEnglishLocale = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
  const showFallbackNotice = !isEnglishLocale && Boolean(fallbackNotice);

  return toSerializable({
    props: {
      content,
      showFallbackNotice,
      fallbackNotice,
      ...(await serverSideTranslations(locale, ['common', 'faq'])),
    },
  });
}
