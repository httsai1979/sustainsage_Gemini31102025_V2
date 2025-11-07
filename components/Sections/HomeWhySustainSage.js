import { useTranslation } from 'next-i18next';

import Reveal from '../ui/Reveal';
import Card from '../ui/Card';

export default function HomeWhySustainSage() {
  const { t } = useTranslation('home');
  const pillars = t('whySustainSage.pillars', { returnObjects: true });

  return (
    <section className="section-padding bg-white" id="why-sustainsage">
      <div className="content-container">
        <Reveal>
          <h2 className="h2 text-center">{t('whySustainSage.title')}</h2>
        </Reveal>
        <Reveal className="reveal-1">
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-slate-600">
            {t('whySustainSage.intro')}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} className={`reveal-${index + 2}`}>
              <Card hoverEffect className="h-full">
                <h3 className="h3">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
