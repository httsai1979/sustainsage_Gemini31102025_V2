import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Card from '../ui/Card';
import Reveal from '../ui/Reveal';

export default function HomeFounderIntro() {
  const { t } = useTranslation('home');
  const founders = t('founders.people', { returnObjects: true });

  return (
    <section className="section-padding bg-white" id="founders">
      <div className="content-container">
        <Reveal>
          <h2 className="h2 text-center">{t('founders.title')}</h2>
        </Reveal>
        <Reveal className="reveal-1">
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-slate-600">
            {t('founders.intro')}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {founders.map((founder, index) => (
            <Reveal key={founder.name} className={`reveal-${index + 2}`}>
              <Card hoverEffect className="h-full text-center">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={176}
                  height={176}
                  className="mx-auto h-44 w-44 rounded-full border-4 border-emerald-100 bg-emerald-50 object-cover"
                />
                <h3 className="h3 mt-6">{founder.name}</h3>
                <p className="text-sm font-medium text-emerald-800">{founder.role}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{founder.bio}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Reveal className="reveal-4">
            <Link href="/about" className="btn-primary inline-block">
              <span>{t('founders.cta')}</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}