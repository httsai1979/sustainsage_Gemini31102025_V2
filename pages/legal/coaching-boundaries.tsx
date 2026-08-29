import type { GetStaticProps } from 'next';
import LegalPage, { legalLayout } from '@/components/legal/LegalPage';
import { getSiteContent, normaliseLocale } from '@/content/siteStrategy';
export default function CoachingBoundaries(props) { return <LegalPage {...props} />; }
CoachingBoundaries.getLayout = legalLayout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const resolved = normaliseLocale(locale); const zh = resolved === 'zh-TW'; const content = getSiteContent(resolved);
  return { props: { locale: resolved, title: zh ? 'Coaching 邊界' : 'Coaching Boundaries', summary: zh ? 'Coaching 能做、不能做，以及保密的限制。' : 'What coaching can and cannot do, including limits to confidentiality.', sections: [
    { title: zh ? '服務範圍' : 'Scope', bullets: [...content.boundaries] },
    { title: zh ? '保密' : 'Confidentiality', paragraphs: [zh ? '會談內容原則上保密。若法律要求、法院命令，或有可信的重大傷害與 safeguarding 風險，可能需要揭露最低必要資訊。' : 'Session content is normally confidential. The minimum necessary information may be disclosed where law, a court order, or a credible serious-harm or safeguarding concern requires it.'] },
    { title: zh ? '需要其他支援時' : 'When other support is needed', paragraphs: [zh ? '若議題需要治療、醫療、法律、財務、移民或緊急支援，Coaching 會暫停或限制範圍，並建議尋找適當的合格服務。' : 'Where therapy, medical, legal, financial, immigration or urgent support is needed, coaching will pause or narrow its scope and appropriate qualified help will be recommended.'] },
  ] } };
};
