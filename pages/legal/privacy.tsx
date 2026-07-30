import type { GetStaticProps } from 'next';
import LegalPage, { legalLayout } from '@/components/legal/LegalPage';
import { normaliseLocale, CONTACT_EMAIL } from '@/content/siteStrategy';

export default function Privacy(props) { return <LegalPage {...props} />; }
Privacy.getLayout = legalLayout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const resolved = normaliseLocale(locale); const zh = resolved === 'zh-TW';
  return { props: { locale: resolved, title: zh ? '隱私政策' : 'Privacy Policy', summary: zh ? '說明聯絡與 Coaching 過程中的個人資料如何被使用。' : 'How personal information is used when you enquire about or receive coaching.', sections: zh ? [
    { title: '資料控制者', paragraphs: [`SUSTAINSAGE GROUP LTD 是本服務的資料控制者。隱私問題請寄至 ${CONTACT_EMAIL}。`] },
    { title: '收集與用途', bullets: ['聯絡表單收集姓名、電子郵件、偏好語言、轉換情境與你主動提供的說明。', '資料只用於回覆申請、評估適配、安排服務、履行合約與必要的法定義務。', '請勿傳送不必要的敏感資料。'] },
    { title: '保存期限', paragraphs: ['未進入服務的查詢通常在最後聯絡後 12 個月內刪除。合約、付款與必要服務紀錄依英國法定與保險要求保存，通常不超過 7 年。'] },
    { title: '處理者與跨境傳輸', paragraphs: ['電子郵件服務與網站供應商可能代表本公司處理有限資料。正式啟用前會確認供應商條款、資料位置與必要保障。'] },
    { title: '你的權利', paragraphs: [`你可要求查閱、更正、刪除、限制或反對處理，請寄信至 ${CONTACT_EMAIL}。某些法定紀錄可能無法立即刪除。`] },
  ] : [
    { title: 'Controller', paragraphs: [`SUSTAINSAGE GROUP LTD is the controller for this service. Email ${CONTACT_EMAIL} with privacy questions.`] },
    { title: 'Information and purposes', bullets: ['The form collects your name, email, preferred language, transition and the explanation you choose to provide.', 'Information is used to respond, check fit, arrange service, perform a contract and meet legal duties.', 'Do not send unnecessary sensitive information.'] },
    { title: 'Retention', paragraphs: ['Enquiries that do not become a service are normally deleted within 12 months of the last contact. Contract, payment and necessary service records are kept for UK legal and insurance requirements, normally no longer than seven years.'] },
    { title: 'Processors and transfers', paragraphs: ['Email and website suppliers may process limited information for the company. Supplier terms, data location and safeguards must be confirmed before launch.'] },
    { title: 'Your rights', paragraphs: [`You may request access, correction, deletion, restriction or objection by emailing ${CONTACT_EMAIL}. Some statutory records cannot be deleted immediately.`] },
  ] } };
};
