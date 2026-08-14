import type { GetStaticProps } from 'next';
import { AirplaneTilt, ArrowsClockwise, BatteryCharging, Buildings, ChatCircleText, Path, Scales, ShieldChevron, Target, UserSwitch } from '@phosphor-icons/react';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, EditorialMedia, IconCardGrid, MediaSplit, NumberedList, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, SITE_URL } from '@/content/siteStrategy';

export default function Coaching({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const questions = zh
    ? ['總部與在地團隊各自認為我應該負責什麼？', '阻力正在保護什麼，又有哪些障礙其實來自系統？', '如何準備一場跨越階級與文化的困難對話？', '哪個小型實驗能產生採用證據，而不讓風險失控？', '如何在長期壓力下維持判斷力、動機與承載力？']
    : ['What do headquarters and the local team each expect me to own?', 'What is resistance protecting, and which barriers are created by the system?', 'How do I prepare for a difficult conversation across hierarchy and culture?', 'What small experiment could produce evidence of adoption without losing control of the risk?', 'How do I sustain judgement, motivation and capacity under prolonged pressure?'];
  const methods = zh
    ? ['深度提問與摘要', '選擇條件與系統脈絡整理', '困難對話預演', '低風險行動實驗與回顧']
    : ['Focused questions and summaries', 'Decision criteria and system mapping', 'Rehearsal for difficult conversations', 'Low-risk action experiments and review'];
  return (
    <>
      <PageHero eyebrow="COACHING" title={zh ? '處理跨境領導中不能迴避的問題' : 'Work on the issues cross-border leaders cannot avoid'} intro={zh ? '以你為決策者，釐清角色、權責、文化期待與下一步行動。' : 'A structured thinking partnership for role, authority, cultural expectations and action.'} cta={content.cta} meta={zh ? '先提交情境，不需要預約短通話。' : 'Start by describing the situation. No short-call booking.'} image="/images/editorial/coaching-conversation.webp" imageAlt={zh ? '兩位專業人士進行一對一 Coaching 對話' : 'Two professionals in a focused one-to-one coaching conversation'} />
      <ContentSection title={zh ? '這項 Coaching 如何工作' : 'How this coaching works'} tone="sage"><BulletList items={content.canHelp} /></ContentSection>
      <ContentSection title={zh ? '可以聚焦的三項變革能力' : 'Three change capabilities we can work on'}>
        <div className="grid gap-4 lg:grid-cols-12">
          {[
            { icon: ArrowsClockwise, title: zh ? '組織變革領導' : 'Organisational change leadership', body: zh ? '釐清變革理由、授權、角色、敘事與在地調整空間。' : 'Clarify the reason for change, mandate, roles, narrative and room for local adaptation.', span: 'lg:col-span-5' },
            { icon: ShieldChevron, title: zh ? '阻力與持續採用' : 'Resistance and sustainable adoption', body: zh ? '把阻力當作資訊，並用參與、對話、界線、小型實驗與強化機制推進採用。' : 'Treat resistance as information, then use involvement, dialogue, boundaries, experiments and reinforcement to move adoption.', span: 'lg:col-span-7' },
            { icon: BatteryCharging, title: zh ? '韌性與動機' : 'Resilience and motivation', body: zh ? '在長期變革中保護判斷品質、能量、真實自主與可持續承諾。' : 'Protect judgement, energy, credible agency and sustainable commitment through prolonged change.', span: 'lg:col-span-12' },
          ].map((item) => {
            const Icon = item.icon;
            return <article key={item.title} className={`rounded-[1.25rem] border border-[#173d2f]/10 bg-white p-7 ${item.span}`}><Icon className="h-7 w-7 text-[#27634e]" /><h3 className="mt-6 text-2xl font-medium tracking-[-.025em] text-[#173d2f]">{item.title}</h3><p className="mt-3 max-w-[62ch] leading-7 text-[#53675f]">{item.body}</p></article>;
          })}
        </div>
      </ContentSection>
      <ContentSection title={zh ? '四種常見的跨境領導情境' : 'Four cross-border leadership situations'}>
        <IconCardGrid items={content.situations.map((item, index) => ({ ...item, body: item.summary, icon: [Buildings, Path, ChatCircleText, AirplaneTilt][index] }))} />
      </ContentSection>
      <ContentSection tone="sand" title={zh ? '可以帶進會談的真實問題' : 'Real questions to bring'}><BulletList items={questions} /></ContentSection>
      <ContentSection title={content.programme.title} intro={content.programme.summary}><NumberedList items={content.programme.details} /><p className="mt-6 rounded-xl bg-emerald-50 p-5 font-semibold text-emerald-950">{content.programme.fees}</p></ContentSection>
      <ContentSection tone="sage" title={zh ? 'Coaching 方法' : 'Coaching approach'}>
        <div className="grid gap-4 md:grid-cols-2">
          {methods.map((method, index) => {
            const Icon = [ChatCircleText, Scales, Target, UserSwitch][index];
            return <div key={method} className="flex items-center gap-4 rounded-[1.25rem] border border-[#173d2f]/10 bg-white/70 p-6"><Icon className="h-7 w-7 shrink-0 text-[#2b6a53]" /><span className="text-lg leading-7 text-[#31483f]">{method}</span></div>;
          })}
        </div>
      </ContentSection>
      <ContentSection title={zh ? '變革領導工具如何輔助' : 'How change leadership tools support the work'}>
        <MediaSplit reverse media={<EditorialMedia src="/images/editorial/reflection-tools.webp" alt={zh ? '筆記本、指南針與反思工具' : 'A notebook, compass and tactile reflection tools'} />}>
          <p className="text-lg leading-8 text-[#40554c]">{zh ? '八份非 AI 變革領導工作表可在會談前或會談之間，協助你整理情境、阻力、決策權、對話、採用、韌性與動機。你的輸入只留在瀏覽器內。' : 'Eight non-AI change leadership worksheets help organise context, resistance, decision rights, conversations, adoption, resilience and motivation before or between sessions. Entries stay in your browser.'}</p>
        </MediaSplit>
      </ContentSection>
      <ContentSection tone="sand" title={zh ? '能做與不能做的事' : 'What coaching can and cannot do'}><BulletList items={content.boundaries} /></ContentSection>
      <ContentSection title="FAQ">
        <dl className="grid gap-8">
          {(zh ? [
            ['如何開始合作？', '先提交保密合作詢問，說明角色、組織脈絡與問題。若議題適合，SustainSage 會以電子郵件提出下一步與書面範圍。'],
            ['會談可以用中文嗎？', '可以。會談可使用英文或中文。'],
            ['企業付款時會與公司分享什麼？', 'Coaching 內容仍以保密為原則。任何 Sponsor 對齊或結束回顧的範圍，都必須在開始前由相關各方書面確認。'],
            ['可以保證特定商業或職涯結果嗎？', '不能。Coaching 不保證特定結果，你仍是決策與行動的負責人。'],
          ] : [
            ['How does an enquiry begin?', 'Describe the role, organisational context and issue in the confidential enquiry form. If the work appears suitable, SustainSage will propose next steps and a written scope by email.'],
            ['Can sessions be held in Chinese?', 'Yes. Sessions can be held in English or Chinese.'],
            ['What is shared when an organisation pays?', 'Coaching content remains confidential. Any sponsor alignment or closing review must be agreed in writing by the relevant parties before work begins.'],
            ['Can you guarantee a business or career outcome?', 'No. Coaching cannot guarantee a particular outcome. You remain responsible for decisions and action.'],
          ]).map(([question, answer]) => <div key={question} className="border-b border-emerald-950/10 pb-7"><dt className="text-xl font-semibold text-slate-950">{question}</dt><dd className="mt-3 leading-7 text-slate-650">{answer}</dd></div>)}
        </dl>
      </ContentSection>
      <ContentSection tone="sage" title={zh ? '保密、資料與專業邊界' : 'Confidentiality, data and professional boundaries'}><p className="text-lg leading-8 text-slate-750">{zh ? '正式合作會說明保密範圍、保障義務、取消安排、資料保存與查閱刪除方式。若出現重大安全風險，保密可能依法或基於 safeguarding 責任受到限制。' : 'Before paid work begins, written terms explain confidentiality, safeguarding limits, cancellation arrangements, data retention and access or deletion requests. Confidentiality may be limited where law or a serious safeguarding concern requires action.'}</p></ContentSection>
      <PrimaryCTA title={zh ? '讓我先理解你正在承擔什麼' : 'Let me understand what you are carrying'} body={zh ? '不需要把問題包裝成完美的 Coaching 題目。請直接說明角色、公司脈絡與目前最重要的問題。' : 'You do not need to package the issue as a perfect coaching goal. Describe the role, company context and what is at stake.'} label={content.cta} />
    </>
  );
}

Coaching.getLayout = (page) => {
  const content = getSiteContent(page.props.locale);
  const faq = page.props.locale === 'zh-TW'
    ? [{ '@type': 'Question', name: '如何開始合作？', acceptedAnswer: { '@type': 'Answer', text: '先提交保密合作詢問。若議題適合，SustainSage 會以電子郵件提出下一步與書面範圍。' } }]
    : [{ '@type': 'Question', name: 'How does an enquiry begin?', acceptedAnswer: { '@type': 'Answer', text: 'Start by submitting a confidential enquiry. If the work appears suitable, SustainSage will propose next steps and a written scope by email.' } }];
  const schema = [{ '@context': 'https://schema.org', '@type': 'Service', '@id': `${SITE_URL}/coaching#service`, name: content.programme.title, provider: { '@id': `${SITE_URL}/#organisation` }, areaServed: 'United Kingdom', availableLanguage: ['English', 'Chinese'] }, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq }];
  return <MainLayout seo={{ title: content.programme.title, description: content.programme.summary, schema }}>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
