import { useState } from 'react';
import PropTypes from 'prop-types';

const ITEM_CLASS =
  'group border-b border-emerald-100 last:border-b-0 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:ring-offset-white';
const BUTTON_CLASS =
  'flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-slate-900 focus:outline-none';
const PANEL_CLASS = 'pb-5 text-sm leading-6 text-slate-700';

function FAQItem({ item, index, isOpen, onToggle }) {
  const panelId = `faq-item-${index}`;
  const buttonId = `faq-trigger-${index}`;

  return (
    <div className={ITEM_CLASS}>
      <button
        type="button"
        id={buttonId}
        className={BUTTON_CLASS}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(isOpen ? null : index)}
      >
        <span>{item.question}</span>
        <span
          aria-hidden
          className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-emerald-200 text-emerald-700 transition-transform ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={PANEL_CLASS}
      >
        {item.answer}
      </div>
    </div>
  );
}

FAQItem.propTypes = {
  item: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default function FAQAccordion({ items = [], className = '' } = {}) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className={`overflow-hidden rounded-3xl border border-emerald-100 bg-white/95 shadow-sm ${className ?? ''}`}>
      {items.map((item, index) => (
        <FAQItem key={item.question} item={item} index={index} isOpen={openIndex === index} onToggle={setOpenIndex} />
      ))}
    </div>
  );
}

FAQAccordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

