import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

function Privacy() {
  return (
    <>
      <Hero image="/hero/default.svg" title="Privacy" subtitle="How we handle personal data in line with UK GDPR." />
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-4 text-neutral-800">
        <p>We collect the minimum information needed to arrange coaching. We do not sell your data.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Purpose: arranging sessions, invoicing, and agreed follow-up.</li>
          <li>Legal basis: consent and contract. You can withdraw consent at any time.</li>
          <li>Retention: we keep data only as long as necessary for the stated purpose.</li>
        </ul>
        <p>For access or deletion requests, email: hello@sustainsage-group.com.</p>
      </div>
    </>
  );
}

Privacy.getLayout = (page) => <MainLayout title="Privacy | SustainSage">{page}</MainLayout>;
export default Privacy;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)) } };
}
