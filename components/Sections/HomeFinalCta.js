import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import Reveal from '../ui/Reveal';

export default function HomeFinalCta() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding bg-emerald-50">
      <div className="content-container">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="h2">{t('cta.title')}</h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-emerald-900">{t('cta.body')}</p>
          </Reveal>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Reveal className="reveal-2">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
                {t('cta.primaryCta')}
              </Link>
            </Reveal>
            <Reveal className="reveal-3">
              <Link href="/services" className="btn-secondary inline-flex items-center justify-center">
                {t('cta.secondaryCta')}
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
