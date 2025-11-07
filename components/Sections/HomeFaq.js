import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import Reveal from '../ui/Reveal';

function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-slate-900">{question}</span>
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500 text-sm font-semibold text-emerald-600"
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-6 text-slate-600">{answer}</div>
      )}
    </div>
  );
}

export default function HomeFaq() {
  const { t } = useTranslation('home');
  const faqs = t('faq.items', { returnObjects: true });

  return (
    <section className="section-padding bg-white" id="home-faq">
      <div className="content-container">
        <Reveal>
          <h2 className="h2 text-center">{t('faq.title')}</h2>
        </Reveal>
        <Reveal className="reveal-1">
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-slate-600">
            {t('faq.intro')}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {faqs.map((faq, index) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
