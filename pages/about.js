import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// 引入 UI 元件
import Reveal from '../components/ui/Reveal';
import Card from '../components/ui/Card';
import nextI18NextConfig from '../next-i18next.config.js';

/**
 * 關於我們 (About Us)
 * 位於 /about
 */
export default function About() {
  // 載入 'about.json' 翻譯檔案
  const { t } = useTranslation('about');

  return (
    <>
      {/* 1. 設定此頁面的 <Head> 標籤 */}
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>

      {/* === 移植 <div id="page-about"> 內容 === */}

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

      {/* 創辦人介紹 (Founders) */}
      <section className="section-padding">
        <div className="content-container">
          <Reveal>
            <h2 className="h2 text-center mb-12">
              <span>{t('team.title')}</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Hao-Cheng Tsai */}
            <Reveal className="reveal-1">
              <Image
                src="https://placehold.co/600x400/F5F5F7/1D1D1F?text=Hao-Cheng+Tsai"
                alt={t('team.hc.name')}
                width={600}
                height={400}
                className="rounded-2xl w-full h-auto" // 保持寬高比
              />
              <h3 className="h3 mt-6">
                <span>{t('team.hc.name')}</span>
              </h3>
              <p className="body-text text-primary font-semibold">
                <span>{t('team.hc.title')}</span>
              </p>
              <p className="body-text mt-4">
                <span>{t('team.hc.bio')}</span>
              </p>
              <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-text-secondary">
                <span>{t('team.hc.quote')}</span>
              </blockquote>
            </Reveal>
            
            {/* Yi-Ling Lai */}
            <Reveal className="reveal-2">
              <Image
                src="https://placehold.co/600x400/F5F5F7/1D1D1F?text=Yi-Ling+Lai"
                alt={t('team.yl.name')}
                width={600}
                height={400}
                className="rounded-2xl w-full h-auto" // 保持寬高比
              />
              <h3 className="h3 mt-6">
                <span>{t('team.yl.name')}</span>
              </h3>
              <p className="body-text text-primary font-semibold">
                <span>{t('team.yl.title')}</span>
              </p>
              <p className="body-text mt-4">
                <span>{t('team.yl.bio')}</span>
              </p>
              <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-text-secondary">
                <span>{t('team.yl.quote')}</span>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>
      
      {/* 我們的承諾 (Our Commitment) */}
      <section className="section-padding bg-white">
        <div className="content-container">
          <Reveal>
            <h2 className="h2 text-center mb-12">
              <span>{t('commitment.title')}</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Commitment Cards */}
            <Reveal className="reveal-1">
              <Card className="text-center">
                <svg className="h-10 w-10 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <h3 className="h3 mt-4 text-lg">
                  <span>{t('commitment.card1')}</span>
                </h3>
              </Card>
            </Reveal>
            <Reveal className="reveal-2">
              <Card className="text-center">
                <svg className="h-10 w-10 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <h3 className="h3 mt-4 text-lg">
                  <span>{t('commitment.card2')}</span>
                </h3>
              </Card>
            </Reveal>
            <Reveal className="reveal-3">
              <Card className="text-center">
                <svg className="h-10 w-10 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2"></path></svg>
                <h3 className="h3 mt-4 text-lg">
                  <span>{t('commitment.card3')}</span>
                </h3>
              </Card>
            </Reveal>
            <Reveal className="reveal-4">
              <Card className="text-center">
                <svg className="h-10 w-10 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12l-4-4-4 4m0 6l4 4 4-4"></path></svg>
                <h3 className="h3 mt-4 text-lg">
                  <span>{t('commitment.card4')}</span>
                </h3>
              </Card>
            </Reveal>
          </div>
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
          'about', // 用於此頁面內容
        ],
        nextI18NextConfig,
      )),
    },
  };
}
