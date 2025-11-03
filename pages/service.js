import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// 引入 UI 元件
import Reveal from '../components/ui/Reveal';
import FlipCard from '../components/ui/FlipCard'; // **使用我們剛建立的元件**
import nextI18NextConfig from '../next-i18next.config.js';

/**
 * 服務內容 (Service)
 * 位於 /service
 */
export default function Service() {
  // 載入 'service.json' 翻譯檔案
  const { t } = useTranslation('service');

  return (
    <>
      {/* 1. 設定此頁面的 <Head> 標籤 */}
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>

      {/* === 移植 <div id="page-service"> 內容 === */}

      {/* Hero 區 */}
      <section className="section-padding bg-white">
        <div className="content-container text-center max-w-3xl mx-auto">
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
        </div>
      </section>

      {/* 合作方式 (How We Work) */}
      <section className="section-padding">
        <div className="content-container">
          <Reveal>
            <h2 className="h2 text-center mb-12">
              <span>{t('howWeWork.title')}</span>
            </h2>
          </Reveal>
          <div className="relative flex flex-col md:flex-row justify-between items-center">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary opacity-30 -translate-y-1/2"></div>
            
            {/* Step 1 */}
            <Reveal className="relative text-center w-full md:w-1/3 p-4 reveal-1">
              <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto shadow-lg border-4 border-background">
                <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.934L3 21l1.755-4.076A9.003 9.003 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <h3 className="h3 mt-4 text-lg">
                <span>{t('howWeWork.step1.title')}</span>
              </h3>
              <p className="body-text mt-2 caption">
                <span>{t('howWeWork.step1.desc')}</span>
              </p>
            </Reveal>

            {/* Step 2 */}
            <Reveal className="relative text-center w-full md:w-1/3 p-4 reveal-2">
              <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto shadow-lg border-4 border-background">
                <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-.553-.894L15 2m0 15V2l-6 3"></path></svg>
              </div>
              <h3 className="h3 mt-4 text-lg">
                <span>{t('howWeWork.step2.title')}</span>
              </h3>
              <p className="body-text mt-2 caption">
                <span>{t('howWeWork.step2.desc')}</span>
              </p>
            </Reveal>

            {/* Step 3 */}
            <Reveal className="relative text-center w-full md:w-1/3 p-4 reveal-3">
              <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto shadow-lg border-4 border-background">
                <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              </div>
              <h3 className="h3 mt-4 text-lg">
                <span>{t('howWeWork.step3.title')}</span>
              </h3>
              <p className="body-text mt-2 caption">
                <span>{t('howWeWork.step3.desc')}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 專注領域 (Focus Areas) */}
      <section className="section-padding bg-white">
        <div className="content-container">
          <Reveal>
            <h2 className="h2 text-center mb-12">
              <span>{t('focusAreas.title')}</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">

            {/* **使用 FlipCard 元件** */}
            
            {/* Flip Card 1 */}
            <FlipCard
              className="reveal reveal-1"
              frontContent={(
                <>
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v1m-16 0l8 8 8-8m-16 0v12a2 2 0 002 2h12a2 2 0 002-2V6"></path></svg>
                  <h3 className="h3 mt-4">
                    <span>{t('focusAreas.card1.title')}</span>
                  </h3>
                </>
              )}
              backContent={(
                <p className="body-text">
                  <span>{t('focusAreas.card1.desc')}</span>
                </p>
              )}
            />

            {/* Flip Card 2 */}
            <FlipCard
              className="reveal reveal-2"
              frontContent={(
                <>
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.657 15.657l-2.829-2.828M18 12.828l-2.828 2.828"></path></svg>
                  <h3 className="h3 mt-4">
                    <span>{t('focusAreas.card2.title')}</span>
                  </h3>
                </>
              )}
              backContent={(
                <p className="body-text">
                  <span>{t('focusAreas.card2.desc')}</span>
                </p>
              )}
            />
            
            {/* Flip Card 3 */}
            <FlipCard
              className="reveal reveal-3"
              frontContent={(
                <>
                  <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  <h3 className="h3 mt-4">
                    <span>{t('focusAreas.card3.title')}</span>
                  </h3>
                </>
              )}
              backContent={(
                <p className="body-text">
                  <span>{t('focusAreas.card3.desc')}</span>
                </p>
              )}
            />
          </div>
        </div>
      </section>
      
      {/* CTA 區 */}
      <section className="section-padding">
        <div className="content-container text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="h2">
              <span>{t('cta.title')}</span>
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <Link href="/contact" className="btn-primary mt-10 inline-block">
              <span>{t('cta.button')}</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* === 移植結束 === */}
    </>
  );
}

/**
 * 5. SSG - 載入此頁面所需的翻譯檔案
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        [
          'common', // 用於 Header/Footer
          'service', // 用於此頁面內容
        ],
        nextI18NextConfig,
      )),
    },
  };
}
