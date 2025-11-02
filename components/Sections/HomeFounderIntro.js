import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Card from '../ui/Card';     // 引入 Card 元件
import Reveal from '../ui/Reveal'; // 引入 Reveal 元件

/**
 * 首頁的 "Founders Intro" 區塊
 */
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

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          
          {/* Hao-Cheng Tsai */}
          <Reveal className="reveal-1">
            <Card hoverEffect={true} className="text-center group">
              <Image
                src="https://placehold.co/400x400/F5F5F7/1D1D1F?text=Hao-Cheng+Tsai"
                alt={t('founderIntro.hc.name')} // 使用翻譯作為 Alt 文字
                width={160}  // w-40 -> 10rem -> 160px
                height={160} // h-40 -> 10rem -> 160px
                className="w-40 h-40 rounded-full mx-auto object-cover"
              />
              <h3 className="h3 mt-6">
                <span>{t('founderIntro.hc.name')}</span>
              </h3>
              <p className="body-text text-text-secondary">
                <span>{t('founderIntro.hc.title')}</span>
              </p>
            </Card>
          </Reveal>

          {/* Yi-Ling Lai */}
          <Reveal className="reveal-2">
            <Card hoverEffect={true} className="text-center group">
              <Image
                src="https://placehold.co/400x400/F5F5F7/1D1D1F?text=Yi-Ling+Lai"
                alt={t('founderIntro.yl.name')} // 使用翻譯作為 Alt 文字
                width={160}
                height={160}
                className="w-40 h-40 rounded-full mx-auto object-cover"
              />
              <h3 className="h3 mt-6">
                <span>{t('founderIntro.yl.name')}</span>
              </h3>
              <p className="body-text text-text-secondary">
                <span>{t('founderIntro.yl.title')}</span>
              </p>
            </Card>
          </Reveal>
        </div>

        <div className="text-center mt-12">
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