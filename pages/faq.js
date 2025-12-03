import Link from 'next/link';
import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContentHero from '@/components/content/ContentHero';
import RevealSection from '@/components/common/RevealSection';
import MainLayout from '@/components/layout/MainLayout';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import PageSection from '@/components/ui/PageSection';
import { getFAQPageContent } from '@/lib/faqContent';
import { toSerializable } from '@/lib/toSerializable';

const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

function toParagraphs(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((paragraph) => typeof paragraph === 'string' && paragraph.trim().length > 0);
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    return [value];
  }
  return [];
}

function FAQSection({ section }) {
  const faqs = Array.isArray(section?.faqs) ? section.faqs : [];
  if (!faqs.length) return null;

  const items = faqs.map((faq, index) => {
    const paragraphs = toParagraphs(faq?.answer);
    const answer = paragraphs.length ? (
      <div className="space-y-3 text-base leading-relaxed text-ink/70">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    ) : null;

    return {
      id: faq?.id ?? `${section?.id ?? 'faq'}-${index}`,
      q: faq?.question ?? '',
      a: answer,
    };
  });

  const titleNode = (
    <span className="inline-flex items-center gap-3">
      <Icon name={section?.iconName ?? 'question'} />
      <span>{section?.title}</span>
    </span>
  );

  return (
    <PageSection id={section?.id} title={titleNode} lead={section?.lead} className="pt-4">
      <RevealSection>
        <Accordion items={items} />
      </RevealSection>
    </PageSection>
  );
}

FAQSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
    iconName: PropTypes.string,
    faqs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        question: PropTypes.string,
        answer: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.string),
          PropTypes.string,
        ]),
      }),
    ),
  }),
};

function CTASection({ cta }) {
  if (!cta?.title) return null;
  const body = toParagraphs(cta?.body);

  return (
    <PageSection id={cta?.id ?? 'faq-cta'} title={cta.title} background="paper">
      {body.length ? (
        <div className="space-y-4 text-base leading-relaxed text-ink/70">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        {cta?.primaryCta?.href ? (
          <Button href={cta.primaryCta.href}>
            {cta.primaryCta.label ?? 'Book a 20-minute chat'}
          </Button>
        ) : null}
        {cta?.secondaryCta?.href ? (
          <Button href={cta.secondaryCta.href} variant="secondary">
            {cta.secondaryCta.label ?? 'Explore services'}
          </Button>
        ) : null}
      </div>
    </PageSection>
  );
}

CTASection.propTypes = {
  cta: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    primaryCta: PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    }),
    secondaryCta: PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    }),
  }),
};

function FAQPage({ content, showFallbackNotice = false, fallbackNotice = DEFAULT_NOTICE }) {
  const hero = content?.hero ?? {};
  const sections = Array.isArray(content?.sections) ? content.sections : [];
  const cta = content?.cta ?? null;

  return (
    <main>
      <ContentHero hero={hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />
      {sections.map((section) => (
        <FAQSection key={section?.id ?? section?.title} section={section} />
      ))}
      <CTASection cta={cta} />
    </main>
  );
}

FAQPage.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    sections: PropTypes.arrayOf(PropTypes.object),
    cta: PropTypes.object,
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};

FAQPage.getLayout = function getLayout(page) {
  const seo = page.props?.seo ?? {};
  return (
    <MainLayout
      seo={{
        title: seo?.title ?? 'FAQ',
        description: seo?.description ?? null,
      }}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en-GB' }) {
  const resolvedLocale = typeof locale === 'string' ? locale : 'en-GB';
  const { content, isFallback } = getFAQPageContent(resolvedLocale);
  const fallbackNotice = content?.fallbackNotice ?? DEFAULT_NOTICE;
  const { loadNamespace } = await import('@/lib/server/loadNamespace');
  const namespaceCopy = loadNamespace(resolvedLocale, 'faq');

  return toSerializable({
    props: {
      content,
      showFallbackNotice: isFallback,
      fallbackNotice,
      seo: namespaceCopy?.seo ?? null,
      ...(await serverSideTranslations(resolvedLocale, ['common', 'nav', 'faq'])),
    },
  });
}

export default FAQPage;
