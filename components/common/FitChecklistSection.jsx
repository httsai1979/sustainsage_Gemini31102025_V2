import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import SectionContainer from '@/components/sections/SectionContainer';
import PageSection from '@/components/ui/PageSection';
import CardShell from '@/components/ui/CardShell';
import { orderSections } from '@/lib/orderSections';

function normalizeItems(items = []) {
  if (!Array.isArray(items)) return [];
  return orderSections(items)
    .map((item, index) => {
      if (!item) return null;
      if (typeof item === 'string') {
        return { question: item, answer: '' };
      }

      const question = item.question ?? item.title ?? item.key ?? `Q${index + 1}`;
      const answer = item.answer ?? item.body ?? item.description;

      if (!question && !answer) return null;

      return {
        question,
        answer,
      };
    })
    .filter(Boolean);
}

export default function FitChecklistSection({
  eyebrow: eyebrowProp,
  title: titleProp,
  description: descriptionProp,
  items: itemsProp,
  show = true,
}) {
  const { t } = useTranslation('common');
  const fallback = t('fitChecklist', { returnObjects: true }) ?? {};

  const eyebrow = eyebrowProp ?? fallback.eyebrow;
  const title = titleProp ?? fallback.title;
  const description = descriptionProp ?? fallback.description;
  const items = normalizeItems(itemsProp ?? fallback.items);

  if (!show || items.length === 0) return null;

  return (
    <SectionContainer variant="surface" tone="muted">
      <PageSection className="space-y-6" title={title} eyebrow={eyebrow} lead={description}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <CardShell key={`${item.question ?? index}-${index}`} className="h-full">
              <div className="space-y-3 text-sm leading-6 text-slate-700">
                {item.question ? (
                  <p className="font-semibold text-sustain-text">{item.question}</p>
                ) : null}
                {item.answer ? <p>{item.answer}</p> : null}
              </div>
            </CardShell>
          ))}
        </div>
      </PageSection>
    </SectionContainer>
  );
}

FitChecklistSection.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.array,
  show: PropTypes.bool,
};
