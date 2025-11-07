import { BriefcaseIcon, AcademicCapIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';

import Card from '../ui/Card';
import Reveal from '../ui/Reveal';

const cards = [
  { key: 'card1', icon: BriefcaseIcon },
  { key: 'card2', icon: AcademicCapIcon },
  { key: 'card3', icon: GlobeAmericasIcon },
];

export default function HomeForWhom() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding bg-white">
      <div className="content-container">
        <Reveal>
          <h2 className="h2 text-center">
            <span>{t('forWhom.title')}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cards.map(({ key, icon: Icon }, index) => (
            <Reveal key={key} className={`reveal-${index + 1}`}>
              <Card hoverEffect className="text-center">
                <Icon className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
                <h3 className="h3 mt-4">
                  <span>{t(`forWhom.${key}`)}</span>
                </h3>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}