import { useTranslation } from 'next-i18next';

import Reveal from '../ui/Reveal';
import Card from '../ui/Card';

export default function HomeHowItWorks() {
  const { t } = useTranslation('home');
  const steps = t('howCoachingWorks.steps', { returnObjects: true });

  return (
    <section className="section-padding bg-emerald-50" id="how-coaching-works">
      <div className="content-container">
        <Reveal>
          <h2 className="h2 text-center">{t('howCoachingWorks.title')}</h2>
        </Reveal>
        <Reveal className="reveal-1">
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-emerald-900">
            {t('howCoachingWorks.intro')}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} className={`reveal-${index + 2}`}>
              <Card hoverEffect className="h-full border-emerald-100 bg-white">
                <span className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                  {step.title}
                </span>
                <p className="mt-4 text-sm leading-6 text-slate-600">{step.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
