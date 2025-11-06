import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Card from '../ui/Card';
import Reveal from '../ui/Reveal';

const founders = [
  {
    key: 'hc',
    image: '/images/founders/hao-cheng-tsai.svg',
  },
  {
    key: 'yl',
    image: '/images/founders/yi-ling-lai.svg',
  },
];

export default function HomeFounderIntro() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding bg-white">
      <div className="content-container">
        <Reveal>
          <h2 className="h2 text-center">
            <span>{t('founderIntro.title')}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {founders.map(({ key, image }, index) => (
            <Reveal key={key} className={`reveal-${index + 1}`}>
              <Card hoverEffect className="group text-center">
                <Image
                  src={image}
                  alt={t(`founderIntro.${key}.name`)}
                  width={176}
                  height={176}
                  className="mx-auto h-44 w-44 rounded-full border-4 border-emerald-100 bg-emerald-50 object-cover"
                />
                <h3 className="h3 mt-6">
                  <span>{t(`founderIntro.${key}.name`)}</span>
                </h3>
                <p className="body-text text-text-secondary">
                  <span>{t(`founderIntro.${key}.title`)}</span>
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Reveal className="reveal-3">
            <Link href="/about" className="btn-primary inline-block">
              <span>{t('founderIntro.cta')}</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}