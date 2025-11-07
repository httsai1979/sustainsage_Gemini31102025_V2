import { Reveal } from '../ui/Motion';
import FAQSection from './FAQSection';
import { useTranslation } from 'next-i18next';

export default function HomeFaq() {
  const { t } = useTranslation('home');

  return (
    <section className="mt-16" id="home-faq">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('faq.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{t('faq.intro')}</p>
        </Reveal>
        <div className="mt-6">
          <FAQSection categories={['general']} limit={3} className="bg-transparent py-0" />
        </div>
      </div>
    </section>
  );
}
