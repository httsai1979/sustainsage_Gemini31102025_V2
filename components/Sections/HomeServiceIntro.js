import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Reveal from '../ui/Reveal'; // 引入 Reveal 元件

/**
 * 首頁的 "Service Intro" 區塊
 */
export default function HomeServiceIntro() {
  const { t } = useTranslation('home');

  return (
    <section className="section-padding">
      <div className="content-container text-center max-w-3xl mx-auto">
        <Reveal>
          <h2 className="h2">
            <span>{t('serviceIntro.title')}</span>
          </h2>
        </Reveal>
        
        <Reveal className="reveal-1">
          <p className="body-text text-text-secondary mt-6 text-xl">
            <span>{t('serviceIntro.subtitle')}</span>
          </p>
        </Reveal>

        <Reveal className="reveal-2">
          {/*
            將 <a href="#service" data-page-link="service">
            轉換為 <Link href="/service">
          */}
          <Link href="/service" className="btn-secondary mt-10 inline-block">
            <span>{t('serviceIntro.cta')}</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}