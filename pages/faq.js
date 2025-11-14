import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { loadJSON } from '@/lib/content';
import { orderSections } from '@/lib/content/normalize';
import { dedupeBy } from '@/lib/dedupe';
import { toSerializable } from '@/lib/toSerializable';

const DEFAULT_FAQ_COPY = {
  session: {
    question: 'What happens in a coaching session?',
    answer:
      'Coaching is a collaborative, future-leaning conversation. You set the agenda, we ask reflective questions, and we co-design experiments.',
  },
  difference: {
    question: 'How is coaching different from therapy or mentoring?',
    answer:
      'Therapy diagnoses or treats mental health needs, while mentors or consultants provide directive plans—those stay outside coaching. We follow the International Coaching Federation Code of Ethics.',
  },
  cadence: {
    question: 'How often do we meet?',
    answer: 'Individuals often start with six sessions over two to three months. You can pause or extend after each review.',
  },
  online: {
    question: 'Do you offer online sessions?',
    answer:
      'Sessions run on Zoom by default. We coach in English and Mandarin, and you can switch languages mid-session if that helps you express nuance.',
  },
  global: {
    question: 'Do you work with clients outside the UK?',
    answer:
      'Yes. We work with teams across Europe and Asia-Pacific using online sessions, shared notes, and agreed review points.',
  },
  fees: {
    question: 'How do fees work?',
    answer:
      'Personal packages range from £420 to £1,200 depending on length. Organisation-sponsored coaching starts from £1,800 for a three-month engagement.',
  },
};

export default function FAQPage({
  content = {},
  showFallbackNotice = false,
  fallbackNotice = null,
} = {}) {
  const { t } = useTranslation('faq');
  const hero = content?.hero ?? {};
  const categories = content?.categories ?? [];
  const cta = content?.cta ?? {};
  const orderedCategories = orderSections(Array.isArray(categories) ? categories : []);
  const fallbackMessage =
    fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';
  const accordionFallback = t('accordion', { returnObjects: true }) ?? {};

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

  const getFallback = (fallbackKey = 'session') => {
    const localized = accordionFallback?.[fallbackKey];
    if (localized && typeof localized === 'object') {
      return {
        question: localized.question ?? DEFAULT_FAQ_COPY[fallbackKey]?.question,
        answer: localized.answer ?? DEFAULT_FAQ_COPY[fallbackKey]?.answer,
      };
    }

    return DEFAULT_FAQ_COPY[fallbackKey] ?? { question: '', answer: '' };
  };

  const findAnswer = (keywords = [], fallbackKey = 'session') => {
    const match = faqItems.find((item) =>
      keywords.some((keyword) => item.question?.toLowerCase().includes(keyword))
    );
    if (match) {
      return { question: match.question, answer: match.answer };
    }

    return getFallback(fallbackKey);
  };

  const curatedFaqItems = [
    { fallbackKey: 'session', keywords: ['what is coaching', 'session'] },
    { fallbackKey: 'difference', keywords: ['therapy', 'consulting'] },
    { fallbackKey: 'cadence', keywords: ['how many sessions'] },
    { fallbackKey: 'online', keywords: ['formats', 'languages', 'zoom'] },
    { fallbackKey: 'global', keywords: ['time zones', 'teams across'] },
    { fallbackKey: 'fees', keywords: ['fees'] },
  ].map(({ fallbackKey, keywords }) => {
    const result = findAnswer(keywords, fallbackKey);
    const fallbackValue = getFallback(fallbackKey);
    return {
      question: result.question ?? fallbackValue.question,
      answer: result.answer ?? fallbackValue.answer,
    };
  });

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
          <FAQAccordion items={curatedFaqItems} />
        </div>
      </section>

      <section className="ss-section">
        <div className="rounded-card border border-sustain-cardBorder bg-white p-8 text-center shadow-card">
          <h2 className="text-3xl font-semibold text-sustain-text">{cta?.title}</h2>
          <p className="mt-4 text-base text-slate-700">{cta?.body}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="ss-btn-primary">
              {cta?.primary ?? 'Book a 20-minute chat'}
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
