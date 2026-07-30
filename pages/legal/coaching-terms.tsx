import type { GetStaticProps } from 'next';
import LegalPage, { legalLayout } from '@/components/legal/LegalPage';
import { normaliseLocale } from '@/content/siteStrategy';
export default function CoachingTerms(props) { return <LegalPage {...props} />; }
CoachingTerms.getLayout = legalLayout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const resolved = normaliseLocale(locale); const zh = resolved === 'zh-TW';
  return { props: { locale: resolved, title: zh ? 'Coaching 條款' : 'Coaching Terms', summary: zh ? '正式合作前會以書面確認的核心商務安排。' : 'Core commercial arrangements confirmed in writing before paid work begins.', sections: zh ? [
    { title: '服務', paragraphs: ['職涯轉換 Coaching 計畫包含六次 60 分鐘一對一線上會談，通常在 12–16 週內完成。計畫細節與費用於適配對談說明。'] },
    { title: '取消、改期與退款', paragraphs: ['最終通知期限、逾期取消、改期次數與退款安排仍需本人確認。在確認前不會向客戶呈現未核准承諾；正式合作以雙方簽署條款為準。'] },
    { title: '責任', paragraphs: ['客戶對自身決定與行動負責。Coaching 不保證工作、升遷、收入、信心或其他特定成果。'] },
    { title: '終止', paragraphs: ['任何一方可依書面合約終止合作。若需求超出 Coaching 範圍，可能暫停並建議合適的專業支援。'] },
  ] : [
    { title: 'Service', paragraphs: ['The Career Transition Coaching Programme includes six 60-minute one-to-one online sessions, normally over 12–16 weeks. Details and fees are discussed during the fit conversation.'] },
    { title: 'Cancellation, rescheduling and refunds', paragraphs: ['The final notice period, late-cancellation treatment, rescheduling allowance and refund arrangement require owner confirmation. No unapproved promise is presented; signed terms govern paid work.'] },
    { title: 'Responsibility', paragraphs: ['The client remains responsible for decisions and actions. Coaching does not guarantee employment, promotion, income, confidence or another particular result.'] },
    { title: 'Ending the work', paragraphs: ['Either party may end the work under the written agreement. If a need falls outside coaching, work may pause and appropriate professional support may be suggested.'] },
  ] } };
};
