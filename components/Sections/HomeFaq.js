import Reveal from '../ui/Reveal';
import FAQSection from './FAQSection';
import { useTranslation } from 'next-i18next';

export default function HomeFaq() {
  const { t } = useTranslation('home');
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
        <div className="mt-12">
          <FAQSection
            categories={['general']}
            limit={3}
            title=""
            intro=""
            className="bg-transparent py-0 sm:py-0"
          />
        </div>
      </div>
    </section>
  );
}
