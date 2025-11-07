import { useTranslation } from 'next-i18next';

import Reveal from '../ui/Reveal';

export default function HomeICFBoundaries() {
  const { t } = useTranslation('home');
  const items = t('icfBoundaries.items', { returnObjects: true });

  return (
    <section className="section-padding bg-emerald-900" id="icf-boundaries">
      <div className="content-container text-emerald-50">
        <Reveal>
          <h2 className="h2 text-center">{t('icfBoundaries.title')}</h2>
        </Reveal>
        <Reveal className="reveal-1">
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-emerald-100">
            {t('icfBoundaries.intro')}
          </p>
        </Reveal>

        <ul className="mx-auto mt-10 max-w-4xl space-y-4 text-sm leading-6 text-emerald-50">
          {items.map((item, index) => (
            <Reveal key={item} className={`reveal-${index + 2}`}>
              <li className="rounded-2xl border border-emerald-500/20 bg-emerald-800/40 p-5">
                {item}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
