import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/layout/Hero';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function NotFoundPage() {
  return (
    <MainLayout title="Page not found | SustainSage" desc="The page you’re looking for could not be found.">
      <Hero image="/hero/default.svg" align="left" title="That page isn’t here" subtitle="Let’s take you back to somewhere useful.">
        <Link href="/" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm">
          Go home
        </Link>
      </Hero>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}

export default NotFoundPage;
