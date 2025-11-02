import { useTranslation } from 'next-i18next';
import Card from '../ui/Card';     // 引入 Card 元件
import Reveal from '../ui/Reveal'; // 引入 Reveal 元件

/**
 * 首頁的 "For Whom" 區塊
 */
export default function HomeForWhom() {
  const { t } = useTranslation('home');

  // 卡片資料 (方便維護)
  const cards = [
    { 
      key: 'card1', 
      icon: (
        <svg className="h-12 w-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zM12 3v6m0 0l-3-3m3 3l3-3"></path></svg>
      ) 
    },
    { 
      key: 'card2', 
      icon: (
        <svg className="h-12 w-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zM12 3v5m0 0v5m0-5h5m-5 0H7"></path></svg>
      ) 
    },
    { 
      key: 'card3', 
      icon: (
        <svg className="h-12 w-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17.016a5 5 0 010-10m0 10v0m0 0a5 5 0 010-10m0 10a5 5 0 010-10m0 0a5 5 0 015 5m-5-5a5 5 0 00-5 5m5 5a5 5 0 015-5m-5 5a5 5 0 00-5-5m0 0h.01M15 17.016a5 5 0 010-10m0 10v0m0 0a5 5 0 010-10m0 10a5 5 0 010-10m0 0a5 5 0 015 5m-5-5a5 5 0 00-5 5m5 5a5 5 0 015-5m-5 5a5 5 0 00-5-5m0 0h.01"></path></svg>
      ) 
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="content-container">
        <Reveal>
          <h2 className="h2 text-center">
            <span>{t('forWhom.title')}</span>
          </h2>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {cards.map((card, index) => (
            // 使用 <Reveal> 實現交錯載入
            <Reveal key={card.key} className={`reveal-${index + 1}`}>
              {/* 使用 <Card> 元件，並傳入 props */}
              <Card hoverEffect={true} className="text-center">
                {card.icon}
                <h3 className="h3 mt-4">
                  <span>{t(`forWhom.${card.key}`)}</span>
                </h3>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}