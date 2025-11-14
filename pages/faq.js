import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { loadJSON } from '@/lib/content';
import { orderSections } from '@/lib/content/normalize';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

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

  const faqItems = dedupeBy(
    orderedCategories.flatMap((category) =>
      Array.isArray(category?.items)
        ? category.items.map((item) => ({
            question: item.question,
            answer: item.answer,
          }))
        : []
    ),
    (item, index) => item?.question ?? index
  );

  return (
    <main className="ss-container">
      <section className="ss-section">
        <div className="space-y-6 text-center md:text-left">
          {hero?.kicker ? (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-green/80">{hero.kicker}</p>
          ) : null}
          <h1 className="text-4xl font-semibold text-sustain-text">{hero?.title}</h1>
          {hero?.body ? <p className="text-base text-slate-700">{hero.body}</p> : null}
          {showFallbackNotice ? (
            <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
          ) : null}
          {hero?.links?.length ? (
            <div className="flex flex-wrap gap-3">
              {hero.links.map((link) => (
                <Link key={link.href} href={link.href} className="ss-btn-secondary">
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="ss-section">
        <div className="rounded-card border border-sustain-cardBorder bg-white p-4 shadow-card">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <section className="ss-section">
        <div className="rounded-card border border-sustain-cardBorder bg-white p-8 text-center shadow-card">
          <h2 className="text-3xl font-semibold text-sustain-text">{cta?.title}</h2>
          <p className="mt-4 text-base text-slate-700">{cta?.body}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="ss-btn-primary">
              {cta?.primary ?? 'Book a call'}
            </Link>
            <Link href="/services" className="ss-btn-secondary">
              {cta?.secondary ?? 'Explore coaching pathways'}
            </Link>
          </div>
        </div>
      </section>
    </main>
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
