import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Reveal from '../ui/Reveal'; // 引入 Reveal 元件

/**
 * 首頁的 Hero 區塊
 */
export default function HomeHero() {
  // 載入 'home.json' 翻譯檔案
  const { t } = useTranslation('home');

  return (
    <section className="relative content-container section-padding min-h-[70vh] flex items-center">
      {/* 抽象 SVG 背景 (與原型一致) */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 300 Q 250 100, 500 300 T 1100 300" stroke="#4A6C56" fill="none" strokeWidth="2">
            <animate attributeName="d" values="M-100 300 Q 250 100, 500 300 T 1100 300; M-100 300 Q 250 500, 500 300 T 1100 300; M-100 300 Q 250 100, 500 300 T 1100 300" dur="15s" repeatCount="indefinite" />
          </path>
          <path d="M-100 350 Q 250 150, 500 350 T 1100 350" stroke="#4A6C56" fill="none" strokeWidth="1" opacity="0.5">
            <animate attributeName="d" values="M-100 350 Q 250 150, 500 350 T 1100 350; M-100 350 Q 250 450, 500 350 T 1100 350; M-100 350 Q 250 150, 500 350 T 1100 350" dur="20s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      
      <div className="relative z-10 max-w-3xl">
        {/*
          使用 <Reveal> 元件取代 class="reveal"
          並傳入 "reveal-1" 等 class 來實現交錯動畫
        */}
        <Reveal>
          <h1 className="h1">
            <span>{t('hero.title')}</span>
          </h1>
        </Reveal>
        
        <Reveal className="reveal-1">
          <p className="body-text text-text-secondary mt-6 text-xl">
            <span>{t('hero.subtitle')}</span>
          </p>
        </Reveal>
        
        <Reveal className="reveal-2">
          {/*
            將 <a href="#contact" data-page-link="contact">
            轉換為 <Link href="/contact">
          */}
          <Link href="/contact" className="btn-primary mt-10 inline-block">
            <span>{t('hero.cta')}</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}