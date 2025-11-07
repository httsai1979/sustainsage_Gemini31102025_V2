import { useState } from 'react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';

import Reveal from '../ui/Reveal';

function FaqItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-6 py-5">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-slate-900">{faq.question}</span>
        {isOpen ? (
          <MinusSmallIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
        ) : (
          <PlusSmallIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
        )}
      </button>
      {isOpen ? (
        <div className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</div>
      ) : null}
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
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
