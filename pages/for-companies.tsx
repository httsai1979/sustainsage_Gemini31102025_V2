import type { GetStaticProps } from 'next';
import { Buildings, FileText, LockKey, UsersThree } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, EditorialMedia, IconCardGrid, MediaSplit, NumberedList, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, SITE_URL } from '@/content/siteStrategy';

export default function ForCompanies({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';

  const buyerContexts = zh
    ? [
        { title: '精簡的英國營運單位', body: '亞洲總部在英國的團隊規模不一定大，但 Country Manager 或關鍵主管承擔高度責任。' },
        { title: '關鍵外派任務', body: '主管正在準備抵達英國、建立角色，或需要在任務中重新處理總部與在地期待。' },
        { title: '角色或責任轉換', body: '一位重要管理者剛被升任、回任、接管新市場，或處於需要穩定判斷的轉折點。' },
        { title: '跨文化團隊摩擦', body: '問題不只是溝通技巧，而是權責、速度、回報方式與信任如何被不同地理解。' },
      ]
    : [
        { title: 'Lean UK operations', body: 'An Asian-headquartered company may have a small UK team while its country or functional leader carries substantial responsibility.' },
        { title: 'Critical assignments', body: 'A leader is preparing to arrive, establish authority, or reset headquarters and local expectations during an assignment.' },
        { title: 'Role transitions', body: 'A key manager has been promoted, repatriated, given a new market, or reached a point that needs steadier judgement.' },
        { title: 'Cross-cultural team friction', body: 'The issue is not only communication style. It involves authority, pace, reporting expectations and how trust is formed.' },
      ];

  const process = zh
    ? [
        '企業 Sponsor 或接受 Coaching 的主管先提交保密合作詢問。',
        'SustainSage 閱讀情境後，確認 Coaching 是否適合，並提出合作範圍與費用。',
        '開始前書面確認目標、保密邊界、Sponsor 參與方式與資料處理。',
        'Coaching 內容維持保密，任何回顧只限事前同意的高層次範圍。',
      ]
    : [
        'The sponsor or coaching client submits a confidential enquiry.',
        'SustainSage reviews the context, confirms whether coaching is suitable, and proposes scope and fees.',
        'Objectives, confidentiality, sponsor involvement and data handling are agreed in writing before work begins.',
        'Coaching content remains confidential. Any review is limited to the high-level scope agreed in advance.',
      ];

  return (
    <>
      <PageHero
        eyebrow={zh ? '企業合作' : 'FOR COMPANIES'}
        title={zh ? '支持在英國與亞洲之間承擔責任的關鍵主管' : 'Support leaders across UK-Asia operations'}
        intro={zh ? '為 SME 與亞洲總部的精簡英國團隊，提供具保密邊界的跨境領導 Coaching。' : 'Confidential cross-border leadership coaching for SMEs and lean UK teams of Asian-headquartered companies.'}
        cta={content.cta}
        meta={zh ? '適合由企業 Sponsor、HR 或主管本人提交。' : 'Suitable for sponsors, HR leaders or the coaching client.'}
        image="/images/editorial/career-hero.webp"
        imageAlt={zh ? '在英國工作的跨境企業主管' : 'A cross-border business leader working in the UK'}
      />

      <ContentSection title={zh ? '企業通常在這些時刻尋求支援' : 'When companies usually seek support'}>
        <IconCardGrid items={buyerContexts.map((item, index) => ({ ...item, icon: [Buildings, UsersThree, FileText, LockKey][index] }))} />
      </ContentSection>

      <ContentSection tone="sage" title={zh ? '付款者、Sponsor 與 Coaching 客戶需要清楚分開' : 'Payer, sponsor and coaching client are distinct roles'}>
        <MediaSplit
          reverse
          media={<EditorialMedia src="/images/editorial/coaching-conversation.webp" alt={zh ? '企業贊助的一對一專業 Coaching 對話' : 'A confidential organisation-sponsored coaching conversation'} />}
        >
          <BulletList items={zh ? [
            '付款不代表取得 Coaching 對話內容。',
            'Sponsor 可以參與目標對齊，但不能在事後擴張資訊範圍。',
            '接受 Coaching 的主管必須知道並同意任何回顧安排。',
            '若 Coaching 不是合適介入方式，SustainSage 會直接說明。',
          ] : [
            'Payment does not provide access to coaching conversations.',
            'A sponsor may align objectives but cannot expand the information boundary afterwards.',
            'The coaching client must understand and agree to any review arrangement.',
            'If coaching is not the right intervention, SustainSage will say so directly.',
          ]} />
        </MediaSplit>
      </ContentSection>

      <ContentSection title={zh ? '企業合作流程' : 'How organisation-sponsored work begins'} intro={zh ? '先理解情境與三方關係，再承諾合作。' : 'The context and three-way relationship are understood before any commitment.'}>
        <NumberedList items={process} />
      </ContentSection>

      <ContentSection tone="sand" title={zh ? '這項服務的專業邊界' : 'Professional boundaries'}>
        <BulletList items={content.boundaries} />
      </ContentSection>

      <PrimaryCTA
        title={zh ? '說明你希望支持哪一位主管，以及為什麼是現在' : 'Describe who needs support and why now'}
        body={zh ? '請提供角色、公司脈絡、UK-Asia 關係與希望處理的問題。不要傳送績效檔案、醫療紀錄或其他不必要的敏感資料。' : 'Share the role, company context, UK-Asia relationship and issue at stake. Do not send performance files, medical records or unnecessary sensitive data.'}
        label={content.cta}
      />
    </>
  );
}

ForCompanies.getLayout = (page) => {
  const zh = page.props.locale === 'zh-TW';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/for-companies#service`,
    name: zh ? '企業贊助跨境領導 Coaching' : 'Organisation-sponsored cross-border leadership coaching',
    provider: { '@id': `${SITE_URL}/#organisation` },
    areaServed: 'United Kingdom',
    availableLanguage: ['English', 'Chinese'],
  };
  return <MainLayout seo={{ title: zh ? '企業合作與外派主管 Coaching' : 'Coaching for companies and international assignees', description: zh ? '為 SME 與亞洲總部的精簡英國團隊提供跨境領導 Coaching。' : 'Cross-border leadership coaching for SMEs and lean UK teams of Asian-headquartered companies.', schema }}>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
