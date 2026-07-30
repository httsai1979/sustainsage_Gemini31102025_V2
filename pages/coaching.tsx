import type { GetStaticProps } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { BulletList, ContentSection, NumberedList, PageHero, PrimaryCTA } from '@/components/site/ContentPage';
import { getSiteContent, normaliseLocale, SITE_URL } from '@/content/siteStrategy';

export default function Coaching({ locale }: { locale: string }) {
  const content = getSiteContent(locale);
  const zh = locale === 'zh-TW';
  const questions = zh
    ? ['我真正想改變的是什麼？', '哪些條件不能再被忽略？', '如何準備一場困難對話？', '哪個小型實驗能讓我取得新資訊？']
    : ['What do I genuinely want to change?', 'Which conditions can no longer be ignored?', 'How do I prepare for a difficult conversation?', 'What small experiment could give me new information?'];
  const methods = zh
    ? ['深度提問與摘要', '選擇條件與系統脈絡整理', '困難對話預演', '低風險行動實驗與回顧']
    : ['Focused questions and summaries', 'Decision criteria and system mapping', 'Rehearsal for difficult conversations', 'Low-risk action experiments and review'];
  return (
    <>
      <PageHero eyebrow="COACHING" title={zh ? '一套服務，處理真實的職涯轉換' : 'One service for real career transitions'} intro={zh ? 'Coaching 是一段有結構、以你為決策者的思考夥伴關係。它不替你下答案，而是幫助你看清處境、選擇與下一步。' : 'Coaching is a structured thinking partnership in which you remain the decision-maker. It does not supply an answer; it helps you see the situation, choices and next step more clearly.'} cta={content.cta} />
      <ContentSection title={zh ? 'Coaching 是什麼' : 'What coaching is'} tone="sage"><BulletList items={content.canHelp} /></ContentSection>
      <ContentSection title={zh ? '四種適用情境' : 'Four situations where it may help'}>
        <div className="grid gap-5 sm:grid-cols-2">{content.situations.map((item) => <article id={item.id} key={item.id} className="scroll-mt-28 rounded-[1.25rem] bg-white p-7 shadow-[0_12px_34px_rgba(28,55,44,.07)]"><h3 className="text-xl font-semibold text-slate-950">{item.title}</h3><p className="mt-3 leading-7 text-slate-650">{item.summary}</p></article>)}</div>
      </ContentSection>
      <ContentSection tone="sand" title={zh ? '可以帶進會談的問題' : 'Questions you can bring'}><BulletList items={questions} /></ContentSection>
      <ContentSection title={content.programme.title} intro={content.programme.summary}><NumberedList items={content.programme.details} /><p className="mt-6 rounded-xl bg-emerald-50 p-5 font-semibold text-emerald-950">{content.programme.fees}</p></ContentSection>
      <ContentSection tone="sage" title={zh ? 'Coaching 方法' : 'Coaching approach'}><BulletList items={methods} /></ContentSection>
      <ContentSection title={zh ? '反思工具如何輔助' : 'How reflection tools support the work'}><p className="text-lg leading-8 text-slate-750">{zh ? '七項非 AI 工具可在會談前或會談之間，協助你記錄觀察、釐清價值與設計小型行動。工具不會把資料傳送給 SustainSage，也不取代專業服務。' : 'Seven non-AI tools can help you record observations, clarify values and design small actions before or between sessions. They do not send entries to SustainSage and do not replace professional care.'}</p></ContentSection>
      <ContentSection tone="sand" title={zh ? '能做與不能做的事' : 'What coaching can—and cannot—do'}><BulletList items={content.boundaries} /></ContentSection>
      <ContentSection title="FAQ">
        <dl className="grid gap-8">
          {(zh ? [
            ['20 分鐘對談是免費 Coaching 嗎？', '不是。它只用來確認議題是否適合 Coaching，以及雙方是否適合合作。'],
            ['會談可以用中文嗎？', '可以。會談可使用英文或中文。'],
            ['可以保證找到工作或升遷嗎？', '不能。Coaching 不保證特定結果，你仍是決策與行動的負責人。'],
            ['如果我要取消或改期呢？', '正式合作前會提供書面條款；目前政策細節仍需最終確認。'],
          ] : [
            ['Is the 20-minute conversation free coaching?', 'No. It only checks whether the topic suits coaching and whether working together feels appropriate.'],
            ['Can sessions be held in Chinese?', 'Yes. Sessions can be held in English or Chinese.'],
            ['Can you guarantee a job or promotion?', 'No. Coaching cannot guarantee a particular outcome; you remain responsible for decisions and action.'],
            ['What if I need to cancel or reschedule?', 'Written terms are provided before paid work begins; the final policy details still require confirmation.'],
          ]).map(([question, answer]) => <div key={question} className="border-b border-emerald-950/10 pb-7"><dt className="text-xl font-semibold text-slate-950">{question}</dt><dd className="mt-3 leading-7 text-slate-650">{answer}</dd></div>)}
        </dl>
      </ContentSection>
      <ContentSection tone="sage" title={zh ? '保密、資料與專業邊界' : 'Confidentiality, data and professional boundaries'}><p className="text-lg leading-8 text-slate-750">{zh ? '正式合作會說明保密範圍、保障義務、取消安排、資料保存與查閱刪除方式。若出現重大安全風險，保密可能依法或基於 safeguarding 責任受到限制。' : 'Before paid work begins, written terms explain confidentiality, safeguarding limits, cancellation arrangements, data retention and access or deletion requests. Confidentiality may be limited where law or a serious safeguarding concern requires action.'}</p></ContentSection>
      <PrimaryCTA title={zh ? '先確認這套方式是否適合你' : 'First check whether this way of working fits'} body={zh ? '不需要先把所有問題整理好。帶著目前最重要的一件事來談即可。' : 'You do not need to organise every question first. Bring the one issue that matters most now.'} label={content.cta} />
    </>
  );
}

Coaching.getLayout = (page) => {
  const content = getSiteContent(page.props.locale);
  const faq = page.props.locale === 'zh-TW'
    ? [{ '@type': 'Question', name: '20 分鐘對談是免費 Coaching 嗎？', acceptedAnswer: { '@type': 'Answer', text: '不是。它只用來確認議題與適配度。' } }]
    : [{ '@type': 'Question', name: 'Is the 20-minute conversation free coaching?', acceptedAnswer: { '@type': 'Answer', text: 'No. It checks the topic and mutual fit.' } }];
  const schema = [{ '@context': 'https://schema.org', '@type': 'Service', '@id': `${SITE_URL}/coaching#service`, name: content.programme.title, provider: { '@id': `${SITE_URL}/#organisation` }, areaServed: 'United Kingdom', availableLanguage: ['English', 'Chinese'] }, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq }];
  return <MainLayout seo={{ title: content.programme.title, description: content.programme.summary, schema }}>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { locale: normaliseLocale(locale) } });
