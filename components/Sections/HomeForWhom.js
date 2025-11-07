import {
  AcademicCapIcon,
  BriefcaseIcon,
  GlobeAmericasIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';

import Card from '../ui/Card';
import Reveal from '../ui/Reveal';

const iconMap = [BriefcaseIcon, UserGroupIcon, GlobeAmericasIcon, AcademicCapIcon];

export default function HomeForWhom() {
  const { t } = useTranslation('home');
  const cards = t('whoWeHelp.cards', { returnObjects: true });

  return (
    <section className="section-padding bg-white" id="who-we-help">
      <div className="content-container">
        <Reveal>
          <h2 className="h2 text-center">
            <span>{t('whoWeHelp.title')}</span>
          </h2>
        </Reveal>

        <Reveal className="reveal-1">
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-slate-600">
            {t('whoWeHelp.intro')}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <Card hoverEffect className="h-full text-left">
                  <Icon className="h-12 w-12 text-primary" aria-hidden="true" />
                  <h3 className="h3 mt-6">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}