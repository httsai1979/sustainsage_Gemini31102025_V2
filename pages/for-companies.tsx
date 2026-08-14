import type { GetStaticProps } from 'next';
import { ArrowsClockwise, Buildings, ShieldChevron, UsersThree } from '@phosphor-icons/react';
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
        { title: '組織變革與在地採用', body: '主管需要把總部策略轉化為在地可行的新行為、責任與營運做法。' },
        { title: '阻力與變革疲勞', body: '表面同意沒有形成行動，或長期改變正在削弱動機、韌性與執行品質。' },
      ]
    : [
        { title: 'Lean UK operations', body: 'An Asian-headquartered company may have a small UK team while its country or functional leader carries substantial responsibility.' },
        { title: 'Critical assignments', body: 'A leader is preparing to arrive, establish authority, or reset headquarters and local expectations during an assignment.' },
        { title: 'Organisational change and local adoption', body: 'A leader must translate headquarters strategy into workable new behaviour, ownership and operating practice.' },
        { title: 'Resistance and change fatigue', body: 'Formal agreement is not becoming action, or prolonged change is weakening motivation, resilience and execution quality.' },
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
        <IconCardGrid items={buyerContexts.map((item, index) => ({ ...item, icon: [Buildings, UsersThree, ArrowsClockwise, ShieldChevron][index] }))} />
      </ContentSection>

      <ContentSection tone="sand" title={zh ? '支援變革領導者，不承接整個變革專案' : 'Support the change leader without taking over the programme'}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.25rem] border border-[#173d2f]/10 bg-white p-7 sm:p-9">
            <h3 className="text-2xl font-medium tracking-[-.025em] text-[#173d2f]">{zh ? 'Coaching 可以處理' : 'Coaching can support'}</h3>
            <BulletList items={zh ? [
              '變革授權、角色、利害關係人與決策權的釐清。',
              '阻力來源、文化假設與在地採用障礙的理解。',
              '變革敘事、困難對話與低風險採用實驗的準備。',
              '主管在長期壓力下的韌性、動機與判斷品質。',
            ] : [
              'Clarity on the change mandate, roles, stakeholders and decision rights.',
              'Understanding resistance, cultural assumptions and local adoption barriers.',
              'Preparation for change narratives, difficult conversations and low-risk adoption experiments.',
              'The leader’s resilience, motivation and judgement under sustained pressure.',
            ]} />
          </div>
          <div className="rounded-[1.25rem] border border-[#173d2f]/10 bg-[#eceeea] p-7 sm:p-9">
            <h3 className="text-2xl font-medium tracking-[-.025em] text-[#31483f]">{zh ? '不屬於這項服務' : 'Outside this service'}</h3>
            <BulletList items={zh ? [
              '代替管理團隊擁有轉型策略、PMO 或整體交付責任。',
              '設計組織架構、裁員方案、員工諮詢程序或法律文件。',
              '代寫內部溝通、操控員工認同，或把合理疑慮視為態度問題。',
              '向 Sponsor 揭露 Coaching 對話內容。',
            ] : [
              'Owning the transformation strategy, PMO or programme delivery for management.',
              'Designing organisation structures, redundancy plans, employee consultation or legal documents.',
              'Writing internal communications, manufacturing buy-in or treating legitimate concerns as attitude problems.',
              'Disclosing coaching conversations to the sponsor.',
            ]} />
          </div>
        </div>
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
