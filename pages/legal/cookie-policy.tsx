import type { GetStaticProps } from 'next';
import LegalPage, { legalLayout } from '@/components/legal/LegalPage';
import { normaliseLocale } from '@/content/siteStrategy';
export default function CookiePolicy(props) { return <LegalPage {...props} />; }
CookiePolicy.getLayout = legalLayout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const resolved = normaliseLocale(locale); const zh = resolved === 'zh-TW';
  return { props: { locale: resolved, title: zh ? 'Cookie 政策' : 'Cookie Policy', summary: zh ? '說明必要儲存與選擇性分析工具的使用。' : 'How necessary storage and optional analytics are used.', sections: zh ? [
    { title: '必要儲存', paragraphs: ['網站可在瀏覽器保存 Cookie 同意選擇與反思工具輸入。這些資料用於提供你要求的功能。'] },
    { title: '選擇性分析', paragraphs: ['只有在你明確同意後，且網站已設定有效的分析 ID 時，才會載入分析工具。拒絕不影響核心網站功能。'] },
    { title: '管理選擇', paragraphs: ['你可透過 Cookie 橫幅選擇接受或拒絕，亦可在瀏覽器清除既有資料。'] },
  ] : [
    { title: 'Necessary storage', paragraphs: ['The site may store your cookie preference and reflection-tool entries in your browser to provide features you request.'] },
    { title: 'Optional analytics', paragraphs: ['Analytics load only after explicit consent and only when a valid analytics ID is configured. Refusing does not affect core site functions.'] },
    { title: 'Managing choices', paragraphs: ['Use the cookie banner to accept or refuse, and use browser settings to clear existing data.'] },
  ] } };
};
