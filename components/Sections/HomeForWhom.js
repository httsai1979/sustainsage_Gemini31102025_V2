import { useState } from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  GlobeAmericasIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';

import Card from '../ui/Card';
import { Reveal } from '../ui/Motion';

const iconMap = [BriefcaseIcon, UserGroupIcon, GlobeAmericasIcon, AcademicCapIcon];

function BulletList({ title, items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-emerald-900">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeForWhom() {
  const { t } = useTranslation('home');
  const cards = t('forWhom.items', { returnObjects: true });
  const deepDive = t('deepDive.audience', { returnObjects: true });
  const labels = t('deepDive.labels', { returnObjects: true });
  const [openKey, setOpenKey] = useState(null);

  const handleToggle = (key) => {
    setOpenKey((previous) => (previous === key ? null : key));
  };

  return (
    <section className="bg-white py-16 sm:py-20" id="who-we-help">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('forWhom.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-slate-600">{t('forWhom.intro')}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = iconMap[index % iconMap.length];
            const audience = deepDive[card.key] || {};
            const isOpen = openKey === card.key;
            const contentId = `home-audience-${card.key}`;

            return (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <Card hoverEffect className="flex h-full flex-col text-left">
                  <Icon className="h-12 w-12 text-primary" aria-hidden="true" />
                  <h3 className="h3 mt-6">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>

                  {audience && (audience.scenarios || audience.approach || audience.questions) ? (
                    <div className="mt-6 border-t border-emerald-100 pt-4">
                      <button
                        type="button"
                        onClick={() => handleToggle(card.key)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        className="flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                      >
                        <span>{isOpen ? labels.close : labels.learnMore}</span>
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <Reveal className="reveal-1">
                          <div
                            id={contentId}
                            className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-left shadow-sm"
                          >
                            <h4 className="text-sm font-semibold text-emerald-900">
                              {audience.label || card.title}
                            </h4>
                            <BulletList title={labels.scenarios} items={audience.scenarios} />
                            <BulletList title={labels.approach} items={audience.approach} />
                            <BulletList title={labels.questions} items={audience.questions} />
                          </div>
                        </Reveal>
                      )}
                    </div>
                  ) : null}
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}